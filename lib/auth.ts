import { supabase, User, UserRole } from './supabase';

export async function signUp(data: {
  mobile: string;
  password: string;
  name: string;
  role: UserRole;
  email?: string;
  location_lat?: number;
  location_lng?: number;
  location_address?: string;
  shop_name?: string;
  category?: string;
  description?: string;
}) {
  const hashedPassword = await hashPassword(data.password);

  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      mobile: data.mobile,
      password_hash: hashedPassword,
      name: data.name,
      role: data.role,
      email: data.email,
      location_lat: data.location_lat,
      location_lng: data.location_lng,
      location_address: data.location_address,
      language_preference: 'en',
      is_active: true,
    })
    .select()
    .single();

  if (userError) throw userError;

  if (data.role === 'vendor' && data.shop_name && data.category) {
    const { error: vendorError } = await supabase
      .from('vendors')
      .insert({
        id: userData.id,
        shop_name: data.shop_name,
        category: data.category,
        description: data.description || '',
        is_online: true,
        rating: 0,
        total_orders: 0,
        offers: [],
      });

    if (vendorError) throw vendorError;
  }

  return userData;
}

export async function signIn(mobile: string, password: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('mobile', mobile)
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;
  if (!user) throw new Error('Invalid credentials');

  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) throw new Error('Invalid credentials');

  const token = await generateToken(user);
  return { user, token };
}

export async function getCurrentUser(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const newHash = await hashPassword(password);
  return newHash === hash;
}

async function generateToken(user: User): Promise<string> {
  return btoa(JSON.stringify({
    id: user.id,
    mobile: user.mobile,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  }));
}

export function decodeToken(token: string): any {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}
