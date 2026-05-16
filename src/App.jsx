import { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const location = useLocation();
  const pageRef  = useRef(null);
  const lenisRef = useRef(null);

  /* Lenis + GSAP ticker — init once */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  /* Page transition on route change — skip scroll-reset when navigating to a hash */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const resetScroll = () => {
      if (!location.hash) {
        // Force immediate scroll to top for both window and Lenis
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
      }
      // Re-calculate ScrollTrigger positions for the new page
      setTimeout(() => ScrollTrigger.refresh(), 50);
    };

    // Increase delay slightly to ensure DOM is ready
    const timer = setTimeout(resetScroll, 50);
    return () => clearTimeout(timer);

    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform' }
    );
  }, [location.pathname, location.search]);

  const isCheckout = location.pathname === '/checkout';

  return (
    <div className="app">
      {!isCheckout && <Header />}
      <main ref={pageRef} className={!isCheckout ? 'main-with-header' : ''}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/products"       element={<Products />} />
          <Route path="/products/:id"   element={<ProductDetail />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/checkout"       element={<Checkout />} />
          <Route path="/wishlist"       element={<Wishlist />} />
          <Route path="/cart"           element={<Cart />} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </main>
      {!isCheckout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <WishlistProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </WishlistProvider>
    </Router>
  );
}
