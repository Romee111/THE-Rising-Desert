import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { CheckCircle2, CreditCard, Truck, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const { cart, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('mada');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    clearCart();
  };

  if (isOrderPlaced) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-8 px-6 text-center">
        <CheckCircle2 className="w-24 h-24 text-emerald-500" />
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-widest uppercase font-serif">Order Placed Successfully</h2>
          <p className="text-sm opacity-60 uppercase tracking-widest">Your desert soul is on its way. Check your email for details.</p>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-widest uppercase font-serif">{t('checkout')}</h1>
          <div className="h-1 w-24 bg-black dark:bg-white" />
        </div>

        {/* Shipping Info */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">1</div>
            <h2 className="text-xl font-bold uppercase tracking-widest">{t('shipping_address')}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 p-4 rounded-xl outline-none focus:border-black dark:focus:border-white transition-colors" />
            <input type="text" placeholder="Last Name" className="bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 p-4 rounded-xl outline-none focus:border-black dark:focus:border-white transition-colors" />
            <input type="email" placeholder="Email" className="col-span-2 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 p-4 rounded-xl outline-none focus:border-black dark:focus:border-white transition-colors" />
            <input type="text" placeholder="Phone Number (+966)" className="col-span-2 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 p-4 rounded-xl outline-none focus:border-black dark:focus:border-white transition-colors" />
            <input type="text" placeholder="City (Riyadh, Jeddah, etc.)" className="col-span-2 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 p-4 rounded-xl outline-none focus:border-black dark:focus:border-white transition-colors" />
            <textarea placeholder="Full Address" className="col-span-2 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 p-4 rounded-xl outline-none focus:border-black dark:focus:border-white transition-colors h-32" />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">2</div>
            <h2 className="text-xl font-bold uppercase tracking-widest">{t('payment_method')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'mada', name: 'Mada / Card', icon: <CreditCard className="w-5 h-5" /> },
              { id: 'apple', name: 'Apple Pay', icon: <Wallet className="w-5 h-5" /> },
              { id: 'cod', name: 'COD (Cash)', icon: <Truck className="w-5 h-5" /> },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all space-y-3",
                  paymentMethod === method.id
                    ? "border-black dark:border-white bg-black/5 dark:bg-white/5"
                    : "border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20"
                )}
              >
                {method.icon}
                <span className="text-[10px] font-bold uppercase tracking-widest">{method.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary Sticky */}
      <div className="lg:sticky lg:top-32 h-fit space-y-8">
        <div className="bg-white dark:bg-black/40 p-8 rounded-3xl space-y-8 border border-black/5 dark:border-white/5 shadow-xl">
          <h2 className="text-xl font-bold uppercase tracking-widest">{t('order_summary')}</h2>
          <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-black/5">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-widest text-[10px]">{item.name_en}</p>
                    <p className="text-[8px] opacity-40 uppercase tracking-widest">{item.size} x {item.quantity}</p>
                  </div>
                </div>
                <span className="font-light">{item.price * item.quantity} SAR</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-black/10 dark:bg-white/10" />
          <div className="space-y-4">
            <div className="flex justify-between text-sm opacity-60">
              <span>{t('subtotal')}</span>
              <span>{total} SAR</span>
            </div>
            <div className="flex justify-between text-sm opacity-60">
              <span>{t('shipping')}</span>
              <span className="text-emerald-500">{t('free')}</span>
            </div>
            <div className="flex justify-between text-xl font-bold tracking-widest pt-4 border-t border-black/5">
              <span>{t('total')}</span>
              <span>{total} SAR</span>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform"
          >
            {t('place_order')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
