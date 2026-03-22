import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '../lib/utils';

import { db, collection, getDocs, onSnapshot } from '../firebase';

import { useCart } from '../context/CartContext';

import { useToast } from '../context/ToastContext';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { category } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name_en: product.name_en,
      name_ar: product.name_ar,
      price: product.price,
      image: product.images[0],
      size: 'M',
      color: product.colors[0],
      quantity: 1
    });
    showToast(`${product.name_en} added to cart`);
  };

  useEffect(() => {
    const productsRef = collection(db, 'products');
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (category) {
        setProducts(data.filter((p: any) => p.category === category));
      } else {
        setProducts(data);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [category]);

  const featuredProduct = products[0];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/desert-night/1920/1080?blur=2"
            alt="Desert Night"
            className="w-full h-full object-cover opacity-60 dark:opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f5f2ed] dark:to-[#050505]" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter font-serif uppercase leading-none"
          >
            {t('hero_statement')}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-center space-y-6"
          >
            <p className="text-sm md:text-lg tracking-[0.4em] uppercase opacity-80 max-w-lg mx-auto">
              {t('from_the_desert')}
            </p>
            <Link
              to="/shop"
              className="group flex items-center space-x-3 rtl:space-x-reverse bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <span>{t('shop_now')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: t('t_shirts'), path: '/shop?category=t-shirts', img: 'https://picsum.photos/seed/tshirt/600/800' },
          { name: t('trousers'), path: '/shop?category=trousers', img: 'https://picsum.photos/seed/trousers/600/800' },
          { name: t('sets'), path: '/shop?category=sets', img: 'https://picsum.photos/seed/sets/600/800' },
        ].map((cat, idx) => (
          <Link
            key={cat.path}
            to={cat.path}
            className="group relative h-[500px] overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-2xl font-bold text-white tracking-widest uppercase font-serif">{cat.name}</h3>
              <span className="text-white/60 text-[10px] uppercase tracking-widest mt-2 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform inline-flex items-center">
                Explore <ArrowRight className="w-3 h-3 ml-2 rtl:mr-2" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Featured Product */}
      {featuredProduct && (
        <section className="max-w-7xl mx-auto px-6 py-24 bg-white dark:bg-black/40 rounded-[32px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group">
            <img
              src={featuredProduct.images[0]}
              alt={featuredProduct.name_en}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 bg-black text-white px-4 py-2 text-[10px] uppercase tracking-widest rounded-full">
              {t('featured_product')}
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-serif uppercase">
                {i18n.language === 'en' ? featuredProduct.name_en : featuredProduct.name_ar}
              </h2>
              <p className="text-2xl font-light opacity-60">{featuredProduct.price} SAR</p>
            </div>
            <p className="text-lg opacity-80 leading-relaxed">
              {i18n.language === 'en' ? featuredProduct.description_en : featuredProduct.description_ar}
            </p>
            <div className="flex flex-wrap gap-4">
              {featuredProduct.colors.map((color: string) => (
                <span key={color} className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full text-xs uppercase tracking-widest">
                  {color}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => handleAddToCart(e, featuredProduct)}
              className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('add_to_cart')}</span>
            </button>
          </div>
        </section>
      )}

      {/* Best Sellers Carousel (Simplified for now) */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-widest uppercase font-serif">{t('best_sellers')}</h2>
            <div className="h-1 w-24 bg-black dark:bg-white" />
          </div>
          <Link to="/category/all" className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 relative">
                <img
                  src={product.images[0]}
                  alt={product.name_en}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xl"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase tracking-widest">
                  {i18n.language === 'en' ? product.name_en : product.name_ar}
                </h3>
                <p className="text-xs opacity-60">{product.price} SAR</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lifestyle Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mx-6 rounded-[32px]">
        <img
          src="https://picsum.photos/seed/riyadh-night/1920/1080"
          alt="Riyadh Night"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center space-y-6 px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-widest uppercase font-serif">
            Riyadh Nights. Desert Souls.
          </h2>
          <p className="text-white/60 text-xs uppercase tracking-[0.4em]">
            Designed for the city that never sleeps.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-black text-white py-24 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-widest uppercase font-serif text-center">{t('reviews')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Ahmed R.", city: "Riyadh", text: "The quality of the cotton is insane. Best oversized fit I've found in KSA.", rating: 5 },
              { name: "Sarah K.", city: "Jeddah", text: "Minimalist design with a luxury feel. The sand color is perfect.", rating: 5 },
              { name: "Omar F.", city: "Dammam", text: "Fast shipping and premium packaging. Definitely buying again.", rating: 5 },
            ].map((review, idx) => (
              <div key={idx} className="space-y-6 p-8 border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="flex space-x-1">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-white" />)}
                </div>
                <p className="text-lg italic font-light leading-relaxed">"{review.text}"</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="font-bold uppercase tracking-widest text-sm">{review.name}</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">{review.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
