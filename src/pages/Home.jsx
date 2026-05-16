import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HowWeMakeIt from '../components/home/HowWeMakeIt';
import Testimonials from '../components/home/Testimonials';
import WhatsAppCTA from '../components/home/WhatsAppCTA';

export default function Home() {
  return (
    <div className="page">
      <Hero />
      <About />
      <FeaturedProducts />
      <HowWeMakeIt />
      <Testimonials />
      <WhatsAppCTA />
    </div>
  );
}
