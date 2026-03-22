import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Search, User as UserIcon, Heart, Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

import { useCart } from '../context/CartContext';

import AuthModal from './AuthModal';

import { auth, onAuthStateChanged } from '../firebase';
import type { User } from '../firebase';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const isAdmin = user?.email === 'toygamer201@gmail.com';

  const navLinks = [
    { name: t('shop_now'), path: '/shop' },
    { name: t('t_shirts'), path: '/shop?category=t-shirts' },
    { name: t('trousers'), path: '/shop?category=trousers' },
    { name: t('sets'), path: '/shop?category=sets' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between',
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Logo */}
      <Link to="/" className="flex flex-col items-center">
        <span className="text-2xl font-bold tracking-widest uppercase font-serif">
          {t('brand_name')}
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">
          {t('tagline')}
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-sm font-medium uppercase tracking-widest hover:opacity-60 transition-opacity"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <button onClick={toggleLanguage} className="p-2 hover:opacity-60 transition-opacity flex items-center space-x-1">
          <Globe className="w-5 h-5" />
          <span className="text-xs font-bold uppercase">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
        </button>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:opacity-60 transition-opacity">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="p-2 hover:opacity-60 transition-opacity hidden sm:block">
          <Search className="w-5 h-5" />
        </button>
        {user ? (
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">{user.displayName}</span>
            <button onClick={handleLogout} className="p-2 hover:opacity-60 transition-opacity">
              <UserIcon className="w-5 h-5 text-emerald-500" />
            </button>
          </div>
        ) : (
          <button onClick={() => setIsAuthModalOpen(true)} className="p-2 hover:opacity-60 transition-opacity hidden sm:block">
            <UserIcon className="w-5 h-5" />
          </button>
        )}
        <Link to="/wishlist" className="p-2 hover:opacity-60 transition-opacity">
          <Heart className="w-5 h-5" />
        </Link>
        <Link to="/cart" className="p-2 hover:opacity-60 transition-opacity relative">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-black dark:bg-white text-white dark:text-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center space-y-8 lg:hidden">
          <button
            className="absolute top-6 right-6 p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-2xl font-bold uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex space-x-6 rtl:space-x-reverse pt-8 border-t border-black/10 dark:border-white/10 w-full justify-center">
            <button onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}><UserIcon /></button>
            <button onClick={() => { setIsDarkMode(!isDarkMode); setIsMobileMenuOpen(false); }}><Moon /></button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
