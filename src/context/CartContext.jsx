import { createContext, useContext, useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const isFirstLoad = useRef(true);

  // When the logged-in user changes, load their cart from Firestore
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        // No user logged in — start with an empty in-memory cart (guest mode)
        setCart([]);
        setCartLoaded(true);
        isFirstLoad.current = true;
        return;
      }

      try {
        const cartRef = doc(db, "carts", user.uid);
        const snap = await getDoc(cartRef);
        if (snap.exists()) {
          setCart(snap.data().items || []);
        } else {
          setCart([]);
        }
      } catch (err) {
        console.error("Failed to load cart:", err);
        setCart([]);
      }
      isFirstLoad.current = true;
      setCartLoaded(true);
    };

    setCartLoaded(false);
    loadCart();
  }, [user]);

  // Whenever the cart changes (and it's not the very first load), save it to Firestore
  useEffect(() => {
    if (!cartLoaded) return;
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (!user) return; // guest cart — nothing to sync

    const saveCart = async () => {
      try {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items: cart, updatedAt: new Date().toISOString() });
      } catch (err) {
        console.error("Failed to save cart:", err);
      }
    };
    saveCart();
  }, [cart, user, cartLoaded]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}