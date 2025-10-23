'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

const categories = ['Grocery', 'Food', 'Taxi', 'Tailor', 'Plumber', 'Electrician', 'Other'];

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const defaultTab = searchParams.get('type') === 'vendor' ? 'vendor' : 'customer';

  const [customerData, setCustomerData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    location_address: '',
  });

  const [vendorData, setVendorData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    shop_name: '',
    category: '',
    description: '',
    location_address: '',
  });

  const handleCustomerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp({
        ...customerData,
        role: 'customer',
      });
      toast({
        title: 'Registration successful',
        description: 'Welcome to Grow Community!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVendorRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp({
        ...vendorData,
        role: 'vendor',
      });
      toast({
        title: 'Registration successful',
        description: 'Welcome to Grow Community!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Link href="/">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Grow Community
            </span>
          </div>
        </Link>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Join our community of local entrepreneurs and customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="customer" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer
                </TabsTrigger>
                <TabsTrigger value="vendor" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Vendor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer">
                <form onSubmit={handleCustomerRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer-name">Name</Label>
                      <Input
                        id="customer-name"
                        placeholder="Your full name"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customer-mobile">Mobile Number</Label>
                      <Input
                        id="customer-mobile"
                        type="tel"
                        placeholder="Your mobile number"
                        value={customerData.mobile}
                        onChange={(e) => setCustomerData({ ...customerData, mobile: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email (Optional)</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="your@email.com"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-password">Password</Label>
                    <Input
                      id="customer-password"
                      type="password"
                      placeholder="Create a password"
                      value={customerData.password}
                      onChange={(e) => setCustomerData({ ...customerData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer-location">Location</Label>
                    <Input
                      id="customer-location"
                      placeholder="Your address"
                      value={customerData.location_address}
                      onChange={(e) => setCustomerData({ ...customerData, location_address: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Register as Customer'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="vendor">
                <form onSubmit={handleVendorRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor-name">Name</Label>
                      <Input
                        id="vendor-name"
                        placeholder="Your full name"
                        value={vendorData.name}
                        onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendor-mobile">Mobile Number</Label>
                      <Input
                        id="vendor-mobile"
                        type="tel"
                        placeholder="Your mobile number"
                        value={vendorData.mobile}
                        onChange={(e) => setVendorData({ ...vendorData, mobile: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shop-name">Shop Name</Label>
                      <Input
                        id="shop-name"
                        placeholder="Your shop/business name"
                        value={vendorData.shop_name}
                        onChange={(e) => setVendorData({ ...vendorData, shop_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={vendorData.category}
                        onValueChange={(value) => setVendorData({ ...vendorData, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vendor-email">Email (Optional)</Label>
                    <Input
                      id="vendor-email"
                      type="email"
                      placeholder="your@email.com"
                      value={vendorData.email}
                      onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vendor-password">Password</Label>
                    <Input
                      id="vendor-password"
                      type="password"
                      placeholder="Create a password"
                      value={vendorData.password}
                      onChange={(e) => setVendorData({ ...vendorData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your business..."
                      value={vendorData.description}
                      onChange={(e) => setVendorData({ ...vendorData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vendor-location">Location</Label>
                    <Input
                      id="vendor-location"
                      placeholder="Your business address"
                      value={vendorData.location_address}
                      onChange={(e) => setVendorData({ ...vendorData, location_address: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Register as Vendor'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-600 hover:underline font-medium">
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
