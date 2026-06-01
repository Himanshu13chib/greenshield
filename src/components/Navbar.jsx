import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Bell, Heart, Search, X, Menu, Leaf, Sun, Moon, Mic } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/logo.jpg';

export default function Navbar() {
  const { theme, toggleTheme, cartCount, notifications } = useApp();
  const [search, setSearch] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => { setMenuOpen(false); setNotifOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <>
      {/* Top bar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'var(--green-700)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        {/* Main row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.625rem 1rem', maxWidth: '1280px', margin: '0 auto',
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={logoImg} alt="GS" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="nav-logo-text">
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.1rem', color: 'white', lineHeight: 1 }}>GreenShield</div>
              <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em' }}>Smart Agriculture</div>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ flex: 1, position: 'relative', maxWidth: '600px' }}>
            <div style={{ display: 'flex', background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search seeds, fertilizers, pesticides..."
                style={{
                  flex: 1, padding: '0.6rem 0.875rem',
                  border: 'none', outline: 'none',
                  fontSize: '0.875rem', color: '#111827',
                  background: 'transparent',
                }}
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} style={{ background: 'none', border: 'none', padding: '0 0.5rem', color: '#9ca3af', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              )}
              <button type="submit" style={{
                background: 'var(--green-500)', border: 'none',
                padding: '0 1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Search size={16} color="white" />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
            {/* Theme toggle - desktop only */}
            <button onClick={toggleTheme} className="nav-icon-btn nav-desktop" title="Toggle theme">
              {theme === 'dark' ? <Sun size={18} color="white" /> : <Moon size={18} color="white" />}
            </button>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setNotifOpen(!notifOpen)} className="nav-icon-btn" style={{ position: 'relative' }}>
                <Bell size={18} color="white" />
                {notifications.length > 0 && (
                  <span style={{
                    position: 'absolute', top: '2px', right: '2px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: '#ef4444', color: 'white',
                    fontSize: '0.55rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{notifications.length}</span>
                )}
              </button>
              {notifOpen && (
                <div style={{
                  position: 'absolute', top: '44px', right: 0,
                  width: '300px', background: 'var(--bg-primary)',
                  border: '1px solid var(--border)', borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, overflow: 'hidden',
                }}>
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                    🔔 Alerts ({notifications.length})
                  </div>
                  <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>All good!</div>
                    ) : notifications.map(n => (
                      <div key={n.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        ⚠️ {n.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist - desktop only */}
            <Link to="/wishlist" className="nav-icon-btn nav-desktop">
              <Heart size={18} color="white" />
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.5rem 0.875rem', borderRadius: '4px',
              background: 'rgba(255,255,255,0.15)',
              color: 'white', fontWeight: 700, fontSize: '0.875rem',
              position: 'relative', flexShrink: 0,
            }}>
              <ShoppingCart size={18} />
              <span className="nav-desktop">Cart</span>
              {cartCount > 0 && (
                <span style={{
                  background: '#f59e0b', color: 'white',
                  borderRadius: '999px', padding: '0 0.35rem',
                  fontSize: '0.65rem', fontWeight: 800, minWidth: '16px', textAlign: 'center',
                }}>{cartCount}</span>
              )}
            </Link>

            {/* Admin - visible on both mobile and desktop */}
            <Link to="/admin" style={{
              padding: '0.5rem 0.75rem', borderRadius: '4px',
              background: 'rgba(255,255,255,0.15)',
              color: 'white', fontWeight: 700, fontSize: '0.8rem',
              display: 'flex', alignItems: 'center', whiteSpace: 'nowrap',
              border: '1px solid rgba(255,255,255,0.25)',
            }}>
              Admin
            </Link>
          </div>
        </div>

        {/* Category nav bar - desktop */}
        <div className="nav-desktop" style={{
          background: 'var(--green-800)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{
            maxWidth: '1280px', margin: '0 auto',
            padding: '0 1rem',
            display: 'flex', gap: '0', overflowX: 'auto',
          }}>
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: '🌿 All Products' },
              { to: '/products?category=fertilizers', label: '🌱 Fertilizers' },
              { to: '/products?category=seeds', label: '🌾 Seeds' },
              { to: '/products?category=pesticides', label: '🛡️ Pesticides' },
              { to: '/products?category=tools', label: '🔧 Tools' },
              { to: '/products?category=irrigation', label: '💧 Irrigation' },
              { to: '/products?category=organic', label: '♻️ Organic' },
              { to: '/disease-detection', label: '🔬 Detect Disease' },
            ].map(link => (
              <Link key={link.to} to={link.to} style={{
                padding: '0.5rem 0.875rem',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.8rem', fontWeight: 500,
                whiteSpace: 'nowrap',
                borderBottom: location.pathname === link.to ? '2px solid #22c55e' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom nav - mobile only */}
      <div className="mobile-bottom-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border)',
        display: 'none',
        justifyContent: 'space-around', alignItems: 'center',
        padding: '0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom))',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
      }}>
        {[
          { to: '/', icon: '🏠', label: 'Home' },
          { to: '/products', icon: '🛒', label: 'Shop' },
          { to: '/disease-detection', icon: '🔬', label: 'Detect' },
          { to: '/wishlist', icon: '❤️', label: 'Wishlist' },
          { to: '/cart', icon: '🛍️', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
          { to: '/admin', icon: '⚙️', label: 'Admin' },
        ].map(item => (
          <Link key={item.to} to={item.to} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
            padding: '0.25rem 0.75rem',
            color: location.pathname === item.to ? 'var(--green-600)' : 'var(--text-muted)',
            fontSize: '0.65rem', fontWeight: 600,
            textDecoration: 'none',
          }}>
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      <style>{`
        .nav-icon-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s; text-decoration: none;
        }
        .nav-icon-btn:hover { background: rgba(255,255,255,0.2); }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-logo-text { display: none; }
          .mobile-bottom-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
