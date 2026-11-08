import React from 'react';
import { ShoppingBag, Instagram, Ruler, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSizeGuide,
  onOpenAdmin,
  whatsappNumber = '0310255336',
  instagramUrl = 'https://www.instagram.com/house_wife_cool/?hl=en',
}) {
  return (
    <>
      {/* Top Notification Strip */}
      <div
        style={{
          backgroundColor: '#2C181E',
          color: '#FDEBF1',
          fontSize: '0.72rem',
          fontWeight: 600,
          padding: '6px 12px',
          textAlign: 'center',
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          flexWrap: 'wrap',
          lineHeight: 1.3,
        }}
      >
        <span>
          MEGA OPENING SALE: <strong style={{ color: '#FBCFE8' }}>1 for Rs. 199</strong> • <strong style={{ color: '#FBCFE8' }}>2 for Rs. 299</strong>
        </span>
        <span style={{ opacity: 0.5 }}>•</span>
        <a
          href={`https://wa.me/92${whatsappNumber.replace(/^0/, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#A7F3D0', textDecoration: 'underline' }}
        >
          WhatsApp Queries: {whatsappNumber}
        </a>
      </div>

      {/* Main Navigation Bar */}
      <header className="site-header">
        <div className="container header-container">
          {/* Brand Logo & Name */}
          <a href="#" className="header-brand">
            <img
              src="/images/logo.png"
              alt="Little Loops Bow Logo"
              className="header-logo"
            />
            <div>
              <span className="header-title">Little Loops</span>
              <span className="header-subtitle">Bracelets + More</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <a href="#customizer" className="desktop-nav-link">
              Artisan Workbench
            </a>
            <a href="#catalog" className="desktop-nav-link">
              Archives
            </a>
            <button
              onClick={onOpenSizeGuide}
              className="desktop-nav-link"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Ruler size={15} color="#B84D6C" />
              Sizing (cm)
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-line)',
                color: '#B84D6C',
              }}
            >
              <Instagram size={16} />
            </a>

            <button
              onClick={onOpenAdmin}
              className="admin-pill-btn"
              title="Atelier Control Room"
            >
              <span>Admin</span>
            </button>

            <button
              onClick={onOpenCart}
              className="bag-btn"
              aria-label={`Open Bag (${cartCount})`}
            >
              <ShoppingBag size={15} />
              <span>Bag</span>
              <span className="bag-count-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Quick-Action Bottom Bar */}
      <nav className="mobile-nav-bar" aria-label="Mobile Bottom Navigation">
        <a href="#customizer" className="mobile-nav-item">
          <Sparkles size={16} />
          <span>Customizer</span>
        </a>
        <a href="#catalog" className="mobile-nav-item">
          <BookOpen size={16} />
          <span>Archives</span>
        </a>
        <button onClick={onOpenSizeGuide} className="mobile-nav-item">
          <Ruler size={16} />
          <span>Sizing</span>
        </button>
        <button onClick={onOpenCart} className="mobile-nav-item" style={{ color: '#B84D6C' }}>
          <ShoppingBag size={16} />
          <span>Bag ({cartCount})</span>
        </button>
      </nav>
    </>
  );
}
