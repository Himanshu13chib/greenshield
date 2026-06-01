import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Package, AlertTriangle, X, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories, getStockStatus } from '../data/products';

const emptyForm = { name: '', category: 'fertilizers', price: '', originalPrice: '', stock: '', unit: 'per unit', daysLeft: '', description: '', image: '', featured: false, newArrival: false };

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModalOpen(true); };
  const openEdit = (p) => { setForm({ ...p, price: String(p.price), originalPrice: String(p.originalPrice || ''), stock: String(p.stock), daysLeft: String(p.daysLeft) }); setEditId(p.id); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.price || !form.stock) return;
    const data = { ...form, price: Number(form.price), originalPrice: Number(form.originalPrice) || 0, stock: Number(form.stock), daysLeft: Number(form.daysLeft) || 30 };
    if (editId) updateProduct(editId, data);
    else addProduct(data);
    setModalOpen(false);
  };

  const inputStyle = { width: '100%', padding: '0.625rem 0.875rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '0.875rem' };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.375rem' };

  return (
    <div style={{ padding: '1.5rem', color: '#e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: 'white' }}>Products</h1>
          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            style={{ ...inputStyle, paddingLeft: '2.25rem', width: '100%' }} />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: '140px' }}>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table / Cards */}
      <div style={{ background: '#1e293b', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        {/* Desktop table header */}
        <div className="admin-table-header" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 100px', gap: '1rem', padding: '0.875rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Status</span><span>Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
            <Package size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
            <div>No products found</div>
          </div>
        ) : filtered.map(p => {
          const ss = getStockStatus(p.stock, p.daysLeft);
          return (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.25rem' }}>
                  {p.category === 'fertilizers' ? '🌱' : p.category === 'seeds' ? '🌾' : p.category === 'pesticides' ? '🛡️' : p.category === 'tools' ? '🔧' : p.category === 'irrigation' ? '💧' : '♻️'}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{p.featured ? '⭐ Featured' : ''} {p.newArrival ? '🆕 New' : ''}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.8rem' }}><span style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem' }}>{p.category}</span></div>
              <div style={{ fontWeight: 700, color: '#22c55e', fontSize: '0.9rem' }}>₹{p.price.toLocaleString()}</div>
              <div style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>{p.stock} units</div>
              <div>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '6px',
                  background: ss.color === 'red' ? 'rgba(239,68,68,0.15)' : ss.color === 'yellow' ? 'rgba(245,158,11,0.15)' : 'rgba(34,197,94,0.15)',
                  color: ss.color === 'red' ? '#f87171' : ss.color === 'yellow' ? '#fbbf24' : '#4ade80',
                }}>{ss.label}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openEdit(p)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', border: 'none', color: '#60a5fa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Edit2 size={14} />
                </button>
                <button onClick={() => setDeleteConfirm(p.id)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1rem', overflowY: 'auto' }}>
          <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '560px', padding: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>{editId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Product Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Product name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
                  {categories.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Unit</label>
                <input value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="e.g. per 50kg bag" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Price (₹) *</label>
                <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Original Price (₹)</label>
                <input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Stock Quantity *</label>
                <input type="number" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Days Left in Stock</label>
                <input type="number" value={form.daysLeft} onChange={e => setForm(f => ({ ...f, daysLeft: e.target.value }))} placeholder="30" style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Image URL</label>
                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Product description..." style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} />
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {[{ key: 'featured', label: 'Featured' }, { key: 'newArrival', label: 'New Arrival' }].map(({ key, label }) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: '#94a3b8' }}>
                    <input type="checkbox" checked={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))} style={{ accentColor: '#22c55e', width: '16px', height: '16px' }} />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={handleSave} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.75rem' }}>
                <Save size={16} /> {editId ? 'Save Changes' : 'Add Product'}
              </button>
              <button onClick={() => setModalOpen(false)} className="btn btn-secondary" style={{ padding: '0.75rem 1.25rem' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', maxWidth: '360px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🗑️</div>
            <h3 style={{ fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Delete Product?</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => { deleteProduct(deleteConfirm); setDeleteConfirm(null); }} className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }}>Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
