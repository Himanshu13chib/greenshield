import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon, Bell, Heart, Search, Leaf } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpg';

export default function Navbar() {
  const { theme, toggleTheme, cartCount, notifications } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/disease-detection', label: '🌿 Detect Disease' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: theme === 'dark' ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? 'var(--shadow-md)' : '0 1px 3px rgba(0,0,0,0.08)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px', overflow: 'hidden',
            background: 'linear-gradient(135deg, var(--green-500), var(--green-700))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src={logoImg} alt="GreenShield" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/><path d="M12 6v6l4 2"/></svg>'; }}
            />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'var(--green-600)', lineHeight: 1 }}>GreenShield</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Smart Agriculture</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 500,
              fontSize: '0.9rem',
              color: isActive(link.to) ? 'var(--green-600)' : 'var(--text-secondary)',
              background: isActive(link.to) ? 'var(--green-50)' : 'transparent',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { if (!isActive(link.to)) { e.target.style.color = 'var(--green-600)'; e.target.style.background = 'var(--green-50)'; } }}
              onMouseLeave={e => { if (!isActive(link.to)) { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent'; } }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={toggleTheme} style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)', transition: 'all 0.2s',
          }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', transition: 'all 0.2s', position: 'relative',
            }}>
              <Bell size={16} />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute', top: '-2px', right: '-2px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'var(--danger)', color: 'white',
                  fontSize: '0.6rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{notifications.length}</span>
              )}
            </button>
            {notifOpen && (
              <div style={{
                position: 'absolute', top: '48px', right: 0,
                width: '320px', background: 'var(--bg-primary)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow-xl)', zIndex: 100, overflow: 'hidden',
              }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.875rem' }}>
                  Low Stock Alerts ({notifications.length})
                </div>
                <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>All stock levels are healthy</div>
                  ) : notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '0.875rem 1rem', borderBottom: '1px solid var(--border)',
                      display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: '1rem' }}>⚠️</span>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>{n.message}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/wishlist" style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)', transition: 'all 0.2s',
          }}>
            <Heart size={16} />
          </Link>

          <Link to="/cart" style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, var(--green-500), var(--green-600))',
            color: 'white', fontWeight: 600, fontSize: '0.875rem',
            boxShadow: '0 4px 14px rgba(34,197,94,0.35)', transition: 'all 0.2s',
            position: 'relative',
          }}>
            <ShoppingCart size={16} />
            <span className="desktop-nav">Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: 'white', color: 'var(--green-600)',
                borderRadius: '999px', padding: '0 0.4rem',
                fontSize: '0.7rem', fontWeight: 800, minWidth: '18px', textAlign: 'center',
              }}>{cartCount}</span>
            )}
          </Link>

          <Link to="/admin" className="desktop-nav" style={{
            padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8rem',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.375rem',
          }}>
            Admin
          </Link>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            display: 'none', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-primary)',
          }}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-primary)', borderTop: '1px solid var(--border)',
          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem',
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
              fontWeight: 500, color: isActive(link.to) ? 'var(--green-600)' : 'var(--text-primary)',
              background: isActive(link.to) ? 'var(--green-50)' : 'transparent',
            }}>
              {link.label}
            </Link>
          ))}
          <Link to="/admin" style={{
            padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
            fontWeight: 600, color: 'var(--text-muted)',
            background: 'var(--bg-tertiary)', fontSize: '0.875rem',
          }}>
            Admin Portal
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
