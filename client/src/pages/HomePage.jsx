import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const CATEGORIES = [
  { label: 'All', slug: 'all', icon: '🏪' },
  { label: 'Electronics', slug: 'electronics', icon: '📱' },
  { label: 'Fashion', slug: 'fashion', icon: '👗' },
  { label: 'Home & Kitchen', slug: 'home-kitchen', icon: '🏠' },
  { label: 'Books', slug: 'books', icon: '📚' },
  { label: 'Sports', slug: 'sports', icon: '⚽' },
  { label: 'Toys', slug: 'toys', icon: '🧸' },
  { label: 'Beauty & Grooming', slug: 'beauty', icon: '💄' },
  { label: 'Automotive', slug: 'automotive', icon: '🚗' },
];

const SORT_OPTIONS = [
  { label: 'Relevance', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating' },
];

const HERO_BANNERS = [
  {
    id: 1,
    title: 'Big Billion Days',
    subtitle: 'Deals so big, they boom!',
    bg: 'linear-gradient(135deg, #2874f0 0%, #1a5cbf 50%, #0f3d8a 100%)',
    accent: '#ffe500',
    emoji: '🎉',
    badge: 'UP TO 80% OFF',
  },
  {
    id: 2,
    title: 'Electronics Sale',
    subtitle: 'Top brands. Unbeatable prices.',
    bg: 'linear-gradient(135deg, #1b2838 0%, #2a475e 50%, #1b2838 100%)',
    accent: '#66c0f4',
    emoji: '📱',
    badge: 'STARTS ₹499',
  },
  {
    id: 3,
    title: 'Fashion Fiesta',
    subtitle: 'Wear the new you!',
    bg: 'linear-gradient(135deg, #6c3483 0%, #9b59b6 50%, #6c3483 100%)',
    accent: '#ffe500',
    emoji: '👗',
    badge: 'MIN 50% OFF',
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % HERO_BANNERS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const banner = HERO_BANNERS[current];

  return (
    <div className="hero-banner" style={{ background: banner.bg }}>
      <div className="hero-content">
        <div className="hero-badge" style={{ background: banner.accent, color: '#212121' }}>
          {banner.badge}
        </div>
        <h1 className="hero-title">{banner.emoji} {banner.title}</h1>
        <p className="hero-subtitle">{banner.subtitle}</p>
        <button className="hero-cta">Shop Now →</button>
      </div>
      <div className="hero-indicators">
        {HERO_BANNERS.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    if (urlSearch) setSearchQuery(urlSearch);
  }, [urlSearch]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (activeCategory !== 'all') params.set('category', activeCategory);
      if (sort) params.set('sort', sort);
      params.set('limit', '40');

      const { data } = await api.get(`/products?${params}`);
      setProducts(data.products);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeCategory, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Hero */}
        <HeroBanner />

        {/* Category Filter */}
        <div className="category-strip">
          <div className="category-strip-inner">
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                className={`cat-chip ${activeCategory === cat.slug ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter / Sort Bar */}
        <div className="filter-bar">
          <div className="filter-bar-left">
            <span className="result-count">
              {loading ? 'Loading...' : `Showing ${products.length} results`}
              {(searchQuery || activeCategory !== 'all') && (
                <button className="clear-filter" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                  ✕ Clear filters
                </button>
              )}
            </span>
          </div>
          <div className="filter-bar-right">
            <label className="sort-label">Sort by:</label>
            <select
              className="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="page-loader">
            <div className="spinner" />
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try a different search or category</p>
            <button className="btn btn-primary btn-sm" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
