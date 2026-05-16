import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { openWhatsApp } from '../utils/whatsapp';
import './Contact.css';

const INITIAL = { name: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.from('.contact-info-card', {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out', delay: 0.2,
      });
      gsap.from('.contact-form-wrap', { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.25 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                   e.name    = 'Please enter your name';
    if (!/^[6-9]\d{9}$/.test(form.phone))   e.phone   = 'Enter a valid 10-digit mobile number';
    if (!form.message.trim())                e.message = 'Please enter a message';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleaned = name === 'phone' ? value.replace(/\D/g, '') : value;
    setForm(f => ({ ...f, [name]: cleaned }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      gsap.fromTo('.contact-submit-btn', { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(2, 0.4)' });
      return;
    }
    const msg = `Hi Pathu's Kitchen! 🙏\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage:\n${form.message}\n\nLooking forward to hearing from you!`;
    openWhatsApp(msg);
    setSent(true);
    setForm(INITIAL);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-page" ref={pageRef}>
      {/* Hero */}
      <div className="contact-hero">
        <div className="contact-hero__bg">
          <img
            src="assets/images/carousel1.jpg"
            alt="Spices"
            loading="eager"
          />
          <div className="contact-hero__overlay" />
        </div>
        <div className="container contact-hero__content">
          <p className="ornament contact-hero__ornament">We'd Love to Hear From You</p>
          <h1 className="contact-hero__title">Get in Touch</h1>
          <p className="contact-hero__sub">
            Questions, bulk orders, or just want to say hello — reach us on WhatsApp or drop a message below.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container contact-body">
        {/* Info cards */}
        <aside className="contact-info">
          <div className="contact-info-card contact-info-card--wa">
            <div className="cic-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <h3 className="cic-label">WhatsApp (Preferred)</h3>
              <p className="cic-value">Chat with us directly for orders &amp; queries</p>
              <a
                href="https://wa.me/919XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp cic-btn"
              >
                Open WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="cic-icon cic-icon--loc">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <h3 className="cic-label">Location</h3>
              <p className="cic-value">Chennai, Tamil Nadu</p>
              <p className="cic-sub">Pan-India delivery via courier</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="cic-icon cic-icon--clock">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <h3 className="cic-label">Order Hours</h3>
              <p className="cic-value">Mon – Sat, 9 AM – 7 PM</p>
              <p className="cic-sub">Orders placed outside hours processed next day</p>
            </div>
          </div>

          <div className="contact-info-card contact-info-card--bulk">
            <div className="cic-icon cic-icon--bulk">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
            </div>
            <div>
              <h3 className="cic-label">Bulk Orders</h3>
              <p className="cic-value">Special pricing for orders above 2 kg per product</p>
              <p className="cic-sub">Contact us on WhatsApp for bulk rates</p>
            </div>
          </div>
        </aside>

        {/* Form */}
        <div className="contact-form-wrap">
          <div className="contact-form-card">
            <h2 className="contact-form-title">Send a Message</h2>
            <p className="contact-form-sub">
              Fill in the form and we'll open WhatsApp with your message pre-filled. Just tap Send.
            </p>

            {sent && (
              <div className="contact-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                WhatsApp opened with your message. We'll reply shortly!
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className={`cf-field ${errors.name ? 'has-error' : ''}`}>
                <label htmlFor="c-name">Your Name <span className="req-star">*</span></label>
                <div className="cf-input-wrap">
                  <svg className="cf-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input
                    id="c-name" name="name" type="text"
                    placeholder="e.g. Priya Subramaniam"
                    value={form.name} onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
                {errors.name && <p className="cf-err">⚠ {errors.name}</p>}
              </div>

              <div className={`cf-field ${errors.phone ? 'has-error' : ''}`}>
                <label htmlFor="c-phone">Mobile / WhatsApp <span className="req-star">*</span></label>
                <div className="cf-phone-wrap">
                  <span className="phone-pre">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                    +91
                  </span>
                  <input
                    id="c-phone" name="phone" type="tel"
                    placeholder="9876543210"
                    value={form.phone} onChange={handleChange}
                    maxLength={10} autoComplete="tel-national" inputMode="numeric"
                  />
                </div>
                {errors.phone && <p className="cf-err">⚠ {errors.phone}</p>}
              </div>

              <div className={`cf-field cf-field--full ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="c-msg">Message <span className="req-star">*</span></label>
                <div className="cf-input-wrap cf-input-wrap--ta">
                  <svg className="cf-ico cf-ico--top" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  <textarea
                    id="c-msg" name="message" rows={5}
                    placeholder="Hi! I'd like to enquire about bulk orders / a specific product..."
                    value={form.message} onChange={handleChange}
                  />
                </div>
                {errors.message && <p className="cf-err">⚠ {errors.message}</p>}
              </div>

              <button type="submit" className="btn btn-whatsapp btn-block btn-lg contact-submit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
