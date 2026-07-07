import { createContext, useContext, useState, useEffect, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const isFirstLoad = useRef(true);

  // When the logged-in user changes, load their wishlist from Firestore
  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) {
        // No user logged in — empty guest wishlist
        setWishlist([]);
        setWishlistLoaded(true);
        isFirstLoad.current = true;
        return;
      }

      try {
        const wishRef = doc(db, "wishlists", user.uid);
        const snap = await getDoc(wishRef);
        if (snap.exists()) {
          setWishlist(snap.data().items || []);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        console.error("Failed to load wishlist:", err);
        setWishlist([]);
      }
      isFirstLoad.current = true;
      setWishlistLoaded(true);
    };

    setWishlistLoaded(false);
    loadWishlist();
  }, [user]);

  // Whenever the wishlist changes (and it's not the very first load), save it to Firestore
  useEffect(() => {
    if (!wishlistLoaded) return;
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (!user) return; // guest wishlist — nothing to sync

    const saveWishlist = async () => {
      try {
        const wishRef = doc(db, "wishlists", user.uid);
        await setDoc(wishRef, { items: wishlist, updatedAt: new Date().toISOString() });
      } catch (err) {
        console.error("Failed to save wishlist:", err);
      }
    };
    saveWishlist();
  }, [wishlist, user, wishlistLoaded]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}