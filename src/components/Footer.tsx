import React from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-black border-t border-black/5 dark:border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-widest uppercase font-serif">{t('brand_name')}</h3>
          <p className="text-sm opacity-60 leading-relaxed max-w-xs">
            {t('from_the_desert')}
          </p>
          <div className="flex space-x-4 rtl:space-x-reverse pt-4">
            <Instagram className="w-5 h-5 cursor-pointer hover:opacity-60 transition-opacity" />
            <Facebook className="w-5 h-5 cursor-pointer hover:opacity-60 transition-opacity" />
            <Twitter className="w-5 h-5 cursor-pointer hover:opacity-60 transition-opacity" />
          </div>
        </div>

        {/* Shop */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest">{t('categories')}</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li><a href="/category/t-shirts" className="hover:underline">{t('t_shirts')}</a></li>
            <li><a href="/category/trousers" className="hover:underline">{t('trousers')}</a></li>
            <li><a href="/category/sets" className="hover:underline">{t('sets')}</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest">Support</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li><a href="/tracking" className="hover:underline">{t('order_tracking')}</a></li>
            <li><a href="/shipping" className="hover:underline">Shipping Policy</a></li>
            <li><a href="/returns" className="hover:underline">Returns & Exchanges</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest">Newsletter</h4>
          <p className="text-xs opacity-60">Join the desert community for exclusive drops.</p>
          <div className="flex border-b border-black/20 dark:border-white/20 pb-2">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent text-sm w-full outline-none"
            />
            <button className="text-xs font-bold uppercase tracking-widest ml-2">Join</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-40">
        <p>© 2026 THE RISING DESERT. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
          <span>{t('apple_pay')}</span>
          <span>{t('mada')}</span>
          <span>{t('visa')}</span>
          <span>{t('mastercard')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
