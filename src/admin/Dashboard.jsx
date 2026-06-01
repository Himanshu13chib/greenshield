import { Link } from 'react-router-dom';
import { TrendingUp, Package, ShoppingBag, DollarSign, AlertTriangle, ArrowUpRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useApp } from '../context/AppContext';
import { salesData, categoryRevenue, getStatusColor } from '../data/orders';

export default function Dashboard() {
  const { products, orders, notifications } = useApp();

  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 15).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);

  const statCards = [
    { label: 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(1)}K`, icon: DollarSign, color: '#22c55e', change: '+18%', bg: 'rgba(34,197,94,0.1)' },
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: '#3b82f6', change: '+12%', bg: 'rgba(59,130,246,0.1)' },
    { label: 'Products', value: products.length, icon: Package, color: '#8b5cf6', change: `${outOfStock} out`, bg: 'rgba(139,92,246,0.1)' },
    { label: 'Low Stock', value: lowStockCount, icon: AlertTriangle, color: '#f59e0b', change: 'Needs attention', bg: 'rgba(245,158,11,0.1)' },
  ];

  const statusIcon = { pending: Clock, processing: TrendingUp, shipped: Truck, delivered: CheckCircle, cancelled: XCircle };
  const statusColor = { pending: '#f59e0b', processing: '#3b82f6', shipped: '#8b5cf6', delivered: '#22c55e', cancelled: '#ef4444' };

  return (
    <div style={{ padding: '1.5rem', color: '#e2e8f0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'white', marginBottom: '0.25rem' }}>Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {statCards.map(({ label, value, icon: Icon, color, change, bg }) => (
          <div key={label} style={{ background: '#1e293b', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={color} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600, background: 'rgba(34,197,94,0.1)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>{change}</span>
            </div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.75rem', color: 'white', marginBottom: '0.25rem' }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Revenue chart */}
        <div style={{ background: '#1e293b', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '1.25rem' }}>Revenue Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div style={{ background: '#1e293b', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '1.25rem' }}>Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryRevenue} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} formatter={v => [`${v}%`, 'Share']} />
              <Legend formatter={v => <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>
        {/* Recent orders */}
        <div style={{ background: '#1e293b', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>Recent Orders</h3>
            <Link to="/admin/orders" style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentOrders.map(order => {
              const Icon = statusIcon[order.status] || Clock;
              return (
                <div key={order.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${statusColor[order.status]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={statusColor[order.status]} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.customer.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{order.id}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#22c55e' }}>₹{order.total.toLocaleString()}</div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: statusColor[order.status], background: `${statusColor[order.status]}15`, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{order.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top products + Low stock */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: '#1e293b', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>Top Selling</h3>
              <Link to="/admin/products" style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>Manage →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {topProducts.map((p, i) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ width: '20px', fontSize: '0.8rem', fontWeight: 700, color: i < 3 ? '#f59e0b' : '#64748b', textAlign: 'center' }}>#{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{p.sold} sold</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#22c55e', whiteSpace: 'nowrap' }}>₹{p.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {notifications.length > 0 && (
            <div style={{ background: 'rgba(245,158,11,0.08)', borderRadius: '14px', border: '1px solid rgba(245,158,11,0.2)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
                <AlertTriangle size={16} color="#f59e0b" />
                <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f59e0b' }}>Low Stock Alerts</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {notifications.slice(0, 4).map(n => (
                  <div key={n.id} style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#f59e0b' }}>⚠</span> {n.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
