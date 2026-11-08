import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQty,
  onOrderSuccess,
  whatsappNumber = '0310255336',
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  // Customer Delivery State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    note: '',
  });

  if (!isOpen) return null;

  // New Pricing Formula:
  // 1 for 199, 2 for 299
  // Every pair = 299, any remaining odd single = 199
  const totalItemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const pairCount = Math.floor(totalItemCount / 2);
  const singleCount = totalItemCount % 2;
  const totalPrice = (pairCount * 299) + (singleCount * 199);
  const regularAnchor = (pairCount * 400) + (singleCount * 250);
  const savings = Math.max(0, regularAnchor - totalPrice);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWebOrderSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          customerCity: formData.city || 'Pakistan',
          customerNote: formData.note,
          items: cartItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order.');
      }

      setOrderComplete(data);
      if (onOrderSuccess) onOrderSuccess(data);

      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D97390', '#69D0DE', '#FFFFFF', '#B84D6C'],
      });
    } catch (err) {
      console.error('Order checkout error:', err);
      alert('Could not submit order: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetDrawer = () => {
    setIsCheckingOut(false);
    setOrderComplete(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(44, 24, 30, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 110,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={resetDrawer}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-10px 0 35px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E8D8CF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAF6F3',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#B84D6C" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#2C181E' }}>
              {orderComplete ? 'Order Confirmed!' : isCheckingOut ? 'Delivery Details' : `Your Bag (${totalItemCount})`}
            </h3>
          </div>
          <button
            onClick={resetDrawer}
            aria-label="Close bag drawer"
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: '#9C838A',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Pricing Promotion Bar */}
        {!orderComplete && (
          <div
            style={{
              backgroundColor: '#FDEBF1',
              padding: '10px 16px',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#B84D6C',
              textAlign: 'center',
              borderBottom: '1px solid #F1E5DF',
            }}
          >
            🎉 FIXED ATELIER PRICING: 1 for Rs. 199 • 2 for Rs. 299!
          </div>
        )}

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {orderComplete ? (
            /* Order Success View */
            <div style={{ textAlign: 'center', padding: '2rem 0.5rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#DCFCE7',
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <span style={{ fontSize: '0.78rem', color: '#B84D6C', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                DIRECT STORE ORDER REGISTERED
              </span>
              <h4 style={{ fontSize: '1.6rem', color: '#2C181E', margin: '0.4rem 0 0.8rem' }}>
                Order #{orderComplete.orderId}
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#6B5259', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Your order is officially recorded in the Little Loops artisan database! Our team is preparing your custom letter beads and faceted crystals.
              </p>

              <div style={{ backgroundColor: '#FAF6F3', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E8D8CF', textAlign: 'left', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#6B5259' }}>Customer:</span>
                  <strong style={{ fontSize: '0.85rem', color: '#2C181E' }}>{formData.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#6B5259' }}>Phone:</span>
                  <strong style={{ fontSize: '0.85rem', color: '#2C181E' }}>{formData.phone}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#6B5259' }}>City:</span>
                  <strong style={{ fontSize: '0.85rem', color: '#2C181E' }}>{formData.city || 'Standard Delivery'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E8D8CF', paddingTop: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#2C181E' }}>Cash on Delivery Total:</span>
                  <strong style={{ fontSize: '1.1rem', color: '#B84D6C' }}>Rs. {orderComplete.totalAmount}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href={`https://wa.me/92${whatsappNumber.replace(/^0/, '')}?text=${encodeURIComponent(
                    `Hi Little Loops! I just placed order #${orderComplete.orderId} on your website for Rs. ${orderComplete.totalAmount}. Just reaching out with a question!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    backgroundColor: '#FDEBF1',
                    color: '#B84D6C',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                  }}
                >
                  Have questions? WhatsApp query team ({whatsappNumber})
                </a>

                <button
                  type="button"
                  onClick={resetDrawer}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '10px',
                    backgroundColor: '#2C181E',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : isCheckingOut ? (
            /* Direct Web Checkout Delivery Form */
            <form onSubmit={handleWebOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#2C181E', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Ayesha Khan"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1.5px solid #E8D8CF',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#2C181E', marginBottom: '4px' }}>
                  Phone / WhatsApp Number (for Courier & Dispatch) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 0312 3456789"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1.5px solid #E8D8CF',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#2C181E', marginBottom: '4px' }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Karachi, Lahore, Islamabad"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1.5px solid #E8D8CF',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#2C181E', marginBottom: '4px' }}>
                  Full House / Street Address *
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House number, street, area landmarks..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1.5px solid #E8D8CF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#6B5259', marginBottom: '4px' }}>
                  Special Instructions for Artisan (Optional)
                </label>
                <input
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="e.g. Gift pouch for bestie's birthday"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #E8D8CF',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Order Summary Recap in Form */}
              <div style={{ backgroundColor: '#FAF6F3', padding: '12px', borderRadius: '10px', border: '1px solid #E8D8CF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>Total Items:</span>
                  <strong>{totalItemCount} Bracelets</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, color: '#B84D6C' }}>
                  <span>Total Due (COD):</span>
                  <span>Rs. {totalPrice}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '9999px',
                    border: '1px solid #E8D8CF',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    backgroundColor: '#B84D6C',
                    color: '#FFFFFF',
                    padding: '0.85rem',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 14px rgba(184, 77, 108, 0.35)',
                  }}
                >
                  {submitting ? 'Recording Order...' : `Confirm Order — Rs. ${totalPrice}`}
                </button>
              </div>
            </form>
          ) : (
            /* Items List in Bag */
            <>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#9C838A' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛍️</div>
                  <h4 style={{ color: '#2C181E', marginBottom: '0.25rem' }}>Your bag is empty</h4>
                  <p style={{ fontSize: '0.85rem' }}>Customize your bracelet on our workbench or browse the archives!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px solid #E8D8CF',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <img
                        src={item.image || '/images/sister.jpg'}
                        alt={item.title}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2C181E' }}>
                            {item.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Remove item"
                            style={{ color: '#EF4444', padding: '2px' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {item.details && (
                          <div style={{ fontSize: '0.75rem', color: '#6B5259', marginTop: '4px' }}>
                            {item.details.text && <span>"{item.details.text}" • </span>}
                            {item.details.theme && <span>{item.details.theme} • </span>}
                            {item.details.sizeCm && <span>Size: {item.details.sizeCm}</span>}
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              border: '1px solid #E8D8CF',
                              borderRadius: '20px',
                              padding: '2px 8px',
                            }}
                          >
                            <button
                              onClick={() => onUpdateQty(item.id, Math.max(1, (item.quantity || 1) - 1))}
                              style={{ fontWeight: 700, fontSize: '0.9rem', padding: '0 4px' }}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.quantity || 1}</span>
                            <button
                              onClick={() => onUpdateQty(item.id, (item.quantity || 1) + 1)}
                              style={{ fontWeight: 700, fontSize: '0.9rem', padding: '0 4px' }}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#B84D6C' }}>
                            {item.quantity > 1 ? `${item.quantity} pieces` : '1 piece'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Checkout Actions */}
        {!orderComplete && !isCheckingOut && cartItems.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid #E8D8CF',
              backgroundColor: '#FAF6F3',
            }}
          >
            {/* Price Calculations */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.85rem', color: '#6B5259' }}>Regular Price:</span>
              <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', color: '#9C838A' }}>
                Rs. {regularAnchor}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#2C181E' }}>
                Total (1 for Rs. 199, 2 for Rs. 299):
              </span>
              <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#B84D6C' }}>
                Rs. {totalPrice}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginBottom: '14px' }}>
              ✓ You are saving Rs. {savings} with our bundle discount!
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              style={{
                width: '100%',
                backgroundColor: '#2C181E',
                color: '#FFFFFF',
                padding: '0.9rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.98rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(44, 24, 30, 0.25)',
                marginBottom: '10px',
              }}
            >
              <span>Order on Website (Cash on Delivery)</span>
              <ArrowRight size={17} />
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.74rem', color: '#9C838A' }}>
              WhatsApp is reserved exclusively for queries and custom consultations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
