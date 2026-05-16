import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS, CATEGORIES, getFeaturedProducts } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import ScrollToTopBtn from '../components/ui/ScrollToTopBtn';
import './Products.css';

gsap.registerPlugin(ScrollTrigger);

const CAT_META = {
  'masala-powders': {
    image: '/assets/images/coverimage.jpg',
    color: '#B5341A', bg: '#FBE9E4',
  },
  'premix': {
    image: '/assets/images/whole_spices.png',
    color: '#3D6B47', bg: '#E6F0E8',
  },
  'instant-use': {
    image: '/assets/images/filter_coffee.png',
    color: '#C8850A', bg: '#FEF3D7',
  },
};

/* ─────────────────────────────────────────
   LANDING: category cards + featured
───────────────────────────────────────── */
function ProductsLanding({ onSelect }) {
  const ref = useRef(null);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.products-intro', { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      {/* Intro */}
      <div className="products-intro">
        <div className="container products-intro__inner">
          <p className="ornament">Fresh from our kitchen</p>
          <h1 className="products-intro__title">Our Products</h1>
          <p className="products-intro__sub">
            Stone-ground in small batches, packed on order — no preservatives, just pure flavour.
          </p>
        </div>
      </div>

      {/* Category cards */}
      <section className="products-cats">
        <div className="container">
          <div className="section-head section-head--left">
            <h2 className="section-title section-title--sm">Browse by Category</h2>
            <p className="section-sub">Pick a category to explore all products in that range.</p>
          </div>
          <div className="products-cats__grid">
            {CATEGORIES.map(cat => {
              const meta = CAT_META[cat.id];
              const count = PRODUCTS.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  className="pcat-card"
                  style={{ '--pcat-color': meta.color, '--pcat-bg': meta.bg }}
                  onClick={() => onSelect(cat.id)}
                >
                  <div className="pcat-card__img-wrap">
                    <img src={meta.image} alt={cat.label} loading="lazy" />
                    <div className="pcat-card__img-overlay" />
                    <span className="pcat-card__icon">{cat.icon}</span>
                  </div>
                  <div className="pcat-card__body">
                    <div className="pcat-card__top">
                      <span className="pcat-card__label">{cat.label}</span>
                      <span className="pcat-card__count">{count} products</span>
                    </div>
                    <p className="pcat-card__desc">{cat.description}</p>
                    <span className="pcat-card__cta">
                      Shop Now
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signature / Featured products */}
      <section className="products-signature">
        <div className="container">
          <div className="section-head section-head--left">
            <p className="ornament">Customer Favourites</p>
            <h2 className="section-title section-title--sm">Signature Products</h2>
            <p className="section-sub">Our most loved, fast-moving masalas — tried and trusted by hundreds of families.</p>
          </div>
          <div className="products-signature__grid">
            {featuredProducts.map(product => (
              <div className="psig-card" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────
   CATEGORY VIEW: products for one category
───────────────────────────────────────── */
function ProductsCategoryView({ categoryId, initialSearch, onBack }) {
  const [search, setSearch] = useState(initialSearch || '');
  const gridRef = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    if (initialSearch !== null) setSearch(initialSearch);
  }, [initialSearch]);

  const category = categoryId ? CATEGORIES.find(c => c.id === categoryId) : null;
  const meta = categoryId ? CAT_META[categoryId] : { bg: '#F2E8DC', color: '#2D1810', image: '/assets/images/coverimage.jpg' };

  const filtered = PRODUCTS.filter(p => {
    const inCat = categoryId ? p.category === categoryId : true;
    const inSrc = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return inCat && inSrc;
  });

  /* Entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pcat-header', { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, [categoryId]);

  /* Re-animate on search */
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.pcat-view__card');
    gsap.killTweensOf(cards);
    gsap.fromTo(cards,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, [search]);

  return (
    <div ref={ref}>
      {/* Category header */}
      <div className="pcat-header" style={{ '--pcat-color': meta.color, '--pcat-bg': meta.bg }}>
        <div className="pcat-header__bg">
          <img src={meta.image} alt={category?.label} />
          <div className="pcat-header__overlay" />
        </div>
        <div className="container pcat-header__inner">
          <button className="pcat-back-btn" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Categories
          </button>
          <div className="pcat-header__content">
            <span className="pcat-header__icon">{category?.icon}</span>
            <div>
              <h1 className="pcat-header__title">{category?.label || 'All Products'}</h1>
              <p className="pcat-header__sub">{category?.description || 'Explore our complete collection of homemade masalas and premixes.'}</p>
            </div>
          </div>
        </div>
      </div>



      {/* Product grid */}
      <div className="container pcat-view__content">
        {filtered.length > 0 ? (
          <div className="products-grid" ref={gridRef}>
            {filtered.map(product => (
              <div className="pcat-view__card products-grid__card" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="products-empty">

            <h3>No products found</h3>
            <p>Try a different search term.</p>
            <button className="btn btn-outline btn-sm" onClick={() => setSearch('')}>
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get('cat');
  const q = searchParams.get('q');
  const isLanding = !cat && !q;

  const handleSelect = (catId) => {
    setSearchParams({ cat: catId });
    window.scrollTo({ top: 0 });
  };

  const handleBack = () => {
    setSearchParams({});
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="page products-page">
      {isLanding
        ? <ProductsLanding onSelect={handleSelect} />
        : <ProductsCategoryView categoryId={cat} initialSearch={q} onBack={handleBack} />
      }
      <ScrollToTopBtn />
    </div>
  );
}
