import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { addToast } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '', type: 'general' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) { addToast('Please fill all required fields', 'error'); return; }
    setSent(true);
    addToast('Message sent! We will contact you within 24 hours.');
  };

  const contactInfo = [
    { icon: Phone, title: 'Call Us', lines: ['+91 98765 43210', '+91 87654 32109'], color: '#22c55e', action: 'tel:+919876543210' },
    { icon: MessageCircle, title: 'WhatsApp', lines: ['Chat with us instantly', 'Available 8AM – 8PM'], color: '#25d366', action: 'https://wa.me/919876543210' },
    { icon: Mail, title: 'Email Us', lines: ['info@greenshield.in', 'support@greenshield.in'], color: '#3b82f6', action: 'mailto:info@greenshield.in' },
    { icon: MapPin, title: 'Visit Us', lines: ['123 Kisan Marg, Agriculture Zone', 'New Delhi - 110001'], color: '#f59e0b', action: '#' },
  ];

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f2d1a, #1a4a2e)', padding: '3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'white', marginBottom: '0.75rem' }}>
            Get in Touch
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            Have questions about products, bulk orders, or need farming advice? We're here to help.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {contactInfo.map(({ icon: Icon, title, lines, color, action }) => (
            <a key={title} href={action} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              padding: '1.5rem 1rem', background: 'var(--bg-primary)',
              borderRadius: 'var(--radius)', border: '1px solid var(--border)',
              transition: 'all 0.3s', textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem' }}>
                <Icon size={22} color={color} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.375rem' }}>{title}</div>
              {lines.map(l => <div key={l} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l}</div>)}
            </a>
          ))}
        </div>

        {/* Form + Hours */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem' }}>
          {/* Form */}
          <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1.75rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <CheckCircle size={56} color="var(--green-500)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>We'll get back to you within 24 hours on your mobile number.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', phone: '', subject: '', message: '', type: 'general' }); }} className="btn btn-primary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Send us a Message</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.375rem', color: 'var(--text-primary)' }}>Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name"
                        style={{ width: '100%', padding: '0.7rem 0.875rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.375rem', color: 'var(--text-primary)' }}>Mobile *</label>
                      <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="10-digit number" type="tel"
                        style={{ width: '100%', padding: '0.7rem 0.875rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.9rem' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.375rem', color: 'var(--text-primary)' }}>Enquiry Type</label>
                    <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      style={{ width: '100%', padding: '0.7rem 0.875rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                      <option value="general">General Enquiry</option>
                      <option value="bulk">Bulk Order</option>
                      <option value="support">Product Support</option>
                      <option value="complaint">Complaint</option>
                      <option value="farming">Farming Advice</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.375rem', color: 'var(--text-primary)' }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Describe your query or requirement..."
                      style={{ width: '100%', padding: '0.7rem 0.875rem', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.9rem', resize: 'vertical', minHeight: '100px' }} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '0.95rem' }}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Hours + Map placeholder */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <Clock size={20} color="var(--green-600)" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Business Hours</h3>
              </div>
              {[
                { day: 'Monday – Friday', time: '8:00 AM – 7:00 PM', open: true },
                { day: 'Saturday', time: '8:00 AM – 6:00 PM', open: true },
                { day: 'Sunday', time: '9:00 AM – 2:00 PM', open: true },
                { day: 'Public Holidays', time: 'Closed', open: false },
              ].map(({ day, time, open }) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{day}</span>
                  <span style={{ fontWeight: 600, color: open ? 'var(--green-600)' : 'var(--danger)' }}>{time}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #0f2d1a, #1a4a2e)', borderRadius: 'var(--radius)', padding: '1.5rem', color: 'white' }}>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1rem' }}>🌾 Need Bulk Orders?</h3>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.6 }}>
                We offer special pricing for bulk purchases above ₹25,000. Contact our sales team for custom quotes and delivery arrangements.
              </p>
              <a href="tel:+919876543210" className="btn" style={{ background: 'var(--green-500)', color: 'white', width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                <Phone size={16} /> Call for Bulk Orders
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
