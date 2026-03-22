import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import { auth, googleProvider, signInWithPopup } from '../firebase';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-[#0a0a0a] rounded-[32px] p-10 shadow-2xl space-y-8"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:opacity-60 transition-opacity">
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-widest uppercase font-serif">
                {isLogin ? t('login') : t('signup')}
              </h2>
              <p className="text-[10px] uppercase tracking-widest opacity-40">
                {isLogin ? 'Welcome back to the desert' : 'Join the rising desert community'}
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black dark:focus:border-white p-4 pl-12 rounded-2xl outline-none transition-all text-sm"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black dark:focus:border-white p-4 pl-12 rounded-2xl outline-none transition-all text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-black dark:focus:border-white p-4 pl-12 rounded-2xl outline-none transition-all text-sm"
                />
              </div>
              <button className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center space-x-3 rtl:space-x-reverse">
                <span>{isLogin ? t('login') : t('signup')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center space-y-4">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity underline"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </button>
              <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse opacity-20">
                <div className="h-px w-12 bg-current" />
                <span className="text-[8px] uppercase tracking-widest">Or continue with</span>
                <div className="h-px w-12 bg-current" />
              </div>
              <button 
                onClick={handleGoogleLogin}
                className="w-full border border-black/10 dark:border-white/10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Google Account
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
