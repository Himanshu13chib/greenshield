import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Clock, Package, TrendingUp, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getStockStatus, getDiscountPercent } from '../data/products';

export default function ProductCard({ product, view = 'grid' }) {
  const { addToCart, toggleWishlist, isWishlisted } = useApp();
  const [imgError, setImgError] = useState(false);
  const stockStatus = getStockStatus(product.stock, product.daysLeft);
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const wishlisted = isWishlisted(product.id);

  const categoryColors = {
    fertilizers: '#22c55e', pesticides: '#f59e0b', seeds: '#10b981',
    tools: '#3b82f6', irrigation: '#06b6d4', organic: '#8b5cf6',
  };
  const catColor = categoryColors[product.category] || '#22c55e';

  // ── Compact view (mobile horizontal scroll) ──
  if (view === 'compact') {
    return (
      <Link to={`/products/${product.id}`} style={{ display: 'block', padding: '0.75rem', textDecoration: 'none', borderRight: '1px solid var(--border)' }}>
        <div style={{ position: 'relative', height: '110px', background: 'var(--bg-secondary)', borderRadius: '6px', overflow: 'hidden', marginBottom: '0.5rem' }}>
          {!imgError ? (
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgError(true)} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              {product.category === 'fertilizers' ? '🌱' : product.category === 'seeds' ? '🌾' : product.category === 'pesticides' ? '🛡️' : product.category === 'tools' ? '🔧' : product.category === 'irrigation' ? '💧' : '♻️'}
            </div>
          )}
          {discount > 0 && (
            <span style={{ position: 'absolute', top: '4px', left: '4px', background: '#ef4444', color: 'white', padding: '0.1rem 0.35rem', borderRadius: '3px', fontSize: '0.6rem', fontWeight: 700 }}>
              -{discount}%
            </span>
          )}
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.25rem',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.name}
        </div>
        <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--green-600)' }}>₹{product.price.toLocaleString()}</div>
        {discount > 0 && <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</div>}
      </Link>
    );
  }

  if (view === 'list') {
    return (
      <div className="card" style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-secondary)' }}>
          {!imgError ? (
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgError(true)} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🌿</div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: `${catColor}15`, color: catColor, fontSize: '0.7rem' }}>{product.category}</span>
            {stockStatus.urgent && <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>{stockStatus.label}</span>}
          </div>
          <Link to={`/products/${product.id}`}>
            <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{product.rating}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({product.reviews})</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem', flexShrink: 0 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--green-600)' }}>₹{product.price.toLocaleString()}</div>
            {discount > 0 && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</div>}
          </div>
          <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            <ShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        {!imgError ? (
          <img src={product.image} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onError={() => setImgError(true)}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', background: `${catColor}10` }}>
            {product.category === 'fertilizers' ? '🌱' : product.category === 'seeds' ? '🌾' : product.category === 'pesticides' ? '🛡️' : product.category === 'tools' ? '🔧' : product.category === 'irrigation' ? '💧' : '♻️'}
          </div>
        )}

        {/* Badges overlay */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {discount > 0 && (
            <span style={{ background: 'var(--danger)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>
              -{discount}%
            </span>
          )}
          {product.newArrival && (
            <span style={{ background: 'var(--info)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>
              NEW
            </span>
          )}
          {product.featured && (
            <span style={{ background: 'var(--warning)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button onClick={() => toggleWishlist(product)} style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          <Heart size={15} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#6b7280'} />
        </button>

        {/* Stock urgency overlay */}
        {stockStatus.urgent && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent, rgba(239,68,68,0.85))',
            padding: '1.5rem 0.75rem 0.5rem',
            color: 'white', fontSize: '0.75rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: '0.375rem',
          }}>
            🔥 {stockStatus.label}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span className="badge" style={{ background: `${catColor}15`, color: catColor, fontSize: '0.7rem' }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{product.rating}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({product.reviews})</span>
          </div>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 style={{
            fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)',
            marginBottom: '0.5rem', lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{product.name}</h3>
        </Link>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{product.description}</p>

        {/* Stock info */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Package size={12} />
            <span>{product.stock} units</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <Clock size={12} />
            <span>{product.daysLeft}d left</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <TrendingUp size={12} />
            <span>{product.sold} sold</span>
          </div>
        </div>

        {/* Stock bar */}
        <div style={{ marginBottom: '0.875rem' }}>
          <div style={{ height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '2px',
              width: `${Math.min(100, (product.stock / 300) * 100)}%`,
              background: stockStatus.color === 'red' ? 'var(--danger)' : stockStatus.color === 'yellow' ? 'var(--warning)' : 'var(--green-500)',
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>

        {/* Price & CTA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--green-600)' }}>
              ₹{product.price.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.unit}</div>
            {discount > 0 && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/products/${product.id}`} style={{
              width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', transition: 'all 0.2s',
            }}>
              <Eye size={15} />
            </Link>
            <button onClick={() => addToCart(product)} className="btn btn-primary" style={{ padding: '0.5rem 0.875rem', fontSize: '0.8rem' }}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={14} />
              {product.stock === 0 ? 'Out of Stock' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
