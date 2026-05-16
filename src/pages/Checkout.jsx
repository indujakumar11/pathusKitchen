import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';
import './Checkout.css';

const INITIAL = { name: '', phone: '', address: '', city: '', pincode: '' };

const STEPS = [
  { num: 1, label: 'Cart',     done: true  },
  { num: 2, label: 'Details',  active: true },
  { num: 3, label: 'WhatsApp', done: false  },
];

export default function Checkout() {
  const navigate   = useNavigate();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [form, setForm]     = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const pageRef = useRef(null);

  /* Redirect if cart is empty */
  useEffect(() => {
    if (items.length === 0) navigate('/products', { replace: true });
  }, [items.length, navigate]);

  /* Entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.co-page__header', {
        y: -30, opacity: 0, duration: 0.6, ease: 'power3.out',
      });
      gsap.from('.co-page__section', {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7,
        ease: 'power3.out', delay: 0.2,
      });
      gsap.from('.co-form-field', {
        y: 20, opacity: 0, stagger: 0.08, duration: 0.5,
        ease: 'power2.out', delay: 0.5,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                  e.name    = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone))  e.phone   = 'Enter a valid 10-digit mobile number';
    if (!form.address.trim())               e.address = 'Address is required';
    if (!form.city.trim())                  e.city    = 'City is required';
    if (!/^\d{6}$/.test(form.pincode))      e.pincode = 'Enter a valid 6-digit pincode';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleaned = (name === 'phone' || name === 'pincode')
      ? value.replace(/\D/g, '')
      : value;
    setForm(f => ({ ...f, [name]: cleaned }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      /* shake the submit button */
      gsap.fromTo('.co-submit-btn',
        { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(2, 0.4)' }
      );
      return;
    }
    const message = generateWhatsAppMessage(items, form, totalPrice);
    openWhatsApp(message);
    clearCart();
    navigate('/', { replace: true });
  };

  if (items.length === 0) return null;

  return (
    <div className="co-page" ref={pageRef}>



      {/* ══════════════ PAGE BODY ══════════════ */}
      <div className="container co-page__body">
        
        <div className="co-back-links">
          <Link to="/cart" className="co-back-to-store">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Cart
          </Link>
          <span className="co-back-divider">|</span>
          <Link to="/products" className="co-back-to-store">
            Continue Shopping
          </Link>
        </div>

        <div className="co-page__content">

          {/* ── 1. Delivery Form ── */}
          <section className="co-page__section">
            <div className="co-card">
              <h2 className="co-card__title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Delivery Details
              </h2>
              <p className="co-card__sub">We'll confirm your order and delivery details on WhatsApp.</p>

              <form className="co-form" onSubmit={handleSubmit} noValidate>
                <div className="co-form-grid">

                  {/* Name */}
                  <div className={`co-form-field ${errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="f-name">
                      Full Name <span className="req-star">*</span>
                    </label>
                    <div className="field-input-wrap">
                      <svg className="field-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <input id="f-name" name="name" type="text"
                        placeholder="e.g. Priya Subramaniam"
                        value={form.name} onChange={handleChange}
                        autoComplete="name" />
                    </div>
                    {errors.name && <p className="field-err">⚠ {errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className={`co-form-field ${errors.phone ? 'has-error' : ''}`}>
                    <label htmlFor="f-phone">
                      Mobile / WhatsApp <span className="req-star">*</span>
                    </label>
                    <div className="field-phone-wrap">
                      <span className="phone-pre">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                        +91
                      </span>
                      <input id="f-phone" name="phone" type="tel"
                        placeholder="9876543210"
                        value={form.phone} onChange={handleChange}
                        maxLength={10} autoComplete="tel-national"
                        inputMode="numeric" />
                    </div>
                    {errors.phone && <p className="field-err">⚠ {errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div className={`co-form-field co-form-field--full ${errors.address ? 'has-error' : ''}`}>
                    <label htmlFor="f-address">
                      Delivery Address <span className="req-star">*</span>
                    </label>
                    <div className="field-input-wrap field-input-wrap--ta">
                      <svg className="field-ico field-ico--top" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <textarea id="f-address" name="address" rows={3}
                        placeholder="House / Flat No., Street, Landmark"
                        value={form.address} onChange={handleChange}
                        autoComplete="street-address" />
                    </div>
                    {errors.address && <p className="field-err">⚠ {errors.address}</p>}
                  </div>

                  {/* City */}
                  <div className={`co-form-field ${errors.city ? 'has-error' : ''}`}>
                    <label htmlFor="f-city">
                      City <span className="req-star">*</span>
                    </label>
                    <div className="field-input-wrap">
                      <svg className="field-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                      <input id="f-city" name="city" type="text"
                        placeholder="e.g. Chennai"
                        value={form.city} onChange={handleChange}
                        autoComplete="address-level2" />
                    </div>
                    {errors.city && <p className="field-err">⚠ {errors.city}</p>}
                  </div>

                  {/* Pincode */}
                  <div className={`co-form-field ${errors.pincode ? 'has-error' : ''}`}>
                    <label htmlFor="f-pin">
                      Pincode <span className="req-star">*</span>
                    </label>
                    <div className="field-input-wrap">
                      <svg className="field-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <input id="f-pin" name="pincode" type="text"
                        placeholder="600001"
                        value={form.pincode} onChange={handleChange}
                        maxLength={6} autoComplete="postal-code"
                        inputMode="numeric" />
                    </div>
                    {errors.pincode && <p className="field-err">⚠ {errors.pincode}</p>}
                  </div>
                </div>

                <button type="submit" className="btn btn-whatsapp btn-block co-submit-btn" style={{marginBottom: 'var(--sp-4)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Place Order &nbsp;·&nbsp; ₹{totalPrice.toLocaleString('en-IN')}
                </button>

                {/* WhatsApp note */}
                <div className="co-wa-note">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{color:'#25D366',flexShrink:0}}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <p>We'll open WhatsApp with your full order pre-filled. Just tap <strong>Send</strong> to confirm.</p>
                </div>

                <p className="co-note" style={{textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)'}}>
                  Note: Your order will be placed via WhatsApp.
                </p>
              </form>
            </div>
          </section>

          {/* ── 2. Order Summary (Collapsible) ── */}
          <section className="co-page__section">
            <div className="co-card co-summary-card">
              <button 
                type="button" 
                className="co-summary-toggle"
                onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
              >
                <div className="co-summary-toggle-left">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  <span>Order Summary ({totalItems} items)</span>
                </div>
                <div className="co-summary-toggle-right">
                  <span className="co-summary-toggle-price">₹{totalPrice.toLocaleString('en-IN')}</span>
                  <svg className={`co-chevron ${isSummaryExpanded ? 'open' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>

              <div className={`co-summary-content ${isSummaryExpanded ? 'open' : ''}`}>
                <div className="co-summary-content-inner">
                  <div className="co-item-list">
                    {items.map(item => (
                      <div className="co-item-row" key={item.cartId}>
                        <div className="co-item-img-wrap">
                          <img src={item.image} alt={item.name} loading="lazy" />
                          <span className="co-item-qty-badge">{item.qty}</span>
                        </div>
                        <div className="co-item-info">
                          <p className="co-item-name">{item.name}</p>
                          <p className="co-item-size">{item.selectedQuantity} pack × {item.qty}</p>
                        </div>
                        <p className="co-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                      </div>
                    ))}
                  </div>

                  <div className="co-price-breakdown">
                    <div className="co-price-row">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="co-price-row co-price-row--muted">
                      <span>Delivery</span>
                      <span>Discussed via WhatsApp</span>
                    </div>
                    <div className="co-price-row co-price-row--total">
                      <span>Order Total</span>
                      <strong>₹{totalPrice.toLocaleString('en-IN')}+</strong>
                    </div>
                  </div>

                  <div className="co-trust-badges">
                    <div className="co-trust-item"><span>🌿</span> No preservatives</div>
                    <div className="co-trust-item"><span>📦</span> Packed fresh on order</div>
                    <div className="co-trust-item"><span>🤝</span> Direct from kitchen</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
