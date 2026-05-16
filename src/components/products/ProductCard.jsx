import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const cardRef = useRef(null);
  const minPrice = Math.min(...Object.values(product.prices));
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    gsap.to(cardRef.current, {
      rotateY:  dx * 5,
      rotateX: -dy * 3,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {product.badge && (
        <span className="product-card__badge">
          {product.badge === 'Bestseller' && '🔥 '}
          {product.badge === 'Premium' && '⭐ '}
          {product.badge}
        </span>
      )}

      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="product-card__img"
        />
        <div className="product-card__img-shine" aria-hidden="true" />
        
        <button 
          className={`product-card__wishlist ${inWishlist ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="price-from">From </span>
            <span className="price-currency">₹</span>
            <span className="price-amount">{minPrice.toLocaleString('en-IN')}</span>
          </div>
          <span className="product-card__view">
            View
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
