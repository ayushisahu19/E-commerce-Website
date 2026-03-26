import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('shop');
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addItem = async (e) => {
    e.preventDefault();
    setAddingItem(true);
    try {
      await axios.post('/api/items', newItem);
      setNewItem({ name: '', description: '' });
      fetchItems();
      showToast('Product added to catalogue!');
    } catch (error) {
      console.error('Error adding item:', error);
      showToast('Failed to add product', 'error');
    } finally {
      setAddingItem(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
      showToast('Product removed');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const addToCart = () => {
    setCartCount(c => c + 1);
    showToast('Added to cart 🛒');
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty'];

  return (
    <div className="app">
      {/* Toast */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>{toast.msg}</div>
      )}

      {/* Top Bar */}
      <div className="topbar">
        <span>Free delivery on orders above ₹499 &nbsp;·&nbsp; Use code <strong>FIRST10</strong> for 10% off</span>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header__inner">
          <div className="header__logo" onClick={() => setActiveTab('shop')}>
            <span className="logo-icon">◈</span>
            <span className="logo-text">ShopVerse<span>STORE</span></span>
          </div>

          <nav className="header__nav">
            {['shop', 'catalogue', 'about'].map(tab => (
              <button
                key={tab}
                className={`header__nav-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'shop' && 'Shop'}
                {tab === 'catalogue' && 'Manage'}
                {tab === 'about' && 'About'}
              </button>
            ))}
          </nav>

          <div className="header__actions">
            <div className="search-bar">
              <span className="search-icon">⌕</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setActiveTab('shop')}
              />
            </div>
            <button className="cart-btn" onClick={() => showToast('Cart coming soon!')}>
              <span>🛍</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main">

        {/* ── SHOP TAB ── */}
        {activeTab === 'shop' && (
          <div className="page-shop">

            {/* Hero */}
            <section className="hero">
              <div className="hero__left">
                <span className="hero__tag">New Arrivals 2025</span>
                <h1 className="hero__title">
                  Discover<br />
                  <span>Premium</span><br />
                  Products
                </h1>
                <p className="hero__desc">
                  Curated collection of high-quality items deployed with real-time MongoDB sync.
                </p>
                <div className="hero__btns">
                  <button className="btn-primary" onClick={() => setActiveTab('catalogue')}>
                    Add Product
                  </button>
                  <button className="btn-ghost" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
                    Browse All →
                  </button>
                </div>
                <div className="hero__stats">
                  <div><strong>{items.length}</strong><span>Products</span></div>
                  <div><strong>3</strong><span>Tiers</span></div>
                  <div><strong>K8s</strong><span>Deployed</span></div>
                </div>
              </div>
              <div className="hero__right">
                <div className="hero__card-float hero__card-float--1">
                  <div className="float-card">
                    <span>⚡</span>
                    <div><strong>Fast Delivery</strong><p>Same day dispatch</p></div>
                  </div>
                </div>
                <div className="hero__card-float hero__card-float--2">
                  <div className="float-card">
                    <span>🔒</span>
                    <div><strong>Secure Checkout</strong><p>256-bit encryption</p></div>
                  </div>
                </div>
                <div className="hero__blob">
                  <div className="blob-inner">
                    <span className="blob-icon">◈</span>
                    <p>Welcome to</p>
                    <strong>ShopVerse</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Category Pills */}
            <div className="categories">
              {categories.map(c => (
                <button key={c} className="category-pill">{c}</button>
              ))}
            </div>

            {/* Products Grid */}
            <section className="products-section" id="products">
              <div className="section-header">
                <h2>Our Products</h2>
                <span className="section-count">{filteredItems.length} items</span>
              </div>
              {loading ? (
                <div className="skeleton-grid">
                  {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-card" />)}
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📦</span>
                  <h3>No products yet</h3>
                  <p>Be the first to add a product to the catalogue</p>
                  <button className="btn-primary" onClick={() => setActiveTab('catalogue')}>
                    Add Product
                  </button>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredItems.map((item, idx) => (
                    <div className="product-card" key={item._id}>
                      <div className="product-card__img">
                        <div className="product-card__placeholder" style={{ '--hue': (idx * 47) % 360 }}>
                          <span>{item.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="product-card__badge">New</span>
                      </div>
                      <div className="product-card__body">
                        <h3 className="product-card__name">{item.name}</h3>
                        <p className="product-card__desc">{item.description}</p>
                        <div className="product-card__meta">
                          <span className="product-card__date">
                            {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                          <span className="product-card__rating">★★★★☆</span>
                        </div>
                        <div className="product-card__footer">
                          <button className="btn-add-cart" onClick={addToCart}>Add to Cart</button>
                          <button className="btn-delete" onClick={() => deleteItem(item._id)} title="Remove product">✕</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Features Strip */}
            <section className="features-strip">
              {[
                { icon: '🚀', title: 'Fast Shipping', desc: 'Orders shipped in 24hrs' },
                { icon: '↩', title: 'Easy Returns', desc: '30-day return policy' },
                { icon: '💬', title: '24/7 Support', desc: 'Always here to help' },
                { icon: '🔐', title: 'Secure Pay', desc: 'SSL encrypted checkout' },
              ].map(f => (
                <div className="feature-item" key={f.title}>
                  <span className="feature-icon">{f.icon}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {/* ── CATALOGUE / MANAGE TAB ── */}
        {activeTab === 'catalogue' && (
          <div className="page-catalogue">
            <div className="page-header">
              <h2>Product Management</h2>
              <p>Add and manage products stored in MongoDB</p>
            </div>
            <div className="catalogue-layout">
              {/* Add Form */}
              <div className="add-form-panel">
                <h3>Add New Product</h3>
                <form onSubmit={addItem} className="add-form">
                  <div className="form-field">
                    <label>Product Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Wireless Earbuds"
                      value={newItem.name}
                      onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Premium sound quality with ANC"
                      value={newItem.description}
                      onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary btn-full" disabled={addingItem}>
                    {addingItem ? 'Adding...' : '+ Add Product'}
                  </button>
                </form>
                <div className="db-status">
                  <span className="db-dot" />
                  <span>MongoDB Connected · {items.length} docs</span>
                </div>
              </div>

              {/* Items List */}
              <div className="items-panel">
                <div className="items-panel__header">
                  <h3>All Products</h3>
                  <span className="badge">{items.length}</span>
                </div>
                {loading ? (
                  <div className="loading-state">Loading...</div>
                ) : items.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">📦</span>
                    <p>No products in the database yet</p>
                  </div>
                ) : (
                  <div className="items-list">
                    {items.map(item => (
                      <div className="item-row" key={item._id}>
                        <div className="item-row__avatar">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="item-row__info">
                          <strong>{item.name}</strong>
                          <span>{item.description}</span>
                          <small>{new Date(item.createdAt).toLocaleString('en-IN')}</small>
                        </div>
                        <button className="item-row__delete" onClick={() => deleteItem(item._id)}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── ABOUT TAB ── */}
        {activeTab === 'about' && (
          <div className="page-about">
            <div className="about-hero">
              <span className="about-tag">Our Stack</span>
              <h2>Built for Scale</h2>
              <p>A production-grade 3-tier architecture running on Kubernetes</p>
            </div>
            <div className="arch-grid">
              {[
                { icon: '⚛️', tier: 'Tier 1', label: 'Frontend', desc: 'React 18 served via Nginx in a Docker container on Kubernetes', color: '#6366f1' },
                { icon: '⚙️', tier: 'Tier 2', label: 'Backend', desc: 'Node.js + Express REST API with health checks and retry logic', color: '#f59e0b' },
                { icon: '🗄️', tier: 'Tier 3', label: 'Database', desc: 'MongoDB replica set with 3-node HA and persistent volumes', color: '#10b981' },
              ].map(t => (
                <div className="arch-card" key={t.label} style={{ '--accent': t.color }}>
                  <div className="arch-card__icon">{t.icon}</div>
                  <div className="arch-card__tier">{t.tier}</div>
                  <h3>{t.label}</h3>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
            <div className="infra-banner">
              <div>
                {/* <h3>Infrastructure</h3>
                <p>Deployed locally · Application Load Balancer ingress · GitOps workflow via GitHub</p> */}
              </div>
              <div className="infra-tags">
                {['Docker', 'Kubernetes', 'AWS EKS', 'GitOps', 'MongoDB', 'Nginx'].map(t => (
                  <span className="infra-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="team-section">
              <h3>Project Team</h3>
              <div className="team-cards">
                <div className="team-card">
                  <div className="team-card__avatar">A</div>
                  <div>
                    <strong>ETT Project</strong>
                    <p>by Aanya, Ayushi & Anubhuti</p>
                    <a href="https://github.com/ayushisahu19/E-commerce-Website" target="_blank" rel="noopener noreferrer">GitHub →</a>
                  </div>
                </div>
              </div>
              {/* <p className="reference-note">
              </p> */}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="logo-icon">◈</span>
            <span className="logo-text">ShopVerse</span>
            <p>A 3-tier e-commerce app </p>
          </div>
          <div className="footer__links">
            <button onClick={() => setActiveTab('shop')}>Shop</button>
            <button onClick={() => setActiveTab('catalogue')}>Manage</button>
            <button onClick={() => setActiveTab('about')}>About</button>
          </div>
          <div className="footer__copy">
            © 2025-2026 ShopVerse · Built on Kubernetes
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;