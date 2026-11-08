import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Users } from 'lucide-react';

export default function CatalogSection({ onAddToCart, onOpenSizeGuide }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    {
      id: 'cat-mom-duo',
      category: 'mother',
      title: 'Mother’s Day Loving Duo Set',
      subtitle: 'Includes "BEST MOM" + "LOVING MOM" paired with pastel crystals',
      price: 299,
      originalPrice: 400,
      image: '/images/mothers_day_duo.jpg',
      badge: 'Best Seller',
      defaultSize: '16 cm',
      text: 'BEST MOM',
    },
    {
      id: 'cat-sister-love',
      category: 'sister',
      title: 'Loving Sister Coquette Bracelet',
      subtitle: 'Faceted pink & cyan crystal beads with custom pink heart',
      price: 299,
      originalPrice: 400,
      image: '/images/sister.jpg',
      badge: 'Opening Sale',
      defaultSize: '16 cm',
      text: 'LOVING SISTER',
    },
    {
      id: 'cat-teacher-appreciation',
      category: 'gift',
      title: 'Best Teacher Gratitude Bracelet',
      subtitle: 'Delicate handcrafted beadwork for beloved mentors & teachers',
      price: 299,
      originalPrice: 400,
      image: '/images/teacher.jpg',
      badge: 'Meaningful Gift',
      defaultSize: '16 cm',
      text: 'BEST TEACHER',
    },
    {
      id: 'cat-best-mom-single',
      category: 'mother',
      title: 'Best Mom Everyday Crystal Loop',
      subtitle: 'Shimmering pastel facets with bold contrasting letters',
      price: 299,
      originalPrice: 400,
      image: '/images/best_mom.jpg',
      badge: 'Popular',
      defaultSize: '16 cm',
      text: 'BEST MOM',
    },
  ];

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="catalog" style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
          <span
            style={{
              color: 'var(--color-rose-dark)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Handcrafted With Heart
          </span>
          <h2 className="serif-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginTop: '0.4rem', marginBottom: '0.8rem' }}>
            Curated Gift Catalogs
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
            Thoughtfully planned for Mothers, Sisters, Teachers, and Soulmates. Each piece is hand-strung in Pakistan on premium stretch cord.
          </p>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginTop: '1.5rem',
            }}
          >
            {[
              { id: 'all', label: 'All Collections' },
              { id: 'mother', label: 'Mother’s Day & Moms' },
              { id: 'sister', label: 'Sisters & Besties' },
              { id: 'gift', label: 'Teachers & Gratitude' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: activeCategory === tab.id ? 'var(--color-rose)' : 'var(--color-blush-light)',
                  color: activeCategory === tab.id ? '#FFFFFF' : 'var(--color-text-primary)',
                  border: '1px solid',
                  borderColor: activeCategory === tab.id ? 'var(--color-rose)' : 'var(--color-border)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}
        >
          {filtered.map((item) => (
            <article
              key={item.id}
              style={{
                backgroundColor: 'var(--color-card)',
                borderRadius: '20px',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Product Image Container */}
              <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden', backgroundColor: '#FDF2F4' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  loading="lazy"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: 'var(--color-rose-dark)',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  }}
                >
                  {item.badge}
                </span>

                <span
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(52, 24, 30, 0.85)',
                    color: '#FFFFFF',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                  }}
                >
                  Standard 16 cm Fit
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 className="serif-heading" style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem', marginBottom: '1rem', flex: 1 }}>
                  {item.subtitle}
                </p>

                {/* Price block */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-rose-dark)' }}>
                    Rs. 299
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                    Rs. 400
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#B91C1C', fontWeight: 700, backgroundColor: '#FEE2E2', padding: '2px 6px', borderRadius: '4px' }}>
                    Fixed 2 for 299
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() =>
                      onAddToCart({
                        ...item,
                        details: {
                          text: item.text,
                          sizeCm: item.defaultSize,
                          theme: 'Signature Crystal',
                        },
                      })
                    }
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={onOpenSizeGuide}
                    aria-label="View size guide"
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: '9999px',
                      padding: '0 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'var(--color-card-soft)',
                      cursor: 'pointer',
                    }}
                  >
                    Size Info
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
