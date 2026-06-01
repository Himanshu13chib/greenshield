import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'stock', label: 'Stock: High to Low' },
  { value: 'new', label: 'New Arrivals' },
];

export default function Products() {
  const { products } = useApp();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (inStockOnly) list = list.filter(p => p.stock > 0);
    if (featuredOnly) list = list.filter(p => p.featured);
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'stock': list.sort((a, b) => b.stock - a.stock); break;
      case 'new': list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)); break;
      default: list.sort((a, b) => b.sold - a.sold);
    }
    return list;
  }, [products, search, activeCategory, sort, priceRange, inStockOnly, featuredOnly]);

  return (
    <div style={{ paddingTop: '0', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f2d1a, #1a4a2e)', padding: '2.5rem 0 3rem' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'white', marginBottom: '0.5rem' }}>
            All Products
          </h1>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {filtered.length} products found
          </p>
          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: '560px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search fertilizers, seeds, pesticides..."
              style={{
                width: '100%', padding: '0.875rem 1rem 0.875rem 3rem',
                borderRadius: 'var(--radius)', border: 'none',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                color: 'white', fontSize: '0.95rem',
                outline: 'none',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '1.5rem' }}>
        {/* Category pills — horizontal scroll on mobile */}
        <div style={{ overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.625rem', minWidth: 'max-content' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem', borderRadius: '999px', border: '2px solid',
                borderColor: activeCategory === cat.id ? 'var(--green-500)' : 'var(--border)',
                background: activeCategory === cat.id ? 'var(--green-500)' : 'var(--bg-primary)',
                color: activeCategory === cat.id ? 'white' : 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setFilterOpen(!filterOpen)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <SlidersHorizontal size={15} /> Filters
              {(inStockOnly || featuredOnly) && <span style={{ background: 'var(--green-500)', color: 'white', borderRadius: '999px', padding: '0 0.4rem', fontSize: '0.7rem', fontWeight: 700 }}>!</span>}
            </button>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)', background: 'var(--bg-primary)',
              color: 'var(--text-primary)', fontSize: '0.85rem', cursor: 'pointer',
            }}>
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {[{ v: 'grid', icon: Grid }, { v: 'list', icon: List }].map(({ v, icon: Icon }) => (
              <button key={v} onClick={() => setView(v)} style={{
                width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: view === v ? 'var(--green-500)' : 'var(--bg-primary)',
                color: view === v ? 'white' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Filter panel */}
        {filterOpen && (
          <div style={{
            background: 'var(--bg-primary)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '1.25rem', marginBottom: '1.25rem',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem',
          }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.75rem' }}>Price Range</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                  style={{ width: '80px', padding: '0.4rem 0.6rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                <span style={{ color: 'var(--text-muted)' }}>–</span>
                <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                  style={{ width: '80px', padding: '0.4rem 0.6rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block' }}>Quick Filters</label>
              {[
                { label: 'In Stock Only', value: inStockOnly, set: setInStockOnly },
                { label: 'Featured Only', value: featuredOnly, set: setFeaturedOnly },
              ].map(({ label, value, set }) => (
                <label key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <input type="checkbox" checked={value} onChange={e => set(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--green-500)' }} />
                  {label}
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button onClick={() => { setInStockOnly(false); setFeaturedOnly(false); setPriceRange([0, 10000]); }} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No products found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="btn btn-primary">Clear Filters</button>
          </div>
        ) : (
          <div style={view === 'grid' ? {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: '1rem',
          } : { display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} view={view} />)}
          </div>
        )}
      </div>
    </div>
  );
}
