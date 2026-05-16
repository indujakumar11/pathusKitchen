import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    id: 1,
    name: 'Priya Subramaniam',
    location: 'Chennai',
    avatar: 'P',
    rating: 5,
    text: 'I\'ve been using store-bought sambar powder for 10 years. After just one packet of Pathu\'s, I can never go back. The aroma alone is worth it — it fills the entire house when I open the packet.',
    product: 'Sambar Powder',
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Kavitha Rajan',
    location: 'Coimbatore',
    avatar: 'K',
    rating: 5,
    text: 'Ordered the Garlic Idly Podi and Vathakuzhambu Premix. My mother-in-law (who is very particular about masalas!) said it tasted exactly like what her mother used to make. That is the highest compliment possible.',
    product: 'Garlic Idly Podi + Vathakuzhambu Premix',
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Meena Krishnamurthy',
    location: 'Bangalore',
    avatar: 'M',
    rating: 5,
    text: 'I moved to Bangalore from Chennai and was missing home food terribly. Pathu\'s Kitchen is a lifesaver. The Puliyodharai Premix is absolutely temple-style authentic. Ordering every month now!',
    product: 'Puliyodharai Premix',
    date: '3 weeks ago',
  },
  {
    id: 4,
    name: 'Lakshmi Venkat',
    location: 'Hyderabad',
    avatar: 'L',
    rating: 5,
    text: 'The Travel Coffee Premix was a revelation on my last trip. Filter coffee taste without a filter. I now keep three packets in my bag at all times. Everyone in my office has started ordering too!',
    product: 'Travel Coffee Premix',
    date: '1 week ago',
  },
  {
    id: 5,
    name: 'Radha Balakrishnan',
    location: 'Mumbai',
    avatar: 'R',
    rating: 5,
    text: 'The Karuvepillai Podi is something I\'ve never found anywhere else. It\'s rare, nutritious, and incredibly fragrant. My kids who normally resist greens actually eat it happily mixed with rice. Thank you!',
    product: 'Karuvepillai Podi',
    date: '5 days ago',
  },
  {
    id: 6,
    name: 'Anitha Chandrasekhar',
    location: 'Pune',
    avatar: 'A',
    rating: 5,
    text: 'Ordered for the first time last month. The packet was packed so fresh — the smell hit me as soon as I cut the seal open. The rasam I made with that powder was better than any restaurant rasam I\'ve had.',
    product: 'Rasam Powder',
    date: '1 month ago',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef(null);
  const ref = useRef(null);

  const goTo = (idx) => {
    if (isAnimating || idx === active) return;
    setIsAnimating(true);
    gsap.to(cardRef.current, {
      opacity: 0, y: 20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out',
            onComplete: () => setIsAnimating(false) }
        );
      },
    });
  };

  const prev = () => goTo((active - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => goTo((active + 1) % REVIEWS.length);

  /* Auto-advance — restart timer whenever active slide changes */
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials__wrapper', {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonials__wrapper', start: 'top 82%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const r = REVIEWS[active];

  return (
    <section className="testimonials section" id="testimonials" ref={ref}>
      <div className="container">
        <div className="section-head">
          <p className="ornament">What Our Customers Say</p>
          <h2 className="section-title">500+ Happy Families</h2>
          <p className="section-sub">Real reviews from real homes. No filters.</p>
        </div>

        <div
          className="testimonials__wrapper"
          onKeyDown={e => {
            if (e.key === 'ArrowLeft')  prev();
            if (e.key === 'ArrowRight') next();
          }}
          tabIndex={0}
          aria-label="Testimonials carousel — use arrow keys to navigate"
        >
          {/* Main card */}
          <div className="testi-card" ref={cardRef}>
            <div className="testi-card__stars" aria-label={`${r.rating} out of 5 stars`}>
              {'★'.repeat(r.rating)}
            </div>
            <blockquote className="testi-card__text">
              "{r.text}"
            </blockquote>
            <div className="testi-card__footer">
              <div className="testi-card__avatar">{r.avatar}</div>
              <div className="testi-card__meta">
                <strong className="testi-name">{r.name}</strong>
                <span className="testi-loc">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {r.location}
                </span>
                <span className="testi-product">Bought: {r.product}</span>
              </div>
              <span className="testi-date">{r.date}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="testimonials__controls">
            <button className="testi-btn" onClick={prev} aria-label="Previous review">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className="testi-dots">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === active ? 'testi-dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            <button className="testi-btn" onClick={next} aria-label="Next review">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* All avatar row */}
          <div className="testi-avatars">
            {REVIEWS.map((rv, i) => (
              <button
                key={rv.id}
                className={`testi-avatar-btn ${i === active ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={rv.name}
              >
                {rv.avatar}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
