import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-widest uppercase font-serif">{t('wishlist')}</h1>
        <div className="h-1 w-24 bg-black dark:bg-white" />
      </div>

      <div className="h-[50vh] flex flex-col items-center justify-center space-y-8 text-center">
        <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
          <Heart className="w-10 h-10 opacity-20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-widest uppercase font-serif">Your wishlist is empty</h2>
          <p className="text-sm opacity-60 uppercase tracking-widest">Save your favorite desert pieces for later.</p>
        </div>
        <Link
          to="/"
          className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
