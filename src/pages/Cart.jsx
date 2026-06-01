import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, cartTotal, clearCart, placeOrder } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState('cart'); // cart | checkout | success
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '', payment: 'COD', notes: '' });
  const [errors, setErrors] = useState({});

  const shipping = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + shipping;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter valid 10-digit mobile number';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = 'Enter valid 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = () => {
    if (!validate()) return;
    const id = placeOrder({
      customer: { name: form.name, phone: form.phone, address: `${form.address}, ${form.city} - ${form.pincode}`, email: '' },
      items: cart.map(i => ({ productId: i.id, name: i.name, qty: i.qty, price: i.price })),
      total,
      paymentMethod: form.payment,
      notes: form.notes,
    });
    setOrderId(id);
    setStep('success');
  };

  if (step === 'success') return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '480px', width: '100%' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.75rem', color: 'var(--green-600)', marginBottom: '0.75rem' }}>Order Placed!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your order <strong style={{ color: 'var(--text-primary)' }}>{orderId}</strong> has been placed successfully.</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>We'll contact you on your mobile number to confirm delivery details.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
          <Link to="/" className="btn btn-secondary">Go Home</Link>
        </div>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛒</div>
        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Add some products to get started</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    </div>
  );

  const inputStyle = (field) => ({
    width: '100%', padding: '0.75rem 1rem',
    border: `1.5px solid ${errors[field] ? 'var(--danger)' : 'var(--border)'}`,
    borderRadius: 'var(--radius-sm)', background: 'var(--bg-primary)',
    color: 'var(--text-primary)', fontSize: '0.95rem',
  });

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <div className="container" style={{ padding: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          {step === 'cart' ? '🛒 Your Cart' : '📦 Checkout'}
        </h1>

        {/* Steps indicator */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          {['cart', 'checkout'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: step === s || (s === 'cart' && step === 'checkout') ? 'var(--green-500)' : 'var(--bg-tertiary)',
                color: step === s || (s === 'cart' && step === 'checkout') ? 'white' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8rem',
              }}>{i + 1}</div>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: step === s ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {s === 'cart' ? 'Cart' : 'Delivery'}
              </span>
              {i < 1 && <div style={{ width: '40px', height: '2px', background: step === 'checkout' ? 'var(--green-500)' : 'var(--border)' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem', alignItems: 'start' }}>
          {/* Left: Cart items or Checkout form */}
          <div>
            {step === 'cart' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                      <div style={{ fontWeight: 800, color: 'var(--green-600)', fontSize: '1rem' }}>₹{item.price.toLocaleString()}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button onClick={() => updateCartQty(item.id, item.qty - 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center', fontSize: '0.9rem' }}>{item.qty}</span>
                        <button onClick={() => updateCartQty(item.id, item.qty + 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{(item.price * item.qty).toLocaleString()}</div>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: '0.25rem' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Delivery Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { key: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text' },
                    { key: 'phone', label: 'Mobile Number', placeholder: '10-digit mobile number', type: 'tel' },
                    { key: 'address', label: 'Full Address', placeholder: 'House/Village/Street', type: 'text' },
                    { key: 'city', label: 'City / District', placeholder: 'City or district name', type: 'text' },
                    { key: 'pincode', label: 'PIN Code', placeholder: '6-digit PIN code', type: 'text' },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.375rem', color: 'var(--text-primary)' }}>{label}</label>
                      <input type={type} placeholder={placeholder} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle(key)} />
                      {errors[key] && <div style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors[key]}</div>}
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.375rem', color: 'var(--text-primary)' }}>Payment Method</label>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {[{ v: 'COD', l: '💵 Cash on Delivery' }, { v: 'UPI', l: '📱 UPI' }, { v: 'Bank', l: '🏦 Bank Transfer' }].map(({ v, l }) => (
                        <label key={v} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.625rem 1rem', border: `2px solid ${form.payment === v ? 'var(--green-500)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', background: form.payment === v ? 'var(--green-50)' : 'var(--bg-primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                          <input type="radio" name="payment" value={v} checked={form.payment === v} onChange={() => setForm(f => ({ ...f, payment: v }))} style={{ accentColor: 'var(--green-500)' }} />
                          {l}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.375rem', color: 'var(--text-primary)' }}>Special Instructions (optional)</label>
                    <textarea placeholder="Any special delivery instructions..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      style={{ ...inputStyle('notes'), resize: 'vertical', minHeight: '80px' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order summary */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1.5rem' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-secondary)', flex: 1, marginRight: '0.5rem' }}>{item.name} × {item.qty}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: shipping === 0 ? 'var(--green-600)' : 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}><Truck size={14} /> Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                  Add ₹{(999 - cartTotal).toLocaleString()} more for free shipping
                </div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  <span>Total</span><span style={{ color: 'var(--green-600)' }}>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {step === 'cart' ? (
                  <button onClick={() => setStep('checkout')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }}>
                    Proceed to Checkout <ArrowRight size={18} />
                  </button>
                ) : (
                  <>
                    <button onClick={handleOrder} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem' }}>
                      Place Order <ArrowRight size={18} />
                    </button>
                    <button onClick={() => setStep('cart')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                      Back to Cart
                    </button>
                  </>
                )}
                <Link to="/products" style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--green-600)', fontWeight: 500 }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
