# Grow Community App

A full-stack digital commerce platform empowering local entrepreneurs, street sellers, auto drivers, and rural vendors to connect directly with nearby customers.

## Features

### Core Functionality
- **User Authentication**: Separate registration and login for vendors and customers with secure JWT-based authentication
- **Vendor Dashboard**: Complete product management, order tracking, and business analytics
- **Customer Dashboard**: Location-based vendor discovery with search and category filters
- **Real-time Chat**: Direct communication between customers and vendors
- **Order Management**: End-to-end order tracking from placement to completion
- **Multilingual Support**: English and Hindi language options
- **Offline Mode**: SMS order functionality for low-connectivity areas

### Technology Stack
- **Frontend**: Next.js 13, React, Tailwind CSS, ShadCN UI
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Custom auth with password hashing
- **Real-time**: Polling-based chat system
- **Internationalization**: i18next
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (database already configured)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Environment variables are pre-configured in `.env`

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
/app
  /dashboard      - Main dashboard routing
  /login          - Login page
  /register       - Registration page
  layout.tsx      - Root layout with providers
  page.tsx        - Landing page

/components
  CustomerDashboard.tsx  - Customer interface
  VendorDashboard.tsx    - Vendor interface
  LandingPage.tsx        - Homepage
  ChatWidget.tsx         - Chat component
  /ui                    - ShadCN UI components

/contexts
  AuthContext.tsx - Authentication state management

/lib
  auth.ts        - Authentication utilities
  supabase.ts    - Supabase client and types
  i18n.ts        - Internationalization config
  stats.ts       - Community statistics
  utils.ts       - Utility functions
```

## Database Schema

### Tables
- **users**: User authentication and profiles
- **vendors**: Extended vendor business information
- **products**: Product/service listings
- **orders**: Order management and tracking
- **chats**: Real-time messaging
- **admin_stats**: Platform analytics

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Features Breakdown

### For Vendors
- Create and manage product listings
- View and manage incoming orders
- Accept/reject/complete orders
- Track business analytics
- Toggle online/offline status
- Real-time order notifications

### For Customers
- Discover nearby vendors by location
- Search and filter by category
- View vendor profiles and products
- Add products to cart
- Place orders
- Track order status
- Chat with vendors
- SMS orders in offline mode

## Security

- Row Level Security (RLS) on all database tables
- Password hashing for user credentials
- JWT-based session management
- Secure API endpoints
- Protected routes

## Community Impact

The platform tracks:
- Total vendors empowered
- Total messages exchanged
- Total orders completed

Supporting Digital India and MSME growth by providing zero-commission digital connectivity for local entrepreneurs.

## License

© 2025 Grow Community App. All rights reserved.
