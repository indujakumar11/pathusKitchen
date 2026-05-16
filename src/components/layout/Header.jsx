import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Header.css';
import brandLogo from '../../assets/brand-logo.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const goHash = (e, hash) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + hash);
    }
  };

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* entrance animation */
  useEffect(() => {
    const tween = gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.05, clearProps: 'all' }
    );
    return () => tween.kill();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`header header--solid ${scrolled ? 'header--scrolled' : ''}`}
      >
        <div className="container header__inner">
          {/* Logo */}
          <Link to="/" className="header__logo">
            <img src={brandLogo} alt="Pathu's Kitchen" className="brand-logo-img" style={{ height: '56px', width: 'auto', borderRadius: '50%' }} />
            <span className="logo-text">
              <span className="logo-main" style={{ position: 'relative' }}>
                Pathu's
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0px'
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ transform: 'rotate(15deg)' }}>
                    <path d="M8 18 C 5 18, 5 12, 10 8 C 13 5, 17 3, 17 3 C 17 3, 16 7, 13 11 C 9 16, 8 18, 8 18 Z" fill="var(--color-accent)" />
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginTop: '-4px', marginLeft: '4px' }}>
                    <path d="M17 12 C 17 12, 22 8, 22 8 C 22 8, 19 4, 15 8 C 12 11, 12 16, 12 16 C 12 16, 15 15, 17 12 Z" fill="var(--color-whatsapp)" />
                  </svg>
                </span>
              </span>
              <span className="logo-sub">Kitchen</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="header__nav">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`} end>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              Products
            </NavLink>
            <a href="/#about" className="nav-link" onClick={e => goHash(e, '#about')}>Our Story</a>
            <a href="/#how-we-make" className="nav-link" onClick={e => goHash(e, '#how-we-make')}>Process</a>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="header__actions">
            <form className="header__search" onSubmit={(e) => {
              e.preventDefault();
              const q = e.target.q.value;
              if (q) navigate(`/products?q=${encodeURIComponent(q)}`);
            }}>
              <input type="text" name="q" placeholder="Search..." aria-label="Search products" />
              <button type="submit" aria-label="Submit search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>
            <Link to="/wishlist" className="header__wishlist btn-ghost" aria-label={`Wishlist (${wishlistCount} items)`} style={{ position: 'relative', display: 'flex', padding: '8px', color: 'var(--color-primary)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && <span className="cart-badge" style={{ top: '0px', right: '0px' }}>{wishlistCount > 9 ? '9+' : wishlistCount}</span>}
            </Link>

            <Link to="/cart" className="header__cart" aria-label={`Cart (${totalItems} items)`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && <span className="cart-badge">{totalItems > 9 ? '9+' : totalItems}</span>}
            </Link>

            {/* Hamburger */}
            <button
              className={`header__burger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <form className="mobile-search" onSubmit={(e) => {
          e.preventDefault();
          const q = e.target.q.value;
          if (q) {
            setMenuOpen(false);
            navigate(`/products?q=${encodeURIComponent(q)}`);
          }
        }}>
          <input type="text" name="q" placeholder="Search products..." />
          <button type="submit">Search</button>
        </form>
        <nav className="mobile-menu__nav">
          <NavLink to="/" onClick={() => setMenuOpen(false)} end>Home</NavLink>
          <NavLink to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
          <a href="/#about" onClick={e => { setMenuOpen(false); goHash(e, '#about'); }}>Our Story</a>
          <a href="/#how-we-make" onClick={e => { setMenuOpen(false); goHash(e, '#how-we-make'); }}>Process</a>
          <a href="/#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</NavLink>
        </nav>
        <div className="mobile-menu__footer">
          <Link to="/cart" className="btn btn-primary btn-block" onClick={() => setMenuOpen(false)}>
            View Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
          <Link to="/wishlist" className="btn btn-outline btn-block" onClick={() => setMenuOpen(false)}>
            My Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </Link>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
