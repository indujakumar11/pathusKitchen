import { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import './Cart.css';

function CartItem({ item }) {
  const { removeFromCart, updateQty } = useCart();
  const rowRef = useRef(null);

  const remove = () => {
    gsap.to(rowRef.current, {
      x: 60, opacity: 0, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0,
      duration: 0.35, ease: 'power2.in',
      onComplete: () => removeFromCart(item.cartId),
    });
  };

  return (
    <div className="cp-item" ref={rowRef}>
      <div className="cp-item__img-wrap">
        <img src={item.image} alt={item.name} className="cp-item__img" loading="lazy" />
      </div>
      <div className="cp-item__info">
        <p className="cp-item__name">{item.name}</p>
        <span className="cp-item__size">{item.selectedQuantity}</span>
        <p className="cp-item__unit-price">₹{item.price.toLocaleString('en-IN')} / pack</p>
      </div>
      <div className="cp-item__controls">
        <button
          className="cp-stepper"
          onClick={() => updateQty(item.cartId, item.qty - 1)}
          aria-label="Decrease quantity"
        >−</button>
        <span className="cp-count">{item.qty}</span>
        <button
          className="cp-stepper"
          onClick={() => updateQty(item.cartId, Math.min(item.qty + 1, 99))}
          aria-label="Increase quantity"
          disabled={item.qty >= 99}
        >+</button>
      </div>
      <div className="cp-item__total">
        <span className="cp-item__price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
        <button className="cp-remove" onClick={remove} aria-label="Remove item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cp-header', { y: -20, opacity: 0, duration: 0.5, ease: 'power3.out' });
      gsap.from('.cp-item', {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.15,
      });
      gsap.from('.cp-summary', { y: 30, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="cart-page" ref={pageRef}>
      {/* Header bar */}
      <div className="cp-header">
        <div className="container cp-header__inner">
          <button className="cp-back-btn" onClick={() => navigate(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </button>
          <h1 className="cp-header__title">
            Your Cart
            {totalItems > 0 && <span className="cp-header__count">{totalItems}</span>}
          </h1>
        </div>
      </div>

      <div className="container cp-body">
        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="cp-empty">
            <div className="cp-empty__icon">🛒</div>
            <h2 className="cp-empty__title">Your cart is empty</h2>
            <p className="cp-empty__sub">Discover our freshly ground masalas and add your favourites!</p>
            <Link to="/products" className="btn btn-primary btn-lg">Browse Products</Link>
          </div>
        ) : (
          <div className="cp-layout">
            {/* ── Items column ── */}
            <div className="cp-items">
              <div className="cp-items__head">
                <span>{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
                <button className="cp-clear-btn" onClick={clearCart}>Clear all</button>
              </div>
              <div className="cp-items__list">
                {items.map(item => <CartItem key={item.cartId} item={item} />)}
              </div>
            </div>

            {/* ── Order summary ── */}
            <aside className="cp-summary">
              <h2 className="cp-summary__title">Order Summary</h2>

              <div className="cp-summary__lines">
                {items.map(item => (
                  <div className="cp-summary__line" key={item.cartId}>
                    <span className="csl-label">{item.name} <em>({item.selectedQuantity} × {item.qty})</em></span>
                    <span className="csl-val">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="cp-summary__divider" />

              <div className="cp-summary__subtotal">
                <span>Subtotal</span>
                <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
              </div>
              <div className="cp-summary__shipping">
                <span>Delivery</span>
                <span className="cp-shipping-note">Calculated via WhatsApp</span>
              </div>

              <div className="cp-summary__divider" />

              <div className="cp-summary__total">
                <span>Estimated Total</span>
                <strong>₹{totalPrice.toLocaleString('en-IN')}+</strong>
              </div>

              <button
                className="btn btn-primary btn-lg cp-summary-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Order
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <Link to="/products" className="btn btn-outline cp-summary-btn">
                ← Add More Items
              </Link>

              <p className="cp-summary__note">
                🚚 Final delivery charges confirmed on WhatsApp after order placement.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
