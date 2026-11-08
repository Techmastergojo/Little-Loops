import React, { useState } from 'react';
import Header from './components/Header.jsx';
import EditorialHero from './components/EditorialHero.jsx';
import EditorialStorySection from './components/EditorialStorySection.jsx';
import ArtisanWorkbench from './components/ArtisanWorkbench.jsx';
import LookbookGallery from './components/LookbookGallery.jsx';
import TactileSizingManual from './components/TactileSizingManual.jsx';
import SizeGuideModal from './components/SizeGuideModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import AdminPortalModal from './components/AdminPortalModal.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const whatsappNumber = '0310255336';
  const instagramUrl = 'https://www.instagram.com/house_wife_cool/?hl=en';

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const handleUpdateQty = (id, qty) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));

  const handleOrderPlaced = () => {
    // Clear bag after successful registered web order
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, i) => acc + (i.quantity || 1), 0);

  return (
    <div className="atelier-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation Header */}
      <Header
        cartCount={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSizeGuide={() => setIsSizeModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        whatsappNumber={whatsappNumber}
        instagramUrl={instagramUrl}
      />

      <main style={{ flex: 1 }}>
        {/* 1. Warm Editorial Hero with 1 for 199 / 2 for 299 Pricing */}
        <EditorialHero />

        {/* 2. Authentic Problem vs Solution Editorial Chronicle */}
        <EditorialStorySection />

        {/* 3. The Artisan Workbench: 1:1 Scale Tactile Bead Tray */}
        <ArtisanWorkbench onAddToCart={handleAddToCart} />

        {/* 4. Expanded Lookbook Studio Gallery with 6 curated pieces */}
        <LookbookGallery onAddToCart={handleAddToCart} />

        {/* 5. Tactile Sizing Manual (cm) */}
        <TactileSizingManual />
      </main>

      {/* Footer */}
      <Footer whatsappNumber={whatsappNumber} instagramUrl={instagramUrl} />

      {/* Cart Drawer with Real Web Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
        onOrderSuccess={handleOrderPlaced}
        whatsappNumber={whatsappNumber}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />

      {/* Secure Admin Portal (Access with Embedded Secret API Key) */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
