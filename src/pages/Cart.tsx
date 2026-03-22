import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

const Cart: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { cart, removeFromCart, total, addToCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-8 px-6 text-center">
        <div className="w-24 h-24 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 opacity-20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-widest uppercase font-serif">{t('empty_cart')}</h2>
          <p className="text-sm opacity-60 uppercase tracking-widest">Start exploring the desert collection.</p>
        </div>
        <Link
          to="/"
          className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
        >
          {t('continue_shopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-widest uppercase font-serif">{t('cart')}</h1>
        <div className="h-1 w-24 bg-black dark:bg-white" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.color}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center space-x-6 rtl:space-x-reverse pb-8 border-b border-black/5 dark:border-white/5"
              >
                <Link to={`/product/${item.id}`} className="w-24 sm:w-32 aspect-[3/4] rounded-xl overflow-hidden bg-black/5 dark:bg-white/5">
                  <img src={item.image} alt={item.name_en} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </Link>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold uppercase tracking-widest">
                        {i18n.language === 'en' ? item.name_en : item.name_ar}
                      </h3>
                      <p className="text-xs opacity-40 uppercase tracking-widest">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse border border-black/10 dark:border-white/10 rounded-full px-4 py-2">
                      <button
                        onClick={() => item.quantity > 1 && addToCart({ ...item, quantity: -1 })}
                        className="hover:opacity-60"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart({ ...item, quantity: 1 })}
                        className="hover:opacity-60"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-lg font-light">{item.price * item.quantity} SAR</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-black/40 p-8 rounded-3xl space-y-8 border border-black/5 dark:border-white/5">
            <h2 className="text-xl font-bold uppercase tracking-widest">{t('order_summary')}</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm opacity-60">
                <span>{t('subtotal')}</span>
                <span>{total} SAR</span>
              </div>
              <div className="flex justify-between text-sm opacity-60">
                <span>{t('shipping')}</span>
                <span className="text-emerald-500">{t('free')}</span>
              </div>
              <div className="h-px bg-black/10 dark:bg-white/10" />
              <div className="flex justify-between text-xl font-bold tracking-widest">
                <span>{t('total')}</span>
                <span>{total} SAR</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex border-b border-black/10 dark:border-white/10 pb-2">
                <input
                  type="text"
                  placeholder={t('discount_code')}
                  className="bg-transparent text-sm w-full outline-none uppercase tracking-widest"
                />
                <button className="text-[10px] font-bold uppercase tracking-widest ml-2">Apply</button>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-black dark:bg-white text-white dark:text-black py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center space-x-3 rtl:space-x-reverse"
            >
              <span>{t('checkout')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4 opacity-40 text-[10px] uppercase tracking-widest">
            <p>Secure checkout powered by Mada</p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <span>Apple Pay</span>
              <span>Mada</span>
              <span>Visa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
