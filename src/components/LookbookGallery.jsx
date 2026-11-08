import React, { useState } from 'react';

const LOOKS = [
  {
    id: 'mothers-day-set',
    title: 'The Mother’s Day Loving Duo',
    occasion: 'For Ammi & Mom',
    image: '/images/mothers_day_duo.jpg',
    inscription: 'BEST MOM + LOVING MOM',
    tagline: 'Two matching pastel loops to share with your mother.',
    detail: 'Pale blush facets paired with aqua ice accents and dual center hearts.',
    price: 299,
    wasPrice: 400,
    sizeCm: '16 cm',
    badge: 'Fixed 2 for 299',
  },
  {
    id: 'sister-crystal-loop',
    title: 'The Loving Sister Bond',
    occasion: 'For Sisters & Best Friends',
    image: '/images/sister.jpg',
    inscription: 'LOVING SISTER',
    tagline: 'Faceted rose quartz pink & crystal cyan with a hot pink heart.',
    detail: 'Designed for daily wear with knitted sweaters, college outfits, or kurtis.',
    price: 199,
    wasPrice: 250,
    sizeCm: '16 cm',
    badge: '1 for 199 / 2 for 299',
  },
  {
    id: 'teacher-gratitude-piece',
    title: 'The Mentor Gratitude Loop',
    occasion: 'For Teachers & Mentors',
    image: '/images/teacher.jpg',
    inscription: 'BEST TEACHER',
    tagline: 'A thoughtful thank-you gift for teachers and educators.',
    detail: 'Clean monochrome letter beads flanked by shimmering dual-tone gems.',
    price: 199,
    wasPrice: 250,
    sizeCm: '16 cm',
    badge: '1 for 199 / 2 for 299',
  },
  {
    id: 'everyday-best-mom',
    title: 'The Everyday "Best Mom" Solo',
    occasion: 'Motherhood Keepsake',
    image: '/images/best_mom.jpg',
    inscription: 'BEST MOM',
    tagline: 'Understated, light on the wrist, and full of heartfelt pride.',
    detail: 'Faceted light-catching crystals with bold contrasting lettering.',
    price: 199,
    wasPrice: 250,
    sizeCm: '16 cm',
    badge: '1 for 199 / 2 for 299',
  },
  {
    id: 'soul-sister-duo',
    title: 'Soul Sister Friendship Duo',
    occasion: 'Besties & Soulmates',
    image: '/images/sister.jpg',
    inscription: 'SOUL SISTER + BESTIE',
    tagline: 'Two matching friendship loops for unbreakable bonds.',
    detail: 'Glacier ice cyan facets paired with soft cotton candy pink.',
    price: 299,
    wasPrice: 400,
    sizeCm: '16 cm',
    badge: 'Fixed 2 for 299',
  },
  {
    id: 'ammi-jaan-edition',
    title: 'Ammi Jaan Heirloom Loop',
    occasion: 'Mother Appreciation',
    image: '/images/mothers_day_duo.jpg',
    inscription: 'AMMI JAAN',
    tagline: 'A pure Urdu homage letter-bead loop with golden crystal spacers.',
    detail: 'Handcrafted on reinforced Japanese elastic stretch cord.',
    price: 199,
    wasPrice: 250,
    sizeCm: '16 cm',
    badge: '1 for 199 / 2 for 299',
  },
];

export default function LookbookGallery({ onAddToCart }) {
  const [selectedLook, setSelectedLook] = useState(LOOKS[0]);

  return (
    <section id="catalog" className="lookbook-section">
      <div className="container">
        {/* Header */}
        <div className="lookbook-header">
          <span className="section-eyebrow">Handmade in Pakistan</span>
          <h2 className="lookbook-title">The Expanded Atelier Archives</h2>
          <p className="lookbook-desc">
            Photographed in natural daylight. Real handmade pieces from our atelier ready to be ordered directly on the website with <strong>Cash on Delivery</strong> across Pakistan.
          </p>
        </div>

        {/* Dynamic Studio Stage */}
        <div className="lookbook-stage">
          {/* Main Hero Shot Frame */}
          <div className="stage-focal-card">
            <div className="focal-image-wrap">
              <img
                src={selectedLook.image}
                alt={selectedLook.title}
                className="focal-img"
              />
              <span className="focal-occasion-tag">{selectedLook.occasion}</span>
            </div>

            <div className="focal-info-pane">
              <div className="focal-details-top">
                <span className="curated-badge">{selectedLook.badge}</span>
                <h3 className="focal-item-title">{selectedLook.title}</h3>
                <p className="focal-tagline">{selectedLook.tagline}</p>
                <p className="focal-craft-detail">{selectedLook.detail}</p>
              </div>

              <div className="focal-pricing-bar">
                <div className="focal-price-duo">
                  <span className="focal-now">Rs. {selectedLook.price}</span>
                  <span className="focal-was">Rs. {selectedLook.wasPrice}</span>
                  <span className="focal-save">Bundle Deal: 1 for Rs. 199 • 2 for Rs. 299</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onAddToCart({
                      id: selectedLook.id + '-' + Date.now(),
                      title: selectedLook.title,
                      price: selectedLook.price,
                      originalPrice: selectedLook.wasPrice,
                      image: selectedLook.image,
                      badge: 'Curated Look',
                      details: {
                        text: selectedLook.inscription,
                        theme: 'Atelier Classic',
                        sizeCm: selectedLook.sizeCm,
                      },
                    })
                  }
                  className="focal-order-btn"
                >
                  Add This Piece to Bag
                </button>
              </div>
            </div>
          </div>

          {/* Filmstrip selector underneath with 6 pieces */}
          <div className="lookbook-filmstrip" role="tablist" aria-label="Curated Pieces Selector" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
            {LOOKS.map((look) => {
              const isSelected = look.id === selectedLook.id;
              return (
                <button
                  key={look.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedLook(look)}
                  className={`filmstrip-thumb ${isSelected ? 'active' : ''}`}
                >
                  <img src={look.image} alt={look.title} className="thumb-img" />
                  <div className="thumb-caption">
                    <span className="thumb-name">{look.title}</span>
                    <span className="thumb-inscr">"{look.inscription}"</span>
                    <span style={{ fontSize: '0.7rem', color: '#B84D6C', fontWeight: 700, marginTop: '2px' }}>
                      Rs. {look.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
