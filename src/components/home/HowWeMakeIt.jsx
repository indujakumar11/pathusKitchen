import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowWeMakeIt.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Source Whole Spices',
    desc: 'We source only whole, unprocessed spices directly from trusted farmers — coriander from Rajasthan, pepper from Kerala, turmeric from Erode.',
    icon: '',
    image: 'assets/images/whole_spices.png',
  },
  {
    num: '02',
    title: 'Sun Dry & Roast',
    desc: 'Each spice is sun-dried or slow-roasted over low flame to unlock its full aroma before grinding. No shortcuts, ever.',
    icon: '',
    image: 'assets/images/carousel1.jpg',
  },
  {
    num: '03',
    title: 'Stone Ground Fresh',
    desc: 'Ground on a traditional stone mill that preserves the natural oils. The difference in aroma versus factory grinding is immediate and unmistakable.',
    icon: '',
    image: 'assets/images/carousel2.jpg',
  },
  {
    num: '04',
    title: 'Packed on Order',
    desc: 'We grind and pack only after you place your order. No sitting on shelves for months. Your masala is as fresh as it gets.',
    icon: '',
    image: 'assets/images/carousel3.jpg',
  },
];

export default function HowWeMakeIt() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Steps stagger in */
      gsap.from('.process-step', {
        x: -50,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process__steps',
          start: 'top 80%',
          once: true,
        },
      });

      /* Connecting line grows */
      gsap.from('.process__line-fill', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process__steps',
          start: 'top 75%',
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process section" id="how-we-make" ref={ref}>
      <div className="container">
        <div className="process__header">
          <p className="ornament">The Process</p>
          <h2 className="section-title">How We Make It</h2>
          <p className="section-sub">
            Four deliberate steps that turn raw whole spices into the flavourful masalas
            you taste in every dish.
          </p>
        </div>

        <div className="process__steps">
          <div className="process__line">
            <div className="process__line-fill" />
          </div>

          {STEPS.map((step, i) => (
            <div className={`process-step ${i % 2 === 1 ? 'process-step--flip' : ''}`} key={step.num}>
              <div className="process-step__content">
                <div className="step-num">{step.num}</div>
                <h3 className="step-title">
                  <span className="step-icon">{step.icon}</span>
                  {step.title}
                </h3>
                <p className="step-desc">{step.desc}</p>
              </div>
              <div className="process-step__dot" aria-hidden="true">
                <span />
              </div>
              <div className="process-step__image-wrap">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="step-img"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="process__promise">
          
          <p>
            <strong>Our Promise:</strong> If your masala doesn't smell intensely fresh
            when you open the packet, we'll replace it. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
