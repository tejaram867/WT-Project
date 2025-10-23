import { supabase } from './supabase';

export async function getCommunityStats() {
  const [vendorsRes, customersRes, ordersRes, chatsRes] = await Promise.all([
    supabase.from('vendors').select('id', { count: 'exact', head: true }),
    supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'customer'),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('chats').select('id', { count: 'exact', head: true }),
  ]);

  return {
    vendors: vendorsRes.count || 0,
    customers: customersRes.count || 0,
    orders: ordersRes.count || 0,
    chats: chatsRes.count || 0,
  };
}
