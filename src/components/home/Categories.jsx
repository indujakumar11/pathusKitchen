import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import masala3d from '../../assets/icons/masala_3d.png';
import './Categories.css';

const CATS = [
  {
    id: 'masala-powders',
    label: 'Masala Powders',
    icon: masala3d,
    desc: 'Freshly ground daily-use spice blends — from aromatic sambar powder to rich garam masala.',
    image: '/assets/images/coverimage.jpg',
    color: '#B5341A',
    bg: '#FBE9E4',
  },
  {
    id: 'premix',
    label: 'Premix',
    icon: '/assets/images/rasampremix.jpg',
    desc: 'Ready-to-use spice blends for classic South Indian dishes — just add the main ingredient.',
    image: '/assets/images/whole_spices.png',
    color: '#3D6B47',
    bg: '#E6F0E8',
  },
  {
    id: 'instant-use',
    label: 'Instant Use',
    icon: '/assets/images/filter_coffee.png',
    desc: 'Grab-and-go classics — pulikachal, filter coffee premix, and masala chai for everyday indulgence.',
    image: '/assets/images/filter_coffee.png',
    color: '#C8850A',
    bg: '#FEF3D7',
  },
];

export default function Categories() {
  return (
    <section className="categories section landing-section">
      <div className="container">
        <div className="section-head">
          <p className="ornament">Our Collection</p>
          <h2 className="section-title">Authentic Flavours, <br /> Delivered to Your Door</h2>
          <p className="section-sub">Explore our range of freshly ground masalas and traditional premixes.</p>
        </div>

        <div className="categories__grid">
          {CATS.map((cat) => (
            <Link
              to={`/products?cat=${cat.id}`}
              className="cat-card"
              key={cat.id}
              style={{ '--cat-color': cat.color, '--cat-bg': cat.bg }}
            >
              <div className="cat-card__img-wrap">
                <img
                  src={cat.image}
                  alt={cat.label}
                  loading="lazy"
                  className="cat-card__img"
                />
                <div className="cat-card__img-overlay" />
                <div className="cat-card__icon-wrap">
                  <img src={cat.icon} alt="" className="cat-card__icon-img" />
                </div>
              </div>
              <div className="cat-card__body">
                <div className="cat-card__meta">
                  <span className="cat-card__label">{cat.label}</span>
                  <span className="cat-card__count">{PRODUCTS.filter(p => p.category === cat.id).length} products</span>
                </div>
                <p className="cat-card__desc">{cat.desc}</p>
                <span className="cat-card__cta">
                  Shop Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
