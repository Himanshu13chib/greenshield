import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Zap, Shield, Truck, Award, Users } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';

// Hero banner slides
const banners = [
  {
    bg: 'linear-gradient(120deg, #14532d 0%, #166534 50%, #15803d 100%)',
    tag: '🌿 AI-Powered',
    title: 'Detect Crop Diseases',
    subtitle: 'Instant diagnosis with 96.9% accuracy',
    cta: { label: 'Try Free', to: '/disease-detection' },
    badge: '96.9% Accuracy',
    emoji: '🔬',
  },
  {
    bg: 'linear-gradient(120deg, #1e3a5f 0%, #1d4ed8 50%, #2563eb 100%)',
    tag: '🌾 New Season',
    title: 'Hybrid Seeds 2024',
    subtitle: '40% more yield — certified & tested',
    cta: { label: 'Shop Seeds', to: '/products?category=seeds' },
    badge: '40% More Yield',
    emoji: '🌾',
  },
  {
    bg: 'linear-gradient(120deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)',
    tag: '🔥 Limited Stock',
    title: 'Drip Irrigation Kits',
    subtitle: 'Save 60% water — complete 1 acre kit',
    cta: { label: 'Buy Now', to: '/products?category=irrigation' },
    badge: '60% Water Saved',
    emoji: '💧',
  },
];

const deals = [
  { emoji: '⚡', label: 'Flash Sale', color: '#ef4444', bg: '#fef2f2' },
  { emoji: '🌱', label: 'Fertilizers', color: '#16a34a', bg: '#f0fdf4' },
  { emoji: '🌾', label: 'Seeds', color: '#0891b2', bg: '#ecfeff' },
  { emoji: '🛡️', label: 'Pesticides', color: '#d97706', bg: '#fffbeb' },
  { emoji: '🔧', label: 'Tools', color: '#7c3aed', bg: '#f5f3ff' },
  { emoji: '💧', label: 'Irrigation', color: '#0284c7', bg: '#f0f9ff' },
  { emoji: '♻️', label: 'Organic', color: '#059669', bg: '#ecfdf5' },
  { emoji: '🔬', label: 'Detect', color: '#dc2626', bg: '#fef2f2' },
];

