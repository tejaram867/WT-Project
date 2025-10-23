import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app_name: 'Grow Community App',
      tagline: 'Empowering Local Entrepreneurs, Digitally',
      subtitle: 'Helping small vendors, auto drivers, and rural entrepreneurs connect with nearby customers.',
      login: 'Login',
      register: 'Register',
      vendor_login: 'Vendor Login',
      customer_login: 'Customer Login',
      vendor_register: 'Register as Vendor',
      customer_register: 'Register as Customer',
      home: 'Home',
      about: 'About',
      features: 'Features',
      how_it_works: 'How It Works',
      impact: 'Impact',
      name: 'Name',
      mobile: 'Mobile Number',
      password: 'Password',
      email: 'Email',
      shop_name: 'Shop Name',
      category: 'Category',
      location: 'Location',
      description: 'Description',
      submit: 'Submit',
      dashboard: 'Dashboard',
      products: 'Products',
      orders: 'Orders',
      chats: 'Chats',
      profile: 'Profile',
      logout: 'Logout',
      add_product: 'Add Product',
      product_name: 'Product Name',
      price: 'Price',
      vendors_empowered: 'Vendors Empowered',
      chats_made: 'Chats Made',
      orders_completed: 'Orders Completed',
      find_vendors: 'Find Vendors Near You',
      search: 'Search',
      categories: {
        grocery: 'Grocery',
        food: 'Food',
        taxi: 'Taxi',
        tailor: 'Tailor',
        plumber: 'Plumber',
        electrician: 'Electrician',
        other: 'Other'
      },
      order_status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        completed: 'Completed',
        cancelled: 'Cancelled'
      }
    }
  },
  hi: {
    translation: {
      app_name: 'ग्रो कम्युनिटी ऐप',
      tagline: 'स्थानीय उद्यमियों को सशक्त बनाना, डिजिटल रूप से',
      subtitle: 'छोटे विक्रेताओं, ऑटो चालकों और ग्रामीण उद्यमियों को आस-पास के ग्राहकों से जोड़ने में मदद करना।',
      login: 'लॉगिन',
      register: 'रजिस्टर करें',
      vendor_login: 'विक्रेता लॉगिन',
      customer_login: 'ग्राहक लॉगिन',
      vendor_register: 'विक्रेता के रूप में रजिस्टर करें',
      customer_register: 'ग्राहक के रूप में रजिस्टर करें',
      home: 'होम',
      about: 'के बारे में',
      features: 'विशेषताएं',
      how_it_works: 'यह कैसे काम करता है',
      impact: 'प्रभाव',
      name: 'नाम',
      mobile: 'मोबाइल नंबर',
      password: 'पासवर्ड',
      email: 'ईमेल',
      shop_name: 'दुकान का नाम',
      category: 'श्रेणी',
      location: 'स्थान',
      description: 'विवरण',
      submit: 'जमा करें',
      dashboard: 'डैशबोर्ड',
      products: 'उत्पाद',
      orders: 'आदेश',
      chats: 'चैट',
      profile: 'प्रोफ़ाइल',
      logout: 'लॉग आउट',
      add_product: 'उत्पाद जोड़ें',
      product_name: 'उत्पाद का नाम',
      price: 'कीमत',
      vendors_empowered: 'सशक्त विक्रेता',
      chats_made: 'चैट की गई',
      orders_completed: 'आदेश पूर्ण',
      find_vendors: 'अपने पास विक्रेता खोजें',
      search: 'खोजें',
      categories: {
        grocery: 'किराना',
        food: 'खाना',
        taxi: 'टैक्सी',
        tailor: 'दर्जी',
        plumber: 'प्लंबर',
        electrician: 'इलेक्ट्रीशियन',
        other: 'अन्य'
      },
      order_status: {
        pending: 'लंबित',
        confirmed: 'पुष्टि की गई',
        completed: 'पूर्ण',
        cancelled: 'रद्द'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
