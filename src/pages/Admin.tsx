import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, ShoppingCart, Users, TrendingUp, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { cn } from '../lib/utils';

import { db, collection, getDocs, onSnapshot, addDoc, setDoc, doc } from '../firebase';

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  useEffect(() => {
    const productsRef = collection(db, 'products');
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const seedData = async () => {
    const initialProducts = [
      {
        name_en: "Desert Soul Oversized T-Shirt",
        name_ar: "تيشيرت ديزرت سول أوفرسايز",
        price: 189,
        category: "t-shirts",
        colors: ["Black", "Sand", "White", "Olive"],
        sizes: ["S", "M", "L", "XL"],
        description_en: "Premium 280 GSM cotton oversized t-shirt with desert-inspired embroidery.",
        description_ar: "تيشيرت أوفرسايز من القطن المميز ٢٨٠ جرام مع تطريز مستوحى من الصحراء.",
        images: ["https://picsum.photos/seed/streetwear1/800/1000", "https://picsum.photos/seed/streetwear1back/800/1000"],
        fabric: "100% Cotton, 280 GSM",
        stock: 50,
        createdAt: new Date().toISOString()
      },
      {
        name_en: "Dune Cargo Trousers",
        name_ar: "بنطال كارجو ديون",
        price: 249,
        category: "trousers",
        colors: ["Sand", "Olive", "Black"],
        sizes: ["S", "M", "L", "XL"],
        description_en: "Functional cargo trousers with adjustable cuffs and premium hardware.",
        description_ar: "بنطال كارجو عملي مع أطراف قابلة للتعديل وإكسسوارات مميزة.",
        images: ["https://picsum.photos/seed/cargo1/800/1000", "https://picsum.photos/seed/cargo1back/800/1000"],
        fabric: "Cotton Twill, 320 GSM",
        stock: 30,
        createdAt: new Date().toISOString()
      }
    ];

    for (const p of initialProducts) {
      await addDoc(collection(db, 'products'), p);
    }
    alert("Data seeded successfully!");
  };

  const stats = [
    { name: 'Total Revenue', value: '124,500 SAR', icon: <TrendingUp className="w-5 h-5" /> },
    { name: 'Total Orders', value: '482', icon: <ShoppingCart className="w-5 h-5" /> },
    { name: 'Active Products', value: '24', icon: <Package className="w-5 h-5" /> },
    { name: 'Customers', value: '1,205', icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-widest uppercase font-serif">{t('admin_dashboard')}</h1>
          <div className="h-1 w-24 bg-black dark:bg-white" />
        </div>
        <div className="flex space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setActiveTab('products')}
            className={cn(
              "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
              activeTab === 'products' ? "bg-black dark:bg-white text-white dark:text-black" : "opacity-40 hover:opacity-100"
            )}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={cn(
              "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
              activeTab === 'orders' ? "bg-black dark:bg-white text-white dark:text-black" : "opacity-40 hover:opacity-100"
            )}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-black/40 p-8 rounded-3xl border border-black/5 dark:border-white/5 space-y-4">
            <div className="w-10 h-10 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center opacity-60">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40">{stat.name}</p>
              <p className="text-2xl font-bold tracking-tight font-serif">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-black/40 rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden">
        {activeTab === 'products' ? (
          <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold uppercase tracking-widest">Product Management</h2>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <button 
                  onClick={seedData}
                  className="bg-emerald-500/10 text-emerald-500 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-colors"
                >
                  Seed Initial Data
                </button>
                <button className="flex items-center space-x-2 rtl:space-x-reverse bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest opacity-40 border-b border-black/5 dark:border-white/5">
                    <th className="pb-4 font-bold">Product</th>
                    <th className="pb-4 font-bold">Category</th>
                    <th className="pb-4 font-bold">Price</th>
                    <th className="pb-4 font-bold">Stock</th>
                    <th className="pb-4 font-bold text-right rtl:text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                  {products.map((product) => (
                    <tr key={product.id} className="group hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <img src={product.images[0]} alt="" className="w-12 h-16 rounded-lg object-cover" />
                          <span className="text-sm font-bold uppercase tracking-widest">{product.name_en}</span>
                        </div>
                      </td>
                      <td className="py-4 text-xs uppercase tracking-widest opacity-60">{product.category}</td>
                      <td className="py-4 text-sm font-light">{product.price} SAR</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          product.stock > 10 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                        )}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="py-4 text-right rtl:text-left space-x-2 rtl:space-x-reverse">
                        <button className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-24 text-center space-y-4 opacity-40">
            <ShoppingCart className="w-12 h-12 mx-auto" />
            <p className="text-xs uppercase tracking-widest font-bold">Order management coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
