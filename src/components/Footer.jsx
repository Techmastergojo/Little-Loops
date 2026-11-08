import React from 'react';
import { MessageCircle, Instagram, Heart, MapPin, Phone } from 'lucide-react';

export default function Footer({
  whatsappNumber = '0310255336',
  instagramUrl = 'https://www.instagram.com/house_wife_cool/?hl=en',
}) {
  return (
    <footer
      style={{
        backgroundColor: '#261116',
        color: '#FCE7EE',
        padding: '3rem 0 5rem 0', // bottom padding accounts for mobile sticky bar
        borderTop: '3px solid #B84D6C',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <img
                src="/images/logo.png"
                alt="Little Loops Logo"
                style={{
                  width: '42px',
                  height: '42px',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  padding: '2px',
                }}
              />
              <div>
                <h4 className="serif-heading" style={{ fontSize: '1.35rem', color: '#FFFFFF', lineHeight: 1.1 }}>
                  Little Loops
                </h4>
                <span style={{ fontSize: '0.65rem', color: '#FBCFE8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Bracelets + More
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: '#D4B3BC', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Pakistan's 1st custom letter & faceted crystal bracelet atelier. Handcrafted with love for sisters, mothers, best friends, and cherished moments.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  minHeight: '40px',
                }}
              >
                <Instagram size={15} color="#F472B6" />
                @house_wife_cool
              </a>
              <a
                href={`https://wa.me/92${whatsappNumber.replace(/^0/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  minHeight: '40px',
                }}
              >
                <MessageCircle size={15} />
                WhatsApp Queries
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1rem',
                letterSpacing: '0.04em',
              }}
            >
              Shop & Explore
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <li>
                <a href="#customizer" style={{ color: '#D4B3BC' }}>
                  Artisan Workbench (Build Your Own)
                </a>
              </li>
              <li>
                <a href="#catalog" style={{ color: '#D4B3BC' }}>
                  Mother's Day Loving Duo Set
                </a>
              </li>
              <li>
                <a href="#catalog" style={{ color: '#D4B3BC' }}>
                  Loving Sister Collection
                </a>
              </li>
              <li>
                <a href="#catalog" style={{ color: '#D4B3BC' }}>
                  Expanded Archives
                </a>
              </li>
              <li>
                <a href="#size-guide" style={{ color: '#D4B3BC' }}>
                  Wrist Sizing Manual (cm)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h5
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1rem',
                letterSpacing: '0.04em',
              }}
            >
              Direct Order & Support
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem', color: '#D4B3BC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#F472B6" />
                <span>WhatsApp Queries: {whatsappNumber}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Instagram size={15} color="#F472B6" />
                <span>Instagram: house_wife_cool</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="#F472B6" />
                <span>Handmade with care in Pakistan</span>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.25rem',
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.78rem',
                color: '#FBCFE8',
              }}
            >
              🎉 <strong>Mega Opening Special:</strong> 1 for Rs. 199 • 2 for Rs. 299 (Cash on Delivery).
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#A0808B',
            gap: '0.75rem',
          }}
        >
          <div>
            © {new Date().getFullYear()} Little Loops. All rights reserved. Pakistan's 1st Custom Beaded Bracelet Brand.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Crafted with</span>
            <Heart size={13} color="#F472B6" fill="#F472B6" />
            <span>for sisters, mothers & besties.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
