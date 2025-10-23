'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Vendor, Product, Order } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Store, ShoppingCart, MessageCircle, LogOut, Search, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import ChatWidget from '@/components/ChatWidget';

export default function CustomerDashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isVendorDialogOpen, setIsVendorDialogOpen] = useState(false);
  const [chatRecipient, setChatRecipient] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    loadVendors();
    loadOrders();
  }, [user]);

  useEffect(() => {
    filterVendors();
  }, [vendors, searchTerm, categoryFilter]);

  const loadVendors = async () => {
    const { data } = await supabase
      .from('vendors')
      .select('*, users!vendors_id_fkey(*)')
      .eq('is_online', true);
    if (data) {
      const vendorsWithUser = data.map(v => ({
        ...v,
        user: (v as any).users
      }));
      setVendors(vendorsWithUser);
    }
  };

  const loadOrders = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('orders')
      .select('*, vendors!orders_vendor_id_fkey(shop_name, users!vendors_id_fkey(mobile))')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setOrders(data as any);
  };

  const filterVendors = () => {
    let filtered = vendors;

    if (searchTerm) {
      filtered = filtered.filter(v =>
        v.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(v => v.category === categoryFilter);
    }

    setFilteredVendors(filtered);
  };

  const openVendorDetails = async (vendor: Vendor) => {
    setSelectedVendor(vendor);
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('vendor_id', vendor.id)
      .eq('is_available', true);
    if (data) setVendorProducts(data);
    setIsVendorDialogOpen(true);
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast({
      title: 'Added to cart',
      description: `${product.name} added to cart`,
    });
  };

  const placeOrder = async () => {
    if (!user || !selectedVendor || cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const items = cart.map(item => ({
      product_id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const { error } = await supabase.from('orders').insert({
      vendor_id: selectedVendor.id,
      customer_id: user.id,
      status: 'pending',
      total_amount: total,
      items,
      delivery_address: user.location_address,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to place order',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Order placed',
        description: 'Your order has been sent to the vendor',
      });
      setCart([]);
      setIsVendorDialogOpen(false);
      loadOrders();
    }
  };

  const sendSmsOrder = (vendor: Vendor) => {
    const items = cart.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const smsText = `Hi, I would like to order: ${items}. Total: ₹${total}. From: ${user?.name} (${user?.mobile})`;
    const encodedText = encodeURIComponent(smsText);

    toast({
      title: 'SMS Order',
      description: `SMS text copied. Send to: ${vendor.user?.mobile}`,
    });

    navigator.clipboard?.writeText(smsText);
  };

  const handleLogout = () => {
    signOut();
    router.push('/');
  };

  const categories = ['all', 'Grocery', 'Food', 'Taxi', 'Tailor', 'Plumber', 'Electrician', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Discover Local Vendors</h1>
                <p className="text-sm text-gray-600">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                <ShoppingCart className="w-3 h-3 mr-1" />
                {cart.length} items
              </Badge>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="vendors" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Find Vendors
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              My Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vendors">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Search Vendors</CardTitle>
                  <CardDescription>Find local entrepreneurs near you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search by shop name or description..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-48">
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat === 'all' ? 'All Categories' : cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No vendors found</p>
                  </div>
                ) : (
                  filteredVendors.map((vendor) => (
                    <Card
                      key={vendor.id}
                      className="hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => openVendorDetails(vendor)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{vendor.shop_name}</CardTitle>
                            <Badge variant="secondary" className="mt-2">
                              {vendor.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <span className="text-sm font-semibold">{vendor.rating.toFixed(1)}</span>
                            <span>⭐</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {vendor.description || 'No description available'}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-emerald-600">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                            <span>Online</span>
                          </div>
                          <span className="text-gray-500">{vendor.total_orders} orders</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>Track your order history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No orders yet</p>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{(order as any).vendors?.shop_name}</p>
                            <p className="text-sm text-gray-600">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              order.status === 'pending' ? 'default' :
                              order.status === 'confirmed' ? 'secondary' :
                              order.status === 'completed' ? 'default' : 'destructive'
                            }
                            className={
                              order.status === 'completed' ? 'bg-emerald-600' : ''
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-lg font-bold text-emerald-600">₹{order.total_amount}</div>
                        <div className="text-sm text-gray-600">
                          {order.items.length} item(s)
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isVendorDialogOpen} onOpenChange={setIsVendorDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedVendor?.shop_name}</DialogTitle>
            <DialogDescription>{selectedVendor?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedVendor?.category}</Badge>
                <span className="text-sm text-gray-600">⭐ {selectedVendor?.rating.toFixed(1)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedVendor && setChatRecipient({ id: selectedVendor.id, name: selectedVendor.shop_name })}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                {selectedVendor?.user?.mobile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendSmsOrder(selectedVendor)}
                    disabled={cart.length === 0}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    SMS Order
                  </Button>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Products</h3>
              <div className="space-y-3">
                {vendorProducts.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No products available</p>
                ) : (
                  vendorProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <p className="text-emerald-600 font-bold mt-1">₹{product.price}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t pt-4 space-y-3">
                <h3 className="font-semibold">Cart ({cart.length} items)</h3>
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{item.quantity}x {item.product.name}</span>
                    <span className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-emerald-600">
                    ₹{cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={placeOrder}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
                  >
                    Place Order
                  </Button>
                  <Button variant="outline" onClick={() => setCart([])}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {chatRecipient && (
        <ChatWidget
          recipientId={chatRecipient.id}
          recipientName={chatRecipient.name}
        />
      )}
    </div>
  );
}
