import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Filter, X, ChevronDown } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import { db, collection, onSnapshot } from '../firebase';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const Shop: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'all';
  
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', name: 'All Collection' },
    { id: 't-shirts', name: 'T-Shirts' },
    { id: 'trousers', name: 'Trousers' },
    { id: 'sets', name: 'Sets' },
  ];

  useEffect(() => {
    const productsRef = collection(db, 'products');
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let result = [...products];
    
    if (categoryFilter !== 'all') {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredProducts(result);
  }, [products, categoryFilter, sortBy]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name_en: product.name_en,
      name_ar: product.name_ar,
      price: product.price,
      image: product.images[0],
      size: 'M', // Default size
      color: product.colors[0],
      quantity: 1
    });
    showToast(`${product.name_en} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse opacity-40 text-[10px] uppercase tracking-[0.3em]">
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
            <span>/</span>
            <span className="opacity-100">Shop</span>
          </div>
          <h1 className="text-5xl font-bold tracking-widest uppercase font-serif">
            {categoryFilter === 'all' ? 'The Collection' : categories.find(c => c.id === categoryFilter)?.name}
          </h1>
          <p className="text-sm opacity-60 uppercase tracking-widest">
            Showing {filteredProducts.length} desert pieces
          </p>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 bg-black/5 dark:bg-white/5 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black/10 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-black/5 dark:bg-white/5 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black/10 transition-colors">
              <span>Sort By: {sortBy.replace('-', ' ')}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#0a0a0a] rounded-2xl shadow-2xl border border-black/5 dark:border-white/5 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {['newest', 'price-low', 'price-high'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="w-full text-left px-6 py-2 text-[10px] uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {option.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-8 rtl:space-x-reverse border-b border-black/5 dark:border-white/5 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSearchParams({ category: cat.id })}
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative pb-4",
              categoryFilter === cat.id ? "opacity-100" : "opacity-40 hover:opacity-100"
            )}
          >
            {cat.name}
            {categoryFilter === cat.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
            )}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-black/10 border-t-black dark:border-white/10 dark:border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group space-y-4"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 relative">
                    <img
                      src={product.images[0]}
                      alt={product.name_en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute bottom-6 left-6 right-6 bg-white dark:bg-black text-black dark:text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-xl flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{t('add_to_cart')}</span>
                    </button>

                    {product.stock < 10 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">
                        Low Stock
                      </div>
                    )}
                  </div>
                </Link>
                <div className="space-y-1 px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold uppercase tracking-widest leading-relaxed max-w-[70%]">
                      {i18n.language === 'en' ? product.name_en : product.name_ar}
                    </h3>
                    <p className="text-xs font-light">{product.price} SAR</p>
                  </div>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest">{product.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="h-64 flex flex-col items-center justify-center space-y-4 opacity-40">
          <ShoppingBag className="w-12 h-12" />
          <p className="text-xs uppercase tracking-widest">No pieces found in this category</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
