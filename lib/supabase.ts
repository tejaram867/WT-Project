import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'vendor' | 'customer' | 'admin';

export interface User {
  id: string;
  email?: string;
  mobile: string;
  name: string;
  role: UserRole;
  location_lat?: number;
  location_lng?: number;
  location_address?: string;
  language_preference: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  shop_name: string;
  category: string;
  description?: string;
  is_online: boolean;
  rating: number;
  total_orders: number;
  offers: string[];
  profile_image?: string;
  user?: User;
}

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_available: boolean;
  category?: string;
  created_at: string;
}

export interface Order {
  id: string;
  vendor_id: string;
  customer_id: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_amount: number;
  items: any[];
  delivery_address?: string;
  delivery_lat?: number;
  delivery_lng?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Chat {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
