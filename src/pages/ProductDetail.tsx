import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { cn } from '../lib/utils';

import { db, doc, getDoc } from '../firebase';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const productRef = doc(db, 'products', id);
    getDoc(productRef).then(docSnap => {
      if (docSnap.exists()) {
        const p = { id: docSnap.id, ...docSnap.data() } as any;
        setProduct(p);
        setSelectedColor(p.colors[0]);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching product:", err);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name_en: product.name_en,
      name_ar: product.name_ar,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0]
    });
    showToast(`${product.name_en} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
          <motion.img
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={product.images[activeImage]}
            alt={product.name_en}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
            <button
              onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
              className="p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg pointer-events-auto hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
              className="p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg pointer-events-auto hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex space-x-4 rtl:space-x-reverse">
          {product.images.map((img: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={cn(
                "w-24 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all",
                activeImage === idx ? "border-black dark:border-white" : "border-transparent opacity-60"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs uppercase tracking-widest opacity-60">
            <span>{product.category}</span>
            <span>/</span>
            <span>{t('ksa_only')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-serif uppercase">
            {i18n.language === 'en' ? product.name_en : product.name_ar}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-light">{product.price} SAR</p>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Star className="w-4 h-4 fill-black dark:fill-white" />
              <span className="text-sm font-bold">4.9</span>
              <span className="text-xs opacity-40">(124 reviews)</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-black/10 dark:bg-white/10" />

        {/* Color Selector */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest">{t('color')}</h3>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs uppercase tracking-widest border transition-all",
                  selectedColor === color
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest">{t('size')}</h3>
            <button className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-xs font-bold uppercase tracking-widest border transition-all",
                  selectedSize === size
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <div className="pt-6 space-y-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-6 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center space-x-3 rtl:space-x-reverse"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{t('add_to_cart')}</span>
          </button>
          <p className="text-center text-[10px] uppercase tracking-widest opacity-40">
            Free shipping on orders over 500 SAR
          </p>
        </div>

        {/* Details */}
        <div className="space-y-6 pt-8">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest">{t('product_description')}</h4>
            <p className="text-sm opacity-60 leading-relaxed">
              {i18n.language === 'en' ? product.description_en : product.description_ar}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest">{t('fabric_details')}</h4>
            <p className="text-sm opacity-60 leading-relaxed">{product.fabric}</p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-black/10 dark:border-white/10">
          <div className="flex flex-col items-center text-center space-y-2">
            <Truck className="w-5 h-5 opacity-60" />
            <span className="text-[8px] uppercase tracking-widest opacity-60">Fast KSA Delivery</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <RefreshCw className="w-5 h-5 opacity-60" />
            <span className="text-[8px] uppercase tracking-widest opacity-60">14-Day Returns</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <ShieldCheck className="w-5 h-5 opacity-60" />
            <span className="text-[8px] uppercase tracking-widest opacity-60">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
