import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function EditorialHero() {
  return (
    <section className="editorial-hero">
      <div className="container">
        <div className="hero-dual-grid">
          {/* Left Column: Authentic Brand Manifesto */}
          <div className="hero-story-pane">
            <div className="origin-stamp">
              <span className="stamp-flag">🇵🇰</span>
              <span>Pakistan’s 1st Custom Beaded Bracelet Brand</span>
            </div>

            <h1 className="hero-main-title">
              Hand-threaded bracelets for the people who{' '}
              <em>make your world warmer.</em>
            </h1>

            <p className="hero-paragraph">
              No generic bazaar gifts. We hand-string custom letter beads with faceted rose and cyan crystals on reinforced elastic cord. Designed for mothers, sisters, and lifelong best friends. Order directly on our website with Cash on Delivery across Pakistan.
            </p>

            {/* Launch Price Banner with 1 for 199, 2 for 299 */}
            <div className="opening-deal-plaque" style={{ borderLeft: '4px solid #B84D6C' }}>
              <div className="deal-header">
                <span className="deal-badge" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                  MEGA OPENING SALE
                </span>
                <span className="deal-status">Direct Website Launch Discount</span>
              </div>
              <div className="deal-numbers" style={{ flexWrap: 'wrap', gap: '8px', alignItems: 'baseline' }}>
                <span className="deal-now" style={{ fontSize: '1.45rem' }}>
                  1 for Rs. 199
                </span>
                <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#B84D6C' }}>
                  • 2 for Rs. 299
                </span>
                <span className="deal-was">Regular: Rs. 250 / 400</span>
              </div>
              <p className="deal-caption" style={{ marginTop: '6px' }}>
                Bundle savings automatically calculated in your bag. Order online, WhatsApp is for questions!
              </p>
            </div>

            {/* Direct Navigation */}
            <div className="hero-cta-group">
              <a href="#customizer" className="hero-primary-btn">
                <span>Open Customizer Workbench</span>
                <span className="arrow-glyph">→</span>
              </a>
              <a href="#catalog" className="hero-secondary-btn">
                Browse Expanded Archives
              </a>
            </div>

            <div className="hero-footnote-strip">
              <span>✓ Direct Website Checkout</span>
              <span className="dot-divider">•</span>
              <span>✓ Cash on Delivery (COD)</span>
              <span className="dot-divider">•</span>
              <span>✓ Sized in centimeters (cm)</span>
            </div>
          </div>

          {/* Right Column: Authentic Photography Focus */}
          <div className="hero-visual-pane">
            <div className="photo-matting-frame">
              <img
                src="/images/mothers_day_duo.jpg"
                alt="Mother's Day Loving Duo Bracelet Set"
                className="hero-featured-photo"
              />
              <div className="photo-caption-card">
                <div className="caption-text-main">
                  <strong>Mother’s Day Duo Set</strong>
                  <span>"BEST MOM" + "LOVING MOM"</span>
                </div>
                <div className="caption-tag">Fixed 2 for Rs. 299</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