export default function Home() {
  const { products } = useApp();
  const [slide, setSlide] = useState(0);
  const timerRef = useRef();

  const featured = products.filter(p => p.featured).slice(0, 6);
  const newArrivals = products.filter(p => p.newArrival).slice(0, 6);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 15).slice(0, 6);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 6);

  const nextSlide = () => setSlide(s => (s + 1) % banners.length);
  const prevSlide = () => setSlide(s => (s - 1 + banners.length) % banners.length);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 4000);
  };

  return (
    <div style={{ background: 'var(--bg-secondary)', paddingBottom: '70px' }}>

      {/* ── Hero Banner Carousel ── */}
      <div style={{ position: 'relative', overflow: 'hidden', background: banners[slide].bg, transition: 'background 0.5s ease' }}>
        <div style={{ padding: '1.25rem 1rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block', background: 'rgba(255,255,255,0.2)',
                borderRadius: '999px', padding: '0.2rem 0.75rem',
                fontSize: '0.75rem', color: 'white', fontWeight: 600, marginBottom: '0.5rem',
              }}>
                {banners[slide].tag}
              </div>
              <h1 style={{
                fontFamily: 'Poppins', fontWeight: 800,
                fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                color: 'white', lineHeight: 1.2, marginBottom: '0.375rem',
              }}>
                {banners[slide].title}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {banners[slide].subtitle}
              </p>
              <Link to={banners[slide].cta.to} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                background: 'white', color: '#15803d',
                padding: '0.5rem 1.25rem', borderRadius: '4px',
                fontWeight: 700, fontSize: '0.875rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}>
                {banners[slide].cta.label} <ChevronRight size={14} />
              </Link>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 'clamp(3rem, 10vw, 5rem)' }}>{banners[slide].emoji}</div>
              <div style={{
                background: 'rgba(255,255,255,0.2)', borderRadius: '8px',
                padding: '0.25rem 0.625rem', marginTop: '0.5rem',
                fontSize: '0.7rem', color: 'white', fontWeight: 700,
              }}>
                {banners[slide].badge}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.375rem', paddingBottom: '0.75rem' }}>
          {banners.map((_, i) => (
            <button key={i} onClick={() => { setSlide(i); resetTimer(); }} style={{
              width: i === slide ? '20px' : '6px', height: '6px',
              borderRadius: '999px', border: 'none', cursor: 'pointer',
              background: i === slide ? 'white' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s', padding: 0,
            }} />
          ))}
        </div>

        {/* Arrows */}
        {[
          { fn: () => { prevSlide(); resetTimer(); }, side: 'left', Icon: ChevronLeft },
          { fn: () => { nextSlide(); resetTimer(); }, side: 'right', Icon: ChevronRight },
        ].map(({ fn, side, Icon }) => (
          <button key={side} onClick={fn} style={{
            position: 'absolute', top: '50%', [side]: '0.5rem',
            transform: 'translateY(-50%)',
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white',
          }}>
            <Icon size={16} />
          </button>
        ))}
      </div>

      {/* ── Quick Category Icons ── */}
      <div style={{ background: 'var(--bg-primary)', padding: '0.875rem 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ overflowX: 'auto', paddingBottom: '2px' }}>
          <div style={{ display: 'flex', gap: '0', minWidth: 'max-content', padding: '0 0.75rem' }}>
            {deals.map((d, i) => (
              <Link key={i}
                to={i === 0 ? '/products' : i === 7 ? '/disease-detection' : `/products?category=${categories.filter(c => c.id !== 'all')[i - 1]?.id || ''}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.875rem', textDecoration: 'none', flexShrink: 0 }}
              >
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.375rem', border: `2px solid ${d.color}20`,
                }}>
                  {d.emoji}
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{d.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Flash Deals Banner ── */}
      {lowStock.length > 0 && (
        <div style={{ margin: '0.75rem', background: 'var(--bg-primary)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <div style={{
            background: 'linear-gradient(90deg, #ef4444, #f97316)',
            padding: '0.625rem 1rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1rem' }}>⚡</span>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem' }}>Flash Deals</span>
              <span style={{ background: 'rgba(255,255,255,0.25)', color: 'white', borderRadius: '4px', padding: '0.1rem 0.5rem', fontSize: '0.7rem', fontWeight: 700 }}>
                🔥 Limited Stock
              </span>
            </div>
            <Link to="/products" style={{ color: 'white', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              View All <ChevronRight size={12} />
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: '0', minWidth: 'max-content' }}>
              {lowStock.map(p => (
                <div key={p.id} style={{ width: '140px', flexShrink: 0 }}>
                  <ProductCard product={p} view="compact" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Trust Badges ── */}
      <div style={{ margin: '0 0.75rem 0.75rem', background: 'var(--bg-primary)', borderRadius: '8px', padding: '0.75rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
          {[
            { icon: Truck, label: 'Free Delivery', sub: 'Above ₹999', color: '#3b82f6' },
            { icon: Shield, label: 'Certified', sub: 'Quality Assured', color: '#22c55e' },
            { icon: Zap, label: 'Same Day', sub: 'Dispatch', color: '#f59e0b' },
            { icon: Award, label: '12+ Years', sub: 'Trusted', color: '#8b5cf6' },
          ].map(({ icon: Icon, label, sub, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: `${color}15`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 0.375rem',
              }}>
                <Icon size={16} color={color} />
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{label}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured Products ── */}
      <ProductSection title="⭐ Featured Products" subtitle="Top Picks" products={featured} link="/products" />

      {/* ── Disease Detection CTA ── */}
      <div style={{ margin: '0 0.75rem 0.75rem' }}>
        <Link to="/disease-detection" style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          background: 'linear-gradient(120deg, #14532d, #166534)',
          borderRadius: '8px', padding: '1rem 1.25rem',
          textDecoration: 'none', overflow: 'hidden', position: 'relative',
        }}>
          <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>🔬</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#86efac', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.2rem' }}>AI-Powered · 96.9% Accuracy</div>
            <div style={{ color: 'white', fontWeight: 800, fontSize: '1rem', marginBottom: '0.25rem' }}>Detect Crop Diseases</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>Upload a leaf photo → instant diagnosis</div>
          </div>
          <div style={{
            background: '#22c55e', color: 'white',
            padding: '0.5rem 0.875rem', borderRadius: '4px',
            fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
          }}>
            Try Now
          </div>
        </Link>
      </div>

      {/* ── New Arrivals ── */}
      {newArrivals.length > 0 && (
        <ProductSection title="🆕 New Arrivals" subtitle="Just In" products={newArrivals} link="/products?filter=new" />
      )}

      {/* ── Top Rated ── */}
      <ProductSection title="🏆 Top Rated" subtitle="Best Reviews" products={topRated} link="/products" />

      {/* ── Shop by Category ── */}
      <div style={{ margin: '0 0.75rem 0.75rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>🌿 Shop by Category</span>
          <Link to="/products" style={{ fontSize: '0.75rem', color: 'var(--green-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            All <ChevronRight size={12} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)' }}>
          {categories.filter(c => c.id !== 'all').map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.id}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem',
              padding: '1rem 0.5rem', background: 'var(--bg-primary)',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--green-50)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-primary)'}
            >
              <span style={{ fontSize: '1.75rem' }}>{cat.icon}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 500+ Farmers Served ── */}
      <div style={{ margin: '0 0.75rem 0.75rem', background: 'linear-gradient(135deg, #0f2d1a, #166534)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
          <div style={{ color: '#86efac', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Our Impact
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {[
              { value: '500+', label: 'Farmers Served', icon: '👨‍🌾' },
              { value: '98%', label: 'Satisfaction', icon: '⭐' },
              { value: '12+', label: 'Years Trust', icon: '🏆' },
              { value: '96.9%', label: 'AI Accuracy', icon: '🔬' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#22c55e' }}>{s.value}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// Reusable horizontal product section
function ProductSection({ title, subtitle, products, link }) {
  return (
    <div style={{ margin: '0 0.75rem 0.75rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{
        padding: '0.875rem 1rem', borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{title}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{subtitle}</div>
        </div>
        <Link to={link} style={{ fontSize: '0.75rem', color: 'var(--green-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          View All <ChevronRight size={12} />
        </Link>
      </div>
      {/* Desktop: grid | Mobile: horizontal scroll */}
      <div className="product-section-desktop" style={{ padding: '0.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
      <div className="product-section-mobile" style={{ overflowX: 'auto', display: 'none' }}>
        <div style={{ display: 'flex', gap: '0', minWidth: 'max-content' }}>
          {products.map(p => (
            <div key={p.id} style={{ width: '150px', flexShrink: 0 }}>
              <ProductCard product={p} view="compact" />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .product-section-desktop { display: none !important; }
          .product-section-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
}
