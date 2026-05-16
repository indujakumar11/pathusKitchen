import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();
  
  const savedProducts = PRODUCTS.filter(p => wishlistItems.includes(p.id));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (savedProducts.length > 0) {
      gsap.from('.wishlist-card', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
      });
    }
  }, [savedProducts.length]);

  return (
    <div className="page wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1 className="section-title section-title--sm">Your Wishlist</h1>
          <p className="section-sub">
            {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {savedProducts.length > 0 ? (
          <div className="products-grid wishlist-grid">
            {savedProducts.map(product => (
              <div className="wishlist-card" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2>Your wishlist is empty</h2>
            <p>Looks like you haven't saved any products yet.</p>
            <Link to="/products" className="btn btn-primary">
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
