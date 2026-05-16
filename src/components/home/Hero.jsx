import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import masala3d from '../../assets/icons/masala_3d.png';
import './Hero.css';

const PARTICLES = Array.from({ length: 12 });

export default function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Text animations
      tl.from('.hero-word', {
        y: 60, opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from('.hero__subtitle', { y: 20, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .from('.hero__actions', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('.hero__stats', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');

      // 3D Image Entrance
      tl.from(imgRef.current, {
        scale: 0.7,
        opacity: 0,
        y: 80,
        rotation: 12,
        duration: 1.4,
        ease: 'back.out(1.2)',
      }, '-=1.2');

      // Continuous Floating Animation
      gsap.to(imgRef.current, {
        y: -30,
        rotation: -4,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });

      // Particles Entrance
      tl.from('.hero-particle', {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'back.out(2)',
      }, '-=1');

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="container hero__inner">
        {/* Left: Text Content */}
        <div className="hero__content">


          <h1 className="hero__title">
            <span className="hero__line">
              {'Freshly Ground'.split(' ').map((w, i) => (
                <span className="hero-word" key={i}>{w}&nbsp;</span>
              ))}
            </span>
            <span className="hero__line hero__line--accent">
              {'Homemade Masalas'.split(' ').map((w, i) => (
                <span className="hero-word" key={i}>{w}&nbsp;</span>
              ))}
            </span>
          </h1>

          <p className="hero__subtitle">
            Crafted with love in a South Indian kitchen — stone-ground in small batches,
            packed fresh, and delivered right to your door.
          </p>

          <div className="hero__actions">
            <Link to="/products" className="btn btn-primary btn-xl">
              Order Now
            </Link>
            <a
              href="#about"
              className="btn btn-secondary btn-xl"
              onClick={e => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Our Story
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="stat-num">20+</span>
              <span className="stat-lbl">Products</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <span className="stat-num">500+</span>
              <span className="stat-lbl">Happy Families</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <span className="stat-num">5+</span>
              <span className="stat-lbl">Years of Love</span>
            </div>
          </div>
        </div>

        {/* Right: Transparent 3D Asset */}
        <div className="hero__3d-wrap">
          <div className="hero__3d-glow" aria-hidden="true" />
          <img
            ref={imgRef}
            src={masala3d}
            alt="Authentic 3D Masala"
            className="hero__3d-img"
            loading="eager"
          />

          {/* Floating Particles */}
          <div className="hero__particles" aria-hidden="true">
            {PARTICLES.map((_, i) => {
              // Generate random properties for organic feel
              const size = Math.random() * 8 + 4; // 4px to 12px
              const opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
              const animDuration = Math.random() * 4 + 4; // 4s to 8s
              const isGold = Math.random() > 0.5;

              return (
                <div
                  key={i}
                  className={`hero-particle ${isGold ? 'particle-gold' : 'particle-red'}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: opacity,
                    top: `${Math.random() * 90}%`,
                    left: `${Math.random() * 90}%`,
                    animationDuration: `${animDuration}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
