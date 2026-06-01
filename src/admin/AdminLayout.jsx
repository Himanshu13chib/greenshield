import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, BarChart3, Bell, LogOut,
  Menu, X, Leaf, ChevronRight, Settings, Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('gs-admin')) navigate('/admin');
  }, [navigate]);

  useEffect(() => { setSidebarOpen(false); }, [location]);

  const logout = () => {
    sessionStorage.removeItem('gs-admin');
    navigate('/admin');
  };

  const isActive = (path) => location.pathname === path;

  const Sidebar = () => (
    <div style={{
      width: '240px', background: '#0f172a',
      display: 'flex', flexDirection: 'column',
      height: '100%', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '1.25rem 1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #22c55e, #15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={18} color="white" />
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1rem', color: '#22c55e' }}>GreenShield</div>
            <div style={{ fontSize: '0.6rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem 1rem', borderRadius: '10px',
            background: isActive(to) ? 'rgba(34,197,94,0.15)' : 'transparent',
            color: isActive(to) ? '#22c55e' : '#64748b',
            fontWeight: isActive(to) ? 600 : 500, fontSize: '0.9rem',
            transition: 'all 0.2s', textDecoration: 'none',
            borderLeft: isActive(to) ? '3px solid #22c55e' : '3px solid transparent',
          }}>
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Low stock alert */}
      {notifications.length > 0 && (
        <div style={{ margin: '0 0.75rem 0.75rem', padding: '0.875rem', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
            <Bell size={14} color="#f59e0b" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b' }}>Low Stock Alert</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{notifications.length} products running low</div>
        </div>
      )}

      {/* Logout */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={logout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem 1rem', borderRadius: '10px',
          background: 'rgba(239,68,68,0.08)', border: 'none',
          color: '#f87171', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer',
          transition: 'all 0.2s',
        }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>
      {/* Desktop sidebar */}
      <div style={{ display: 'none' }} className="admin-sidebar-desktop">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={() => setSidebarOpen(false)} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '240px', zIndex: 201 }}>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0f172a' }}>
        {/* Top bar */}
        <div style={{
          height: '60px', background: '#1e293b',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.25rem', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <button onClick={() => setSidebarOpen(true)} className="admin-menu-btn" style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              display: 'none', alignItems: 'center', justifyContent: 'center',
              color: '#94a3b8', cursor: 'pointer',
            }}>
              <Menu size={18} />
            </button>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              {navItems.find(n => n.to === location.pathname)?.label || 'Admin'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {notifications.length > 0 && (
              <div style={{ position: 'relative' }}>
                <Bell size={18} color="#f59e0b" />
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '16px', height: '16px', borderRadius: '50%', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifications.length}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>A</div>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'none' }} className="admin-username">Admin</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#0f172a' }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar-desktop { display: flex !important; }
          .admin-menu-btn { display: none !important; }
          .admin-username { display: block !important; }
        }
        @media (max-width: 767px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
