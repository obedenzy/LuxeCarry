import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import UserProfile from "./components/UserProfile";
import SellProduct from "./components/SellProduct";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderHistory from "./components/OrderHistory";
import AdminDashboard from "./components/AdminDashboard";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductGrid />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/category/:categoryId" element={<ProductGrid />} />
          <Route path="/categories" element={<ProductGrid />} />
          <Route path="/account" element={<UserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<div className="min-h-screen bg-white p-8"><h1 className="text-3xl font-bold">About Us</h1><p className="mt-4">Learn more about LuxeBags and our commitment to quality.</p></div>} />
          <Route path="/contact" element={<div className="min-h-screen bg-white p-8"><h1 className="text-3xl font-bold">Contact Us</h1><p className="mt-4">Get in touch with our team.</p></div>} />
          <Route path="/faq" element={<div className="min-h-screen bg-white p-8"><h1 className="text-3xl font-bold">FAQ</h1><p className="mt-4">Frequently asked questions.</p></div>} />
          <Route path="/terms" element={<div className="min-h-screen bg-white p-8"><h1 className="text-3xl font-bold">Terms & Conditions</h1><p className="mt-4">Our terms and conditions.</p></div>} />
          <Route path="/wishlist" element={<div className="min-h-screen bg-white p-8"><h1 className="text-3xl font-bold">Wishlist</h1><p className="mt-4">Your saved items will appear here.</p></div>} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;