import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFeaturedProducts } from '../../data/products';
import ProductCard from '../products/ProductCard';
import './FeaturedProducts.css';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProducts() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.featured-card', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured__grid',
          start: 'top 82%',
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const featured = getFeaturedProducts();

  return (
    <section className="featured section" ref={ref}>
      <div className="container">
        <div className="section-head">
          <p className="ornament">Handpicked for You</p>
          <h2 className="section-title">Customer Favourites</h2>
          <p className="section-sub">The masalas our customers order again and again.</p>
        </div>

        <div className="featured__grid">
          {featured.map(product => (
            <div className="featured-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="featured__cta">
          <Link to="/products" className="btn btn-outline btn-lg">
            View All Products
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
