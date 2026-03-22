import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PromoBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-[#D4AF37] text-black py-2 px-6 relative z-[60] flex items-center justify-center space-x-4 rtl:space-x-reverse overflow-hidden"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {t('ramadan_sale')} — 20% OFF WITH CODE: <span className="underline">DESERT20</span>
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1 hover:opacity-60 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
