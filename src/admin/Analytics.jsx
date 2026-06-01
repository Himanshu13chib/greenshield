import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { salesData, categoryRevenue } from '../data/orders';

const weeklyData = [
  { day: 'Mon', orders: 8, revenue: 12400 },
  { day: 'Tue', orders: 12, revenue: 18600 },
  { day: 'Wed', orders: 6, revenue: 9200 },
  { day: 'Thu', orders: 15, revenue: 23100 },
  { day: 'Fri', orders: 18, revenue: 27800 },
  { day: 'Sat', orders: 22, revenue: 34200 },
  { day: 'Sun', orders: 10, revenue: 15400 },
];

const COLORS = ['#22c55e', '#10b981', '#84cc16', '#f59e0b', '#3b82f6', '#8b5cf6'];

const tooltipStyle = { background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' };

export default function Analytics() {
  const { products, orders } = useApp();

  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const avgOrderValue = orders.length ? Math.round(totalRevenue / orders.length) : 0;
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 6);
  const lowPerformers = [...products].sort((a, b) => a.sold - b.sold).slice(0, 5);

  const kpiCards = [
    { label: 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(1)}K`, change: '+18.2%', up: true, icon: DollarSign, color: '#22c55e' },
    { label: 'Total Orders', value: orders.length, change: '+12.5%', up: true, icon: ShoppingBag, color: '#3b82f6' },
    { label: 'Avg Order Value', value: `₹${avgOrderValue.toLocaleString()}`, change: '+5.1%', up: true, icon: TrendingUp, color: '#8b5cf6' },
    { label: 'Delivered', value: deliveredOrders, change: `${Math.round((deliveredOrders / orders.length) * 100)}% rate`, up: true, icon: Package, color: '#10b981' },
  ];

  const Card = ({ children, style = {} }) => (
    <div style={{ background: '#1e293b', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem', ...style }}>
      {children}
    </div>
  );

  const ChartTitle = ({ children }) => (
    <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '1.25rem' }}>{children}</h3>
  );

  return (
    <div style={{ padding: '1.5rem', color: '#e2e8f0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: 'white' }}>Analytics</h1>
        <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Business performance insights</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {kpiCards.map(({ label, value, change, up, icon: Icon, color }) => (
          <Card key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: up ? '#22c55e' : '#ef4444' }}>
                {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {change}
              </div>
            </div>
            <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.5rem', color: 'white', marginBottom: '0.2rem' }}>{value}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{label}</div>
          </Card>
        ))}
      </div>

      {/* Revenue + Weekly */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <Card>
          <ChartTitle>Monthly Revenue & Profit</ChartTitle>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
              <Tooltip contentStyle={tooltipStyle} formatter={v => [`₹${v.toLocaleString()}`]} />
              <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#revG)" name="Revenue" />
              <Area type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} fill="url(#profG)" name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <ChartTitle>Weekly Orders</ChartTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="orders" fill="#22c55e" radius={[6, 6, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Category + Orders trend */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <Card>
          <ChartTitle>Revenue by Category</ChartTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryRevenue} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryRevenue.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={v => [`${v}%`, 'Share']} />
              <Legend formatter={v => <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <ChartTitle>Monthly Orders Trend</ChartTitle>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4 }} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top & Low performers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.25rem' }}>
        <Card>
          <ChartTitle>🏆 Top Selling Products</ChartTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {topProducts.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '22px', fontSize: '0.8rem', fontWeight: 800, color: i < 3 ? '#f59e0b' : '#64748b', textAlign: 'center', flexShrink: 0 }}>#{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '0.375rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: COLORS[i % COLORS.length], borderRadius: '2px', width: `${Math.min(100, (p.sold / topProducts[0].sold) * 100)}%` }} />
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#22c55e', whiteSpace: 'nowrap', flexShrink: 0 }}>{p.sold} sold</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <ChartTitle>📉 Low Performing Products</ChartTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lowPerformers.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem', background: 'rgba(239,68,68,0.05)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.1)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{p.category} · ₹{p.price.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f87171' }}>{p.sold} sold</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{p.stock} in stock</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(245,158,11,0.08)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.15)', fontSize: '0.8rem', color: '#fbbf24' }}>
            💡 Consider running promotions or discounts on these products to boost sales.
          </div>
        </Card>
      </div>
    </div>
  );
}
