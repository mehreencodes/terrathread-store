import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NewArrivals from "./pages/NewArrivals";
import Sale from "./pages/Sale";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import AccountSettings from "./pages/AccountSettings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";
import CustomCursor from "./components/CustomCursor";


function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <CustomCursor />

          <BrowserRouter>
            <div className="bg-cream min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/sale" element={<Sale />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/account" element={<AccountSettings />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;