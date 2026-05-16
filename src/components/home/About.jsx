import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { icon: '', title: 'No Preservatives', desc: 'Pure whole spices, nothing else. What you taste is exactly what nature intended.' },
  { icon: '', title: 'Stone Ground', desc: 'Traditional stone grinding preserves the essential oils and aromatics that machines destroy.' },
  { icon: '', title: 'Packed Fresh', desc: 'Ground and packed only when you order. Maximum freshness, maximum flavour.' },
  { icon: '', title: 'Made with Love', desc: 'Every batch is a labour of love — the same care your grandmother put into her kitchen.' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about__image-wrap', {
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__image-wrap', start: 'top 80%', once: true },
      });

      gsap.from('.about__text-content', {
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about__text-content', start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        {/* Main about grid */}
        <div className="about__grid">
          <div className="about__image-wrap">
            <img
              src="/assets/images/anjaraipetti.jpg"
              alt="A warm South Indian kitchen with anjaraipetti spice box"
              loading="lazy"
              className="about__image"
            />
            <div className="about__image-badge">
              <span className="badge-num">5+</span>
              <span className="badge-txt">Years of Crafting</span>
            </div>
            <div className="about__image-note">

              <span>Small batches, big flavour</span>
            </div>
          </div>

          <div className="about__text-content">
            <p className="ornament">The Story Behind Every Jar</p>
            <h2 className="about__title">
              A Kitchen Born from<br />
              <em>Generations of Flavour</em>
            </h2>
            <p className="about__lead">
              Pathu's Kitchen began the way all good things do — quietly, in a home kitchen,
              with a woman who refused to compromise on flavour.
            </p>
            <p className="about__body">
              What started as making masalas for family and neighbours grew into something
              bigger when people kept asking for more. Every recipe has been passed down,
              refined over decades, and made the same way it always was — whole spices,
              stone grinder, and patient hands.
            </p>
            <p className="about__body">
              We believe your food deserves better than factory-ground powders that sat
              in a warehouse for months. Ours is different. Every packet leaves our kitchen
              within 24 hours of being ground.
            </p>

            <div className="about__highlights">
              <div className="highlight">
                <span className="hl-num">100%</span>
                <span className="hl-txt">Natural Ingredients</span>
              </div>
              <div className="highlight">
                <span className="hl-num">24hr</span>
                <span className="hl-txt">Fresh Ground to Pack</span>
              </div>
              <div className="highlight">
                <span className="hl-num">0</span>
                <span className="hl-txt">Artificial Additives</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="about__pillars">
          {PILLARS.map((p, i) => (
            <div className="about__pillar" key={i}>
              <span className="pillar-icon" aria-hidden="true">{p.icon}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
