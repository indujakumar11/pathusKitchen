import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { PRODUCTS, CATEGORIES, getProductsByCategory, getDefaultQuantity } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = PRODUCTS.find(p => p.id === Number(id));

  useEffect(() => {
    if (!product) navigate('/products', { replace: true });
  }, [product, navigate]);

  const quantities = product ? Object.keys(product.prices) : [];
  const [selectedQty, setSelectedQty] = useState(() =>
    product ? getDefaultQuantity(product) : ''
  );
  const [added, setAdded] = useState(false);
  const inWishlist = product ? isInWishlist(product.id) : false;
  const btnRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (product) setSelectedQty(getDefaultQuantity(product));
    setAdded(false);
  }, [id, product]);

  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.from('.pd-breadcrumb', { y: -10, opacity: 0, duration: 0.4, ease: 'power2.out' });
      gsap.from('.pd-image-col', { x: -40, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 });
      gsap.from('.pd-details-col', { x: 40, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 });
      gsap.from('.pd-size-pill', {
        y: 15, opacity: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out', delay: 0.35,
      });
      gsap.from('.pd-related', { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 });
    });
    return () => ctx.revert();
  }, [id, product]);

  if (!product) return null;

  const category = CATEGORIES.find(c => c.id === product.category);
  const related = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const currentPrice = product.prices[selectedQty] || 0;

  const handleAdd = () => {
    if (added) return;
    addToCart(product, selectedQty);
    setAdded(true);
    gsap.timeline()
      .to(btnRef.current, { scale: 0.94, duration: 0.1, ease: 'power2.in' })
      .to(btnRef.current, { scale: 1, duration: 0.45, ease: 'back.out(2)' })
      .add(() => {
        // Short delay for the animation to feel good before navigation
        setTimeout(() => navigate('/cart'), 350);
      });
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
  };

  const handlePlaceOrder = () => {
    addToCart(product, selectedQty);
    navigate('/checkout');
  };

  return (
    <div className="pd-page">
      {/* Breadcrumb */}
      <div className="container pd-breadcrumb">
        <Link to="/">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <Link to="/products">Products</Link>
        {category && (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            <Link to={`/products?cat=${category.id}`}>{category.label}</Link>
          </>
        )}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <span>{product.name}</span>
      </div>

      {/* Main product section */}
      <div className="container pd-main">
        {/* Image column */}
        <div className="pd-image-col" ref={imageRef}>
          <div className="pd-image-wrap">
            {product.badge && (
              <span className="pd-badge">
                {product.badge === 'Bestseller' && '🔥 '}
                {product.badge === 'Premium' && '⭐ '}
                {product.badge}
              </span>
            )}
            <img src={product.image} alt={product.name} className="pd-image" />
          </div>

          <div className="pd-trust-row">
            <div className="pd-trust-item"><span>🌿</span><span>No preservatives</span></div>
            <div className="pd-trust-item"><span>🏺</span><span>Stone ground fresh</span></div>
            <div className="pd-trust-item"><span>📦</span><span>Packed on order</span></div>
          </div>
        </div>

        {/* Details column */}
        <div className="pd-details-col">
          {category && (
            <Link to={`/products?cat=${category.id}`} className="pd-cat-tag">
              {category.icon} {category.label}
            </Link>
          )}

          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-desc">{product.description}</p>

          <div className="pd-divider" />

          {/* Size selection */}
          <div className="pd-size-section">
            <p className="pd-section-label">
              Select Size
              <span className="pd-section-note">— Price updates below</span>
            </p>
            <div className="pd-size-pills">
              {quantities.map(q => (
                <button
                  key={q}
                  className={`pd-size-pill${selectedQty === q ? ' active' : ''}`}
                  onClick={() => { setSelectedQty(q); setAdded(false); }}
                >
                  <span className="pill-weight">{q}</span>
                  <span className="pill-price">₹{product.prices[q].toLocaleString('en-IN')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="pd-price-row">
            <div className="pd-price">
              <span className="pd-currency">₹</span>
              <span className="pd-amount">{currentPrice.toLocaleString('en-IN')}</span>
              <span className="pd-per">/ {selectedQty} pack</span>
            </div>
            <p className="pd-price-note">Delivery charges calculated at checkout.</p>
          </div>

          {/* Actions */}
          <div className="pd-actions">
            <button
              ref={btnRef}
              className={`btn btn-primary btn-lg pd-add-btn${added ? ' added' : ''}`}
              onClick={handleAdd}
            >
              {added ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  Add to Cart
                </>
              )}
            </button>

            <button className="btn btn-secondary btn-lg pd-buy-btn" onClick={handlePlaceOrder}>
              Place Order
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="pd-related">
          <div className="container">
            <h2 className="pd-related__title">You May Also Like</h2>
            <div className="pd-related__grid">
              {related.map(p => (
                <div className="pd-related__card" key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
