'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { MapPin, MessageCircle, ShoppingCart, Users, TrendingUp, Globe, Briefcase, Map, Phone } from 'lucide-react';
import Link from 'next/link';
import '../lib/i18n';

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({
    vendors: 0,
    chats: 0,
    orders: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mounted) {
      import('@/lib/stats').then(({ getCommunityStats }) => {
        getCommunityStats().then(setStats).catch(() => {});
      });
    }
  }, [mounted]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t('app_name')}
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">{t('home')}</a>
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">{t('features')}</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">{t('how_it_works')}</a>
              <a href="#impact" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">{t('impact')}</a>
            </div>

            <div className="flex items-center space-x-3">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
              <Link href="/login">
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  {t('login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  {t('register')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t('tagline')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/register?type=vendor">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg px-8 py-6">
                  {t('vendor_register')}
                </Button>
              </Link>
              <Link href="/register?type=customer">
                <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-6">
                  {t('customer_register')}
                </Button>
              </Link>
            </div>

            <div className="flex justify-center gap-12 pt-12">
              <div className="flex flex-col items-center space-y-2 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">GPS Discovery</span>
              </div>
              <div className="flex flex-col items-center space-y-2 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-teal-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Live Chat</span>
              </div>
              <div className="flex flex-col items-center space-y-2 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-cyan-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">Order Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {t('features')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Map className="w-12 h-12" />}
              title="Location-Based Discovery"
              description="Find nearby vendors using GPS technology. Connect with local entrepreneurs in your area."
              color="emerald"
            />
            <FeatureCard
              icon={<MessageCircle className="w-12 h-12" />}
              title="Real-Time Chat"
              description="Communicate directly with vendors. Discuss products, negotiate prices, and build relationships."
              color="teal"
            />
            <FeatureCard
              icon={<ShoppingCart className="w-12 h-12" />}
              title="Order Management"
              description="Track orders from placement to completion. Get real-time updates on your purchases."
              color="cyan"
            />
            <FeatureCard
              icon={<Globe className="w-12 h-12" />}
              title="Multilingual Support"
              description="Use the app in your preferred language. Currently supporting English and Hindi."
              color="emerald"
            />
            <FeatureCard
              icon={<Phone className="w-12 h-12" />}
              title="Offline Mode"
              description="Send orders via SMS in low-connectivity areas. No internet? No problem!"
              color="teal"
            />
            <FeatureCard
              icon={<Users className="w-12 h-12" />}
              title="Community First"
              description="Zero commission platform. All earnings go directly to local entrepreneurs."
              color="cyan"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {t('how_it_works')}
          </h2>
          <div className="max-w-4xl mx-auto space-y-12">
            <Step number={1} title="Register" description="Sign up as a vendor to list your products or as a customer to discover local services." />
            <Step number={2} title="Discover" description="Customers use GPS to find nearby vendors. Vendors showcase their products and services." />
            <Step number={3} title="Connect" description="Chat directly with vendors. Discuss requirements, ask questions, and negotiate." />
            <Step number={4} title="Order" description="Place orders easily. Track status from pending to completed in real-time." />
          </div>
        </div>
      </section>

      <section id="impact" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Community Impact
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            Empowering rural and small-scale entrepreneurs through digital connectivity.
            Supporting Digital India and MSME growth.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard icon={<Briefcase />} value={stats.vendors.toString()} label={t('vendors_empowered')} color="emerald" />
            <StatCard icon={<MessageCircle />} value={stats.chats.toString()} label={t('chats_made')} color="teal" />
            <StatCard icon={<ShoppingCart />} value={stats.orders.toString()} label={t('orders_completed')} color="cyan" />
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="w-8 h-8" />
            <span className="text-2xl font-bold">{t('app_name')}</span>
          </div>
          <p className="text-emerald-100 mb-6">
            Helping local entrepreneurs grow their business, sustainably and digitally.
          </p>
          <p className="text-sm text-emerald-200">
            © 2025 Grow Community App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-500 to-emerald-600',
    teal: 'from-teal-500 to-teal-600',
    cyan: 'from-cyan-500 to-cyan-600',
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[color]} rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-500 to-emerald-600',
    teal: 'from-teal-500 to-teal-600',
    cyan: 'from-cyan-500 to-cyan-600',
  };

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-xl transition-all">
      <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[color]} rounded-xl flex items-center justify-center text-white mb-4 mx-auto`}>
        {icon}
      </div>
      <div className="text-4xl font-bold text-gray-800 mb-2">{value}</div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}
