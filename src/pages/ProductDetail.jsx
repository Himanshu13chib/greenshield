import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Package, Clock, TrendingUp, ArrowLeft, Plus, Minus, CheckCircle, Truck, Shield, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getStockStatus, getDiscountPercent } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isWishlisted } = useApp();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);

  const product = products.find(p => p.id === Number(id));
  if (!product) return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '4rem' }}>🌿</div>
      <h2 style={{ color: 'var(--text-primary)' }}>Product not found</h2>
      <Link to="/products" className="btn btn-primary">Back to Products</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const stockStatus = getStockStatus(product.stock, product.daysLeft);
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const wishlisted = isWishlisted(product.id);

  const categoryEmoji = { fertilizers: '🌱', pesticides: '🛡️', seeds: '🌾', tools: '🔧', irrigation: '💧', organic: '♻️' };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <div className="container" style={{ padding: '1.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'var(--green-600)' }}>Home</Link>
          <span>/</span>
          <Link to="/products" style={{ color: 'var(--green-600)' }}>Products</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{product.name}</span>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Image */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              background: 'var(--bg-primary)', border: '1px solid var(--border)',
              aspectRatio: '4/3', position: 'relative',
            }}>
              {!imgError ? (
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgError(true)} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', background: 'var(--bg-secondary)' }}>
                  {categoryEmoji[product.category] || '🌿'}
                </div>
              )}
              {discount > 0 && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--danger)', color: 'white', padding: '0.3rem 0.75rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
                  -{discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge badge-green">{product.category}</span>
              {product.newArrival && <span className="badge badge-blue">New Arrival</span>}
              {product.featured && <span className="badge badge-yellow">⭐ Featured</span>}
              <span className={`badge badge-${stockStatus.color}`}>{stockStatus.label}</span>
            </div>

            <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'var(--text-primary)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
                ))}
              </div>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>({product.reviews} reviews)</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>· {product.sold} sold</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '2rem', color: 'var(--green-600)' }}>
                ₹{product.price.toLocaleString()}
              </span>
              {discount > 0 && (
                <>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
                  <span style={{ background: '#dcfce7', color: 'var(--green-700)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
                </>
              )}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{product.unit}</div>

            {/* Stock info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { icon: Package, label: 'Stock', value: `${product.stock} units`, color: '#22c55e' },
                { icon: Clock, label: 'Days Left', value: `${product.daysLeft} days`, color: '#f59e0b' },
                { icon: TrendingUp, label: 'Sold', value: product.sold, color: '#3b82f6' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', textAlign: 'center', border: '1px solid var(--border)' }}>
                  <Icon size={18} color={color} style={{ margin: '0 auto 0.375rem' }} />
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{value}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Qty + CTA */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: '44px', height: '44px', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                  <Minus size={16} />
                </button>
                <span style={{ width: '48px', textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ width: '44px', height: '44px', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={() => { addToCart(product, qty); }} className="btn btn-primary" style={{ flex: 1, minWidth: '140px', padding: '0.75rem', fontSize: '0.95rem', justifyContent: 'center' }} disabled={product.stock === 0}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)} style={{
                width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--border)', background: 'var(--bg-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <Heart size={18} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : 'var(--text-muted)'} />
              </button>
            </div>

            <Link to="/cart" onClick={() => addToCart(product, qty)} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Buy Now
            </Link>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
              {[
                { icon: Truck, label: 'Free Delivery', sub: 'Above ₹999' },
                { icon: Shield, label: 'Quality Assured', sub: 'Certified Products' },
                { icon: Award, label: 'Genuine', sub: '100% Authentic' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} style={{ textAlign: 'center', padding: '0.75rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <Icon size={18} color="var(--green-600)" style={{ margin: '0 auto 0.375rem' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description & Benefits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Product Description</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem' }}>{product.description}</p>
          </div>
          <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Key Benefits</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {product.benefits.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={16} color="var(--green-500)" style={{ flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Related Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
