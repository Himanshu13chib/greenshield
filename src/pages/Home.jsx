import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award, Leaf, TrendingUp, Users, Star, ChevronRight, Zap, BarChart3, Package } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';
import logoImg from '../assets/logo.jpg';
import AnimatedFeatureSlider from '../components/AnimatedFeatureSlider';

const stats = [
  { icon: Users, value: '15,000+', label: 'Happy Farmers', color: '#22c55e' },
  { icon: Package, value: '500+', label: 'Products', color: '#10b981' },
  { icon: TrendingUp, value: '98%', label: 'Satisfaction Rate', color: '#84cc16' },
  { icon: Award, value: '12+', label: 'Years Experience', color: '#f59e0b' },
];

const features = [
  { icon: Shield, title: 'Quality Assured', desc: 'All products are certified and tested for quality and effectiveness', color: '#22c55e' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Same-day dispatch for orders placed before 2 PM. Pan-India delivery', color: '#3b82f6' },
  { icon: Zap, title: 'Smart Inventory', desc: 'Real-time stock tracking with low-stock alerts and demand forecasting', color: '#f59e0b' },
  { icon: BarChart3, title: 'Expert Guidance', desc: 'Free agronomist consultation with every purchase above ₹2000', color: '#8b5cf6' },
];

const testimonials = [
  { name: 'Ramesh Yadav', location: 'Uttar Pradesh', rating: 5, text: 'GreenShield\'s NPK fertilizer doubled my wheat yield this season. The quality is unmatched and delivery was super fast!', crop: 'Wheat Farmer' },
  { name: 'Sunita Devi', location: 'Punjab', rating: 5, text: 'The hybrid seeds I bought gave 40% more yield than my previous supplier. Highly recommend GreenShield to all farmers.', crop: 'Paddy Farmer' },
  { name: 'Vijay Patil', location: 'Maharashtra', rating: 5, text: 'Excellent organic pesticides. My crops are healthier and I\'m getting premium prices in the market for chemical-free produce.', crop: 'Vegetable Farmer' },
];

export default function Home() {
  const { products } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featured = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 4);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 15).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2d1a 0%, #1a4a2e 40%, #0d3320 100%)',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        paddingTop: '70px',
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16,185,129,0.1) 0%, transparent 40%),
            radial-gradient(circle at 60% 80%, rgba(132,204,22,0.08) 0%, transparent 40%)`,
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1.5rem',
              }}>
                <Leaf size={14} color="#22c55e" />
                <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>India's Trusted Agriculture Platform</span>
              </div>

              <h1 style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.15,
                color: 'white', marginBottom: '1.5rem',
              }}>
                Grow Smarter with{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #22c55e, #84cc16)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>GreenShield</span>
              </h1>

              <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '480px' }}>
                Premium fertilizers, certified seeds, organic pesticides, and smart farming tools — everything your farm needs, delivered to your doorstep.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <Link to="/products" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn" style={{
                  padding: '0.875rem 2rem', fontSize: '1rem',
                  background: 'rgba(255,255,255,0.08)', color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>
                  Get Consultation
                </Link>
              </div>

              {/* Mini stats */}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {stats.slice(0, 3).map(({ icon: Icon, value, label, color }) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', color }}>{value}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

                {/* Logo image */}
                <div style={{
                  width: 'min(300px, 70vw)', height: 'min(300px, 70vw)',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(34,197,94,0.3)',
                  boxShadow: '0 0 60px rgba(34,197,94,0.25), 0 0 120px rgba(34,197,94,0.1)',
                  overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img
                    src={logoImg}
                    alt="GreenShield"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Live stock indicator */}
                <div style={{
                  background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: '12px', padding: '0.875rem 1.25rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  width: '100%',
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.3)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
                  <div>
                    <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>Live Inventory Tracking</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Real-time stock updates across all products</div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 36.7C1200 33.3 1320 26.7 1380 23.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="var(--bg-primary)" />
          </svg>
        </div>
      </section>

      {/* Animated Feature Slider */}
      <AnimatedFeatureSlider />

      {/* Stats Bar */}
      <section style={{ padding: '3rem 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '1rem' }}>
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div key={label} style={{
                textAlign: 'center', padding: '1.5rem',
                background: 'var(--bg-secondary)', borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: `${color}15`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 0.75rem',
                }}>
                  <Icon size={22} color={color} />
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.75rem', color }}>{value}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Star size={18} color="#f59e0b" fill="#f59e0b" />
                <span style={{ fontSize: '0.875rem', color: 'var(--green-600)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Picks</span>
              </div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Products</h2>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>Handpicked by our agronomists for maximum results</p>
            </div>
            <Link to="/products" className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what your farm needs</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {categories.filter(c => c.id !== 'all').map(cat => (
              <Link key={cat.id} to={`/products?category=${cat.id}`} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
                padding: '1.5rem 1rem', background: 'var(--bg-secondary)',
                border: '2px solid var(--border)', borderRadius: 'var(--radius)',
                transition: 'all 0.3s ease', textDecoration: 'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green-500)'; e.currentTarget.style.background = 'var(--green-50)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{ fontSize: '2.5rem' }}>{cat.icon}</span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', textAlign: 'center' }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #fff7ed, #fef3c7)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>🔥</span>
                  <span style={{ fontSize: '0.875rem', color: '#d97706', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Limited Stock</span>
                </div>
                <h2 className="section-title" style={{ marginBottom: 0, color: '#92400e' }}>Running Out Fast!</h2>
                <p style={{ color: '#b45309', marginBottom: 0 }}>Grab these before they're gone</p>
              </div>
            </div>
            <div className="grid-4">
              {lowStock.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Zap size={18} color="#3b82f6" />
                  <span style={{ fontSize: '0.875rem', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Just Arrived</span>
                </div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>New Arrivals</h2>
                <p className="section-subtitle" style={{ marginBottom: 0 }}>Latest additions to our inventory</p>
              </div>
              <Link to="/products?filter=new" className="btn btn-outline">View All <ChevronRight size={16} /></Link>
            </div>
            <div className="grid-4">
              {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">Why Choose GreenShield?</h2>
            <p className="section-subtitle">We're more than just a supplier — we're your farming partner</p>
          </div>
          <div className="grid-4">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} style={{
                padding: '2rem', background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius)', border: '1px solid var(--border)',
                textAlign: 'center', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${color}20`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  width: '60px', height: '60px', borderRadius: '16px',
                  background: `${color}15`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 1.25rem',
                }}>
                  <Icon size={26} color={color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.625rem', color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, #0f2d1a, #1a4a2e)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ color: 'white' }}>What Farmers Say</h2>
            <p style={{ color: '#94a3b8' }}>Real stories from real farmers across India</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius)',
                padding: '1.75rem',
              }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #15803d)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '1rem',
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{t.crop} · {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--green-600), var(--green-800))',
            borderRadius: '24px', padding: '3rem', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'white', marginBottom: '1rem' }}>
                Ready to Transform Your Farm?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                Join 15,000+ farmers who trust GreenShield for their agricultural needs
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/products" className="btn" style={{ background: 'white', color: 'var(--green-700)', padding: '0.875rem 2rem', fontWeight: 700 }}>
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '0.875rem 2rem' }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
