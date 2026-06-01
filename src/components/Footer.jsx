import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, Camera, MessageSquare, Play, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--gray-900)',
      color: '#94a3b8',
      paddingTop: '4rem',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', paddingBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #22c55e, #15803d)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Leaf size={20} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#22c55e' }}>GreenShield</div>
                <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Smart Agriculture</div>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Empowering farmers with premium quality agricultural inputs, smart inventory management, and technology-driven farming solutions.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Share2, Camera, MessageSquare, Play].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#94a3b8', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#22c55e'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.25rem', fontSize: '0.95rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/products?category=fertilizers', label: 'Fertilizers' },
                { to: '/products?category=seeds', label: 'Seeds' },
                { to: '/products?category=pesticides', label: 'Pesticides' },
                { to: '/about', label: 'About Us' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} style={{ fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#22c55e'}
                    onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.25rem', fontSize: '0.95rem' }}>Our Products</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {['NPK Fertilizers', 'Organic Pesticides', 'Hybrid Seeds', 'Farming Tools', 'Drip Irrigation', 'Vermicompost', 'Soil Testing Kits'].map(item => (
                <li key={item}>
                  <Link to="/products" style={{ fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#22c55e'}
                    onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >
                    → {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '1.25rem', fontSize: '0.95rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { Icon: MapPin, text: 'DR. BR Ambedkar Chowk, Dabbar, Nowshera, Jammu' },
                { Icon: Phone, text: '+91 94195 39723' },
                { Icon: Mail, text: 'info@greenshield.in' },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={14} color="#22c55e" />
                  </div>
                  <span style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(34,197,94,0.08)', borderRadius: '10px', border: '1px solid rgba(34,197,94,0.15)' }}>
              <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600, marginBottom: '0.25rem' }}>Business Hours</div>
              <div style={{ fontSize: '0.8rem' }}>Mon–Sat: 8:00 AM – 7:00 PM</div>
              <div style={{ fontSize: '0.8rem' }}>Sunday: 9:00 AM – 2:00 PM</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '1.5rem 0',
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontSize: '0.8rem' }}>© 2026 GreenShield. All rights reserved. Empowering Indian Farmers.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(item => (
              <a key={item} href="#" style={{ fontSize: '0.8rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#22c55e'}
                onMouseLeave={e => e.target.style.color = '#94a3b8'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
