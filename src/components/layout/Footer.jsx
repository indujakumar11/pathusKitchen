import { Link } from 'react-router-dom';
import brandLogo from '../../assets/brand-logo.png';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src={brandLogo} alt="Pathu's Kitchen" style={{ height: '64px', width: 'auto', borderRadius: '50%', flexShrink: 0 }} />
              <div>
                <strong>
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    Pathu's
                    <span style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-16px',
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
                  </span> Kitchen
                </strong>
                <em>Homemade Masalas</em>
              </div>
            </Link>
            <p className="footer__tagline">
              Crafted with love, ground fresh in small batches from the finest whole spices.
              Bringing the authentic taste of a South Indian home kitchen to your table.
            </p>
            <a
              href="https://wa.me/919XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp footer__wa-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Order on WhatsApp
            </a>
          </div>

          {/* Products */}
          <div className="footer__col">
            <h4>Products</h4>
            <ul>
              <li><Link to="/products?cat=masala-powders">Masala Powders</Link></li>
              <li><Link to="/products?cat=premix">Premix</Link></li>
              <li><Link to="/products?cat=instant-use">Instant Use</Link></li>
              <li><Link to="/products">All Products</Link></li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#about">Our Story</a></li>
              <li><a href="/#how-we-make">How We Make It</a></li>
              <li><a href="/#testimonials">Reviews</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div className="footer__col footer__trust">
            <h4>Why Trust Us</h4>
            <div className="trust-item">
              <span>🌿</span>
              <span>No preservatives or additives</span>
            </div>
            <div className="trust-item">
              <span>🏺</span>
              <span>Small-batch, stone-ground</span>
            </div>
            <div className="trust-item">
              <span>📦</span>
              <span>Freshly packed on order</span>
            </div>
            <div className="trust-item">
              <span>🤝</span>
              <span>500+ happy families served</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Pathu's Kitchen. All rights reserved. Made with ❤️ in South India.</p>
        </div>
      </div>
    </footer>
  );
}
