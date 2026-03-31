import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/services';
import ProductCard from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonLoader';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const features = [
  { icon: '🌱', title: 'Farm Fresh', desc: 'Sourced directly from organic farms in Kajanaparai' },
  { icon: '🔬', title: 'Lab Tested', desc: 'Every batch quality-tested for purity and potency' },
  { icon: '🚚', title: 'Direct Delivery', desc: 'From farm to your doorstep, no middlemen' },
  { icon: '💚', title: '100% Natural', desc: 'No additives, preservatives, or artificial colors' },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res.data.data.slice(0, 2)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="text-white animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/30">
              <span>🌿</span> Pure & Organic Spices from Kajanaparai
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Nithyam<br />
              <span className="text-accent">Divyam</span><br />
              Spices
            </h1>
            <p className="text-white/80 text-xl leading-relaxed mb-10 max-w-lg">
              Hand-picked from nature's finest estates. Experience the authentic taste of pure, 
              farm-sourced spices that have been cherished for generations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-accent hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 hover:shadow-lg active:scale-95">
                Shop Now <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link to="/about" className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold border border-white/30 transition-all duration-200 backdrop-blur-sm">
                Our Story
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">🌶️</div>
                  <p className="font-heading text-2xl font-bold">Premium Quality</p>
                  <p className="text-white/70">Certified Organic</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-accent/90 backdrop-blur-sm rounded-2xl p-4 text-white text-center animate-pulse-soft shadow-lg">
                <div className="text-3xl">🌿</div>
                <p className="text-xs font-semibold mt-1">100% Natural</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white text-center shadow-lg">
                <div className="text-3xl">⭐</div>
                <p className="text-xs font-semibold mt-1">Farm Fresh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle mb-3">Our Story</p>
              <h2 className="section-title mb-6">A Legacy of Purity,<br />Rooted in Nature</h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Founded by <strong className="text-gray-700">Ayyappan S S</strong> in the verdant hills of Kajanaparai, 
                Nithyam Divyam Spices was born from a simple belief — that the finest spices come from 
                farms nurtured with care, not chemicals.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Under the leadership of <strong className="text-gray-700">Yugesh Kumar S A</strong>, we continue 
                to bring nature's purest spices directly from organic estates to your kitchen, 
                preserving authenticity at every step.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Organic Certified', 'No Preservatives', 'Direct Sourcing', 'Farm Tracked'].map((tag) => (
                  <span key={tag} className="flex items-center gap-1 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                    <CheckCircleIcon className="w-4 h-4" /> {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">🌱</div>
                <p className="font-heading text-3xl font-bold text-primary">100%</p>
                <p className="text-gray-500 text-sm mt-1">Organic</p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">🏔️</div>
                <p className="font-heading text-3xl font-bold text-accent">Farm</p>
                <p className="text-gray-500 text-sm mt-1">Direct</p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">✨</div>
                <p className="font-heading text-3xl font-bold text-accent">Pure</p>
                <p className="text-gray-500 text-sm mt-1">No Additives</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">❤️</div>
                <p className="font-heading text-3xl font-bold text-primary">Care</p>
                <p className="text-gray-500 text-sm mt-1">Hand Picked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">Our Products</p>
            <h2 className="section-title mb-4">Nature's Finest Spices</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Hand-selected from organic farms, each spice is processed with care to preserve its natural aroma and flavor.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {loading
              ? [1, 2].map((n) => <SkeletonCard key={n} />)
              : products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline">
              View All Products <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-3">Why Us</p>
            <h2 className="font-heading text-4xl font-bold mb-4">The Nithyam Divyam Difference</h2>
            <p className="text-white/70 max-w-xl mx-auto">We go beyond just selling spices — we deliver an experience rooted in purity, care, and nature.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/10">
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-5xl mb-6">🌶️</div>
          <h2 className="section-title mb-4">Ready to Experience the Purity?</h2>
          <p className="text-gray-500 mb-10 text-lg">Order fresh Black Pepper and Cardamom directly from our farm. Fast delivery, guaranteed freshness.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="btn-primary text-base px-8 py-4">
              Order Now <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/917306807443?text=Hi%2C%20I%27m%20interested%20in%20your%20spices%21"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all duration-200 hover:shadow-lg"
            >
              <span>💬</span> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
