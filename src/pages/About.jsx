import { Link } from 'react-router-dom';
import { Leaf, Shield, TrendingUp, Users, Award, Target, Heart, ArrowRight } from 'lucide-react';

const team = [
  { name: 'Arjun Sharma', role: 'Founder & CEO', emoji: '👨‍🌾', bio: '20+ years in agriculture. Former ICAR scientist.' },
  { name: 'Priya Patel', role: 'Head of Agronomy', emoji: '👩‍🔬', bio: 'PhD in Soil Science. Expert in crop nutrition.' },
  { name: 'Ravi Kumar', role: 'Operations Head', emoji: '👨‍💼', bio: 'Supply chain expert with 15 years experience.' },
  { name: 'Sunita Devi', role: 'Customer Relations', emoji: '👩‍💻', bio: 'Dedicated to farmer support and satisfaction.' },
];

const milestones = [
  { year: '2012', event: 'GreenShield founded in New Delhi' },
  { year: '2015', event: 'Expanded to 5 states across India' },
  { year: '2018', event: 'Launched online platform for farmers' },
  { year: '2020', event: 'Crossed 10,000 farmer milestone' },
  { year: '2022', event: 'Introduced smart inventory system' },
  { year: '2024', event: '15,000+ farmers, 500+ products' },
];

export default function About() {
  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f2d1a, #1a4a2e)', padding: '4rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(34,197,94,0.1) 0%, transparent 50%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
            <Leaf size={14} color="#22c55e" />
            <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>Our Story</span>
          </div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'white', marginBottom: '1rem' }}>
            Empowering Indian Farmers<br />Since 2012
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            GreenShield was born from a simple belief — every farmer deserves access to quality agricultural inputs, expert guidance, and technology that makes farming smarter and more profitable.
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" style={{ display: 'block' }}>
            <path d="M0 60L1440 60L1440 20C1200 50 960 10 720 30C480 50 240 10 0 20Z" fill="var(--bg-primary)" />
          </svg>
        </div>
      </div>

      {/* Mission */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
            {[
              { icon: Target, title: 'Our Mission', desc: 'To make premium agricultural inputs accessible to every farmer in India, backed by expert knowledge and reliable supply chains.', color: '#22c55e' },
              { icon: Heart, title: 'Our Values', desc: 'Farmer-first approach, transparency in pricing, quality assurance, and sustainable farming practices guide everything we do.', color: '#ef4444' },
              { icon: TrendingUp, title: 'Our Vision', desc: 'To become India\'s most trusted agriculture platform, enabling data-driven farming decisions for 1 million farmers by 2030.', color: '#3b82f6' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} style={{ padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">12 years of growing with Indian farmers</p>
          </div>
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--border)', transform: 'translateX(-50%)' }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.1rem', color: 'var(--green-600)' }}>{m.year}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{m.event}</div>
                </div>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--green-500)', border: '3px solid var(--bg-secondary)', flexShrink: 0, zIndex: 1 }} />
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">Experts dedicated to your farming success</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
            {team.map(member => (
              <div key={member.name} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1.75rem', textAlign: 'center', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green-500)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{member.emoji}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{member.name}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--green-600)', fontWeight: 600, marginBottom: '0.625rem' }}>{member.role}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Ready to Grow with Us?</h2>
          <p className="section-subtitle">Join thousands of farmers who trust GreenShield</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
