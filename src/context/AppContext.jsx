import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products as initialProducts } from '../data/products';
import { orders as initialOrders } from '../data/orders';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('gs-theme') || 'light');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gs-cart') || '[]'); } catch { return []; }
  });
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gs-wishlist') || '[]'); } catch { return []; }
  });

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gs-theme', theme);
  }, [theme]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('gs-cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('gs-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Generate low-stock notifications
  useEffect(() => {
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 15);
    setNotifications(lowStock.map(p => ({
      id: p.id,
      type: 'warning',
      message: `Low stock: ${p.name} — only ${p.stock} units left`,
      time: 'Just now',
    })));
  }, [products]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  // Toast system
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  // Cart operations
  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
    addToast(`${product.name} added to cart`);
  }, [addToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateCartQty = useCallback((id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // Wishlist
  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        addToast(`Removed from wishlist`, 'info');
        return prev.filter(i => i.id !== product.id);
      }
      addToast(`Added to wishlist`, 'success');
      return [...prev, product];
    });
  }, [addToast]);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  // Admin: product management
  const addProduct = useCallback((product) => {
    const newProduct = { ...product, id: Date.now(), sold: 0, rating: 0, reviews: 0 };
    setProducts(prev => [newProduct, ...prev]);
    addToast('Product added successfully');
  }, [addToast]);

  const updateProduct = useCallback((id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addToast('Product updated');
  }, [addToast]);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product deleted', 'error');
  }, [addToast]);

  // Admin: order management
  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    addToast(`Order ${id} status updated to ${status}`);
  }, [addToast]);

  const placeOrder = useCallback((orderData) => {
    const newOrder = {
      id: `GS-2024-${String(orders.length + 1).padStart(3, '0')}`,
      ...orderData,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addToast('Order placed successfully! We will contact you soon.');
    return newOrder.id;
  }, [orders.length, clearCart, addToast]);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      cart, addToCart, removeFromCart, updateCartQty, clearCart, cartTotal, cartCount,
      wishlist, toggleWishlist, isWishlisted,
      products, addProduct, updateProduct, deleteProduct,
      orders, updateOrderStatus, placeOrder,
      notifications,
      toasts, addToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
