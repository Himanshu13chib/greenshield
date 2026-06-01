import { useState } from 'react';
import { Search, Eye, ChevronDown, X, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { orderStatuses, getStatusColor } from '../data/orders';

const statusColor = { pending: '#f59e0b', processing: '#3b82f6', shipped: '#8b5cf6', delivered: '#22c55e', cancelled: '#ef4444' };

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const inputStyle = { padding: '0.625rem 0.875rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '0.875rem' };

  return (
    <div style={{ padding: '1.5rem', color: '#e2e8f0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: 'white' }}>Orders</h1>
        <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{orders.length} total orders</p>
      </div>

      {/* Status summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {['all', ...orderStatuses].map(s => {
          const count = s === 'all' ? orders.length : orders.filter(o => o.status === s).length;
          return (
            <button key={s} onClick={() => setFilterStatus(s)} style={{
              padding: '0.75rem', borderRadius: '10px', border: '1px solid',
              borderColor: filterStatus === s ? (statusColor[s] || '#22c55e') : 'rgba(255,255,255,0.08)',
              background: filterStatus === s ? `${statusColor[s] || '#22c55e'}15` : 'rgba(255,255,255,0.03)',
              color: filterStatus === s ? (statusColor[s] || '#22c55e') : '#64748b',
              cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
            }}>
              <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>{count}</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'capitalize', fontWeight: 500 }}>{s}</div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or customer name..."
          style={{ ...inputStyle, paddingLeft: '2.25rem', width: '100%' }} />
      </div>

      {/* Orders list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.length === 0 ? (
          <div style={{ background: '#1e293b', borderRadius: '14px', padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            <Package size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
            <div>No orders found</div>
          </div>
        ) : filtered.map(order => (
          <div key={order.id} style={{ background: '#1e293b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>{order.id}</span>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '6px', textTransform: 'capitalize',
                    background: `${statusColor[order.status]}15`, color: statusColor[order.status],
                  }}>{order.status}</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                  <strong style={{ color: '#e2e8f0' }}>{order.customer.name}</strong> · {order.customer.phone}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{order.date} · {order.paymentMethod}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}: {order.items.map(i => i.name).join(', ').substring(0, 60)}{order.items.map(i => i.name).join(', ').length > 60 ? '...' : ''}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.625rem', flexShrink: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#22c55e' }}>₹{order.total.toLocaleString()}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setSelectedOrder(order)} style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Eye size={13} /> View
                  </button>
                  <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)}
                    style={{ padding: '0.4rem 0.625rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: '0.8rem', cursor: 'pointer' }}>
                    {orderStatuses.map(s => <option key={s} value={s} style={{ background: '#1e293b' }}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}>
          <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '520px', padding: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>{selectedOrder.id}</h2>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '6px', background: `${statusColor[selectedOrder.status]}15`, color: statusColor[selectedOrder.status], textTransform: 'capitalize' }}>{selectedOrder.status}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase' }}>Customer</div>
                <div style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem' }}>{selectedOrder.customer.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{selectedOrder.customer.phone}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>{selectedOrder.customer.address}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase' }}>Order Info</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Date: {selectedOrder.date}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Payment: {selectedOrder.paymentMethod}</div>
                {selectedOrder.notes && <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>Note: {selectedOrder.notes}</div>}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Items Ordered</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0.875rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.875rem' }}>
                    <span style={{ color: '#e2e8f0', flex: 1, marginRight: '0.5rem' }}>{item.name} × {item.qty}</span>
                    <span style={{ fontWeight: 700, color: '#22c55e', whiteSpace: 'nowrap' }}>₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: 'white' }}>Total Amount</span>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#22c55e' }}>₹{selectedOrder.total.toLocaleString()}</span>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem' }}>Update Status</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {orderStatuses.map(s => (
                  <button key={s} onClick={() => { updateOrderStatus(selectedOrder.id, s); setSelectedOrder({ ...selectedOrder, status: s }); }}
                    style={{
                      padding: '0.4rem 0.875rem', borderRadius: '8px', border: '1px solid',
                      borderColor: selectedOrder.status === s ? statusColor[s] : 'rgba(255,255,255,0.1)',
                      background: selectedOrder.status === s ? `${statusColor[s]}20` : 'transparent',
                      color: selectedOrder.status === s ? statusColor[s] : '#64748b',
                      cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, textTransform: 'capitalize',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
