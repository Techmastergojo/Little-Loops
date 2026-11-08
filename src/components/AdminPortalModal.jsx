import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Package, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Trash2, 
  ExternalLink, 
  X, 
  Key, 
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';

export default function AdminPortalModal({ isOpen, onClose }) {
  // Use securely stored key from localStorage or prompt
  const [adminKey, setAdminKey] = useState(() => {
    return localStorage.getItem('ll_admin_key') || 'll_sec_admin_78294a91fbc84d128e';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingCount: 0,
    dispatchedCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch orders when open and key is ready
  useEffect(() => {
    if (isOpen && adminKey) {
      fetchAdminData(adminKey);
    }
  }, [isOpen]);

  const fetchAdminData = async (keyToUse) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/orders', {
        headers: {
          'x-admin-key': keyToUse,
        },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setIsAuthenticated(false);
          setErrorMsg('Invalid or unauthorized Admin API Key.');
        } else {
          setErrorMsg('Unable to retrieve orders from database.');
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      setOrders(data.orders || []);
      setMetrics(data.metrics || {});
      setIsAuthenticated(true);
      localStorage.setItem('ll_admin_key', keyToUse);
    } catch (err) {
      console.error('Admin fetch error:', err);
      setErrorMsg('Failed to reach backend server on port 4000.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      alert('Could not update status: ' + err.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm(`Are you sure you want to permanently delete order ${orderId}?`)) return;

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': adminKey,
        },
      });

      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(null);
        }
      }
    } catch (err) {
      alert('Failed to delete order: ' + err.message);
    }
  };

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 14, 18, 0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #E8D8CF',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            backgroundColor: '#2C181E',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(217, 115, 144, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFB6C1',
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>
                Little Loops • Atelier Control Room
              </h2>
              <span style={{ fontSize: '0.74rem', color: '#E8C5D0' }}>
                Secure Live Orders & Customer Database (SQLite)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => fetchAdminData(adminKey)}
              disabled={loading}
              title="Refresh database records"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <RefreshCw size={14} className={loading ? 'spin-anim' : ''} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close admin portal"
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                color: '#E8C5D0',
                fontSize: '1.3rem',
                lineHeight: 1,
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Auth Gate (if not authenticated) */}
        {!isAuthenticated ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '460px', margin: '0 auto' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FDEBF1',
                color: '#B84D6C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <Key size={26} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#2C181E' }}>
              Atelier Authorization Required
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#6B5259', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Enter your secret store master API key to view orders and manage customer details.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchAdminData(adminKey);
              }}
            >
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Paste Admin Key (e.g. ll_sec_...)"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  border: '1.5px solid #E8D8CF',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
                required
              />
              {errorMsg && (
                <div style={{ color: '#DC2626', fontSize: '0.82rem', marginBottom: '1rem', fontWeight: 600 }}>
                  ✕ {errorMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: '#B84D6C',
                  color: '#FFFFFF',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                }}
              >
                {loading ? 'Authenticating...' : 'Unlock Control Room'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            {/* Store Metrics Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                padding: '1.25rem 1.75rem',
                backgroundColor: '#FAF6F3',
                borderBottom: '1px solid #E8D8CF',
              }}
            >
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E8D8CF' }}>
                <span style={{ fontSize: '0.75rem', color: '#9C838A', fontWeight: 600 }}>Total Store Orders</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2C181E' }}>{metrics.totalOrders}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E8D8CF' }}>
                <span style={{ fontSize: '0.75rem', color: '#9C838A', fontWeight: 600 }}>Total Revenue (PKR)</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#B84D6C' }}>Rs. {metrics.totalRevenue}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E8D8CF' }}>
                <span style={{ fontSize: '0.75rem', color: '#9C838A', fontWeight: 600 }}>Pending Action</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706' }}>{metrics.pendingCount}</div>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '12px 16px', borderRadius: '12px', border: '1px solid #E8D8CF' }}>
                <span style={{ fontSize: '0.75rem', color: '#9C838A', fontWeight: 600 }}>Dispatched / Completed</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669' }}>{metrics.dispatchedCount}</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div
              style={{
                padding: '1rem 1.75rem',
                borderBottom: '1px solid #E8D8CF',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px' }}>
                <Search size={16} color="#9C838A" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Order ID, Customer Name, or Phone..."
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #E8D8CF',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#6B5259', fontWeight: 600 }}>Status:</span>
                {['all', 'pending', 'crafting', 'dispatched', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      backgroundColor: filterStatus === st ? '#2C181E' : '#FAF6F3',
                      color: filterStatus === st ? '#FFFFFF' : '#6B5259',
                      border: '1px solid #E8D8CF',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table & Detail View */}
            <div style={{ display: 'grid', gridTemplateColumns: selectedOrder ? '1.1fr 0.9fr' : '1fr', flex: 1, overflow: 'hidden' }}>
              {/* Order List */}
              <div style={{ overflowY: 'auto', borderRight: selectedOrder ? '1px solid #E8D8CF' : 'none' }}>
                {filteredOrders.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#9C838A' }}>
                    <Package size={36} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                    <p style={{ fontWeight: 600 }}>No orders found in database</p>
                    <span style={{ fontSize: '0.8rem' }}>When a customer checks out on the website, their full order appears here immediately.</span>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#FAF6F3', color: '#6B5259', textAlign: 'left', borderBottom: '1px solid #E8D8CF' }}>
                        <th style={{ padding: '10px 16px' }}>Order ID</th>
                        <th style={{ padding: '10px 16px' }}>Customer</th>
                        <th style={{ padding: '10px 16px' }}>Items</th>
                        <th style={{ padding: '10px 16px' }}>Amount</th>
                        <th style={{ padding: '10px 16px' }}>Status</th>
                        <th style={{ padding: '10px 16px' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((ord) => {
                        const isSelected = selectedOrder && selectedOrder.id === ord.id;
                        return (
                          <tr
                            key={ord.id}
                            onClick={() => setSelectedOrder(ord)}
                            style={{
                              borderBottom: '1px solid #F1E5DF',
                              backgroundColor: isSelected ? '#FDEBF1' : 'transparent',
                              cursor: 'pointer',
                              transition: 'background 0.15s',
                            }}
                          >
                            <td style={{ padding: '12px 16px', fontWeight: 800, color: '#B84D6C' }}>{ord.id}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ fontWeight: 600, color: '#2C181E' }}>{ord.customer_name}</div>
                              <div style={{ fontSize: '0.74rem', color: '#9C838A' }}>{ord.customer_phone}</div>
                            </td>
                            <td style={{ padding: '12px 16px', fontWeight: 600 }}>{ord.item_count} pc(s)</td>
                            <td style={{ padding: '12px 16px', fontWeight: 700, color: '#2C181E' }}>Rs. {ord.total_amount}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '2px 8px',
                                  borderRadius: '9999px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  backgroundColor:
                                    ord.status === 'dispatched' || ord.status === 'completed'
                                      ? '#DCFCE7'
                                      : ord.status === 'crafting'
                                      ? '#FEF3C7'
                                      : ord.status === 'cancelled'
                                      ? '#FEE2E2'
                                      : '#FCE7F3',
                                  color:
                                    ord.status === 'dispatched' || ord.status === 'completed'
                                      ? '#166534'
                                      : ord.status === 'crafting'
                                      ? '#92400E'
                                      : ord.status === 'cancelled'
                                      ? '#991B1B'
                                      : '#9D174D',
                                }}
                              >
                                {ord.status}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: '0.75rem', color: '#9C838A' }}>
                              {new Date(ord.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Order Detail Side Drawer */}
              {selectedOrder && (
                <div style={{ padding: '1.5rem', backgroundColor: '#FFFDFB', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#9C838A', fontWeight: 700 }}>ORDER SPECIFICATION</span>
                      <h3 style={{ fontSize: '1.4rem', color: '#2C181E', fontWeight: 800 }}>{selectedOrder.id}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      style={{ padding: '4px', color: '#9C838A' }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Customer Information Card */}
                  <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '12px', border: '1px solid #E8D8CF', marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#B84D6C', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Customer Delivery Info
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                      <div><strong>Name:</strong> {selectedOrder.customer_name}</div>
                      <div>
                        <strong>Phone / WhatsApp:</strong>{' '}
                        <a
                          href={`https://wa.me/92${selectedOrder.customer_phone.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#059669', textDecoration: 'underline', fontWeight: 600 }}
                        >
                          {selectedOrder.customer_phone} ↗
                        </a>
                      </div>
                      <div><strong>City:</strong> {selectedOrder.customer_city}</div>
                      <div><strong>Full Address:</strong> {selectedOrder.customer_address}</div>
                      {selectedOrder.customer_note && (
                        <div style={{ marginTop: '6px', padding: '6px 8px', backgroundColor: '#FAF6F3', borderRadius: '6px', fontSize: '0.8rem', fontStyle: 'italic' }}>
                          <strong>Note:</strong> "{selectedOrder.customer_note}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items Ordered List */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#B84D6C', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Bracelets to Craft ({selectedOrder.item_count})
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selectedOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '10px 12px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '10px',
                            border: '1px solid #E8D8CF',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={item.image || '/images/sister.jpg'}
                            alt={item.title}
                            style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2C181E' }}>{item.title}</div>
                            {item.details && (
                              <div style={{ fontSize: '0.75rem', color: '#6B5259', marginTop: '2px' }}>
                                {item.details.text && <span style={{ color: '#B84D6C', fontWeight: 700 }}>"{item.details.text}" • </span>}
                                {item.details.theme && <span>Palette: {item.details.theme} • </span>}
                                {item.details.sizeCm && <span>Size: {item.details.sizeCm}</span>}
                              </div>
                            )}
                          </div>
                          <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Qty: {item.quantity || 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Updater */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#2C181E', marginBottom: '0.5rem' }}>
                      Update Order Stage:
                    </label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['pending', 'confirmed', 'crafting', 'dispatched', 'completed', 'cancelled'].map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            backgroundColor: selectedOrder.status === st ? '#B84D6C' : '#FFFFFF',
                            color: selectedOrder.status === st ? '#FFFFFF' : '#6B5259',
                            border: '1px solid #E8D8CF',
                          }}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone: Delete */}
                  <div style={{ borderTop: '1px solid #E8D8CF', paddingTop: '1rem' }}>
                    <button
                      onClick={() => handleDeleteOrder(selectedOrder.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#DC2626',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                      }}
                    >
                      <Trash2 size={14} />
                      Permanently Delete Order Record
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
