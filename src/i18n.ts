import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "brand_name": "The Rising Desert",
      "tagline": "From the Heart of the Desert",
      "hero_statement": "Born from Sand. Built for Greatness.",
      "shop_now": "Shop Now",
      "featured_product": "Featured Product",
      "categories": "Categories",
      "t_shirts": "T-Shirts",
      "trousers": "Trousers",
      "sets": "Sets",
      "best_sellers": "Best Sellers",
      "reviews": "Customer Reviews",
      "add_to_cart": "Add to Cart",
      "size": "Size",
      "color": "Color",
      "fabric_details": "Fabric Details",
      "complete_look": "Complete the Look",
      "cart": "Cart",
      "checkout": "Checkout",
      "order_summary": "Order Summary",
      "discount_code": "Discount Code",
      "cod": "Cash on Delivery",
      "fast_checkout": "Fast Checkout",
      "wishlist": "Wishlist",
      "order_tracking": "Order Tracking",
      "admin_dashboard": "Admin Dashboard",
      "dark_mode": "Dark Mode",
      "whatsapp_chat": "WhatsApp Chat",
      "ramadan_sale": "Ramadan Sale",
      "national_day_sale": "National Day Sale",
      "from_the_desert": "From the Heart of the Desert",
      "search": "Search",
      "login": "Login",
      "signup": "Sign Up",
      "logout": "Logout",
      "profile": "Profile",
      "my_orders": "My Orders",
      "shipping_address": "Shipping Address",
      "payment_method": "Payment Method",
      "place_order": "Place Order",
      "total": "Total",
      "subtotal": "Subtotal",
      "shipping": "Shipping",
      "free": "Free",
      "empty_cart": "Your cart is empty",
      "continue_shopping": "Continue Shopping",
      "product_description": "Product Description",
      "gsm_cotton": "220–320 GSM Cotton",
      "ksa_only": "KSA Only",
      "apple_pay": "Apple Pay",
      "mada": "Mada",
      "visa": "Visa",
      "mastercard": "Mastercard"
    }
  },
  ar: {
    translation: {
      "brand_name": "ذا رايزينج ديزرت",
      "tagline": "من قلب الصحراء",
      "hero_statement": "وُلد من الرمال. صُنع للعظمة.",
      "shop_now": "تسوق الآن",
      "featured_product": "المنتج المميز",
      "categories": "الفئات",
      "t_shirts": "تيشيرتات",
      "trousers": "بناطيل",
      "sets": "أطقم",
      "best_sellers": "الأكثر مبيعاً",
      "reviews": "آراء العملاء",
      "add_to_cart": "أضف إلى السلة",
      "size": "المقاس",
      "color": "اللون",
      "fabric_details": "تفاصيل القماش",
      "complete_look": "أكمل المظهر",
      "cart": "السلة",
      "checkout": "الدفع",
      "order_summary": "ملخص الطلب",
      "discount_code": "كود الخصم",
      "cod": "الدفع عند الاستلام",
      "fast_checkout": "دفع سريع",
      "wishlist": "قائمة الأمنيات",
      "order_tracking": "تتبع الطلب",
      "admin_dashboard": "لوحة التحكم",
      "dark_mode": "الوضع الداكن",
      "whatsapp_chat": "دردشة واتساب",
      "ramadan_sale": "عروض رمضان",
      "national_day_sale": "عروض اليوم الوطني",
      "from_the_desert": "من قلب الصحراء",
      "search": "بحث",
      "login": "تسجيل الدخول",
      "signup": "إنشاء حساب",
      "logout": "تسجيل الخروج",
      "profile": "الملف الشخصي",
      "my_orders": "طلباتي",
      "shipping_address": "عنوان الشحن",
      "payment_method": "طريقة الدفع",
      "place_order": "إتمام الطلب",
      "total": "الإجمالي",
      "subtotal": "المجموع الفرعي",
      "shipping": "الشحن",
      "free": "مجاني",
      "empty_cart": "سلتك فارغة",
      "continue_shopping": "مواصلة التسوق",
      "product_description": "وصف المنتج",
      "gsm_cotton": "قطن ٢٢٠-٣٢٠ جرام",
      "ksa_only": "المملكة العربية السعودية فقط",
      "apple_pay": "أبل باي",
      "mada": "مدى",
      "visa": "فيزا",
      "mastercard": "ماستركارد"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
