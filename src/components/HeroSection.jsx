import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Sparkles, ShieldCheck, Truck, Heart } from 'lucide-react';

function HeroThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xfff0f5, 0.8);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(5, 8, 5); scene.add(key);
    const fill = new THREE.DirectionalLight(0xFFE4F0, 0.5);
    fill.position.set(-5, 2, 4); scene.add(fill);
    const rim = new THREE.PointLight(0x80DEEA, 1.2, 25);
    rim.position.set(0, -4, 3); scene.add(rim);

    // 3 bracelets at different positions, sizes, angles
    const braceletConfigs = [
      { y: 0,    z: 0,    r: 2.2,  speed: 0.004, palette: [0xF48FB1, 0x80DEEA, 0xF8BBD0, 0x4DD0E1], text: 'BEST MOM',       tiltX: 0.4,  tiltZ: 0 },
      { y: 1.4,  z: -1,   r: 1.6,  speed: 0.007, palette: [0xF06292, 0xFCE4EC, 0xE91E63, 0xFFCDD2], text: 'LOVING SIS',     tiltX: 0.6,  tiltZ: 0.6 },
      { y: -1.5, z: -2,   r: 1.3,  speed: 0.0055,palette: [0x93C5FD, 0xC4B5FD, 0xA5F3FC, 0xFDE68A], text: 'MY BESTIE',      tiltX: -0.3, tiltZ: -0.4 },
    ];

    const groups = braceletConfigs.map(cfg => {
      const g = new THREE.Group();
      g.position.set(0, cfg.y, cfg.z);
      g.rotation.x = cfg.tiltX;
      g.rotation.z = cfg.tiltZ;

      const beadCount = 20;
      const angleStep = (Math.PI * 2) / beadCount;
      for (let i = 0; i < beadCount; i++) {
        const angle = i * angleStep;
        const x = Math.cos(angle) * cfg.r;
        const y = Math.sin(angle) * cfg.r;
        const col = cfg.palette[i % cfg.palette.length];

        let geo, mat;
        if (i % 3 === 0) {
          geo = new THREE.IcosahedronGeometry(0.18, 0);
          mat = new THREE.MeshPhongMaterial({ color: col, shininess: 200, specular: 0xffffff, transparent: true, opacity: 0.86, emissive: col, emissiveIntensity: 0.1 });
        } else {
          geo = new THREE.SphereGeometry(0.16, 20, 20);
          mat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 60, specular: 0xffffff });
        }
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, 0);
        g.add(mesh);
      }

      // Cord
      const cord = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.r, 0.028, 8, 60),
        new THREE.MeshBasicMaterial({ color: 0xD4A0B0, transparent: true, opacity: 0.5 })
      );
      g.add(cord);
      scene.add(g);
      return { g, cfg };
    });

    // Floating particles
    const pGeo = new THREE.BufferGeometry();
    const pCount = 60;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xF48FB1, size: 0.06, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse parallax
    let mx = 0, my = 0;
    const onMM = e => {
      const rect = el.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    el.addEventListener('mousemove', onMM);

    // GSAP intro animation
    groups.forEach(({ g }, idx) => {
      gsap.from(g.scale, { x: 0, y: 0, z: 0, duration: 1.1, delay: 0.3 + idx * 0.25, ease: 'back.out(1.6)' });
    });

    let frame;
    let t = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.01;
      groups.forEach(({ g, cfg }) => {
        g.rotation.z += cfg.speed;
        g.rotation.y = mx * 0.08;
        g.position.y = cfg.y + Math.sin(t * 0.7 + cfg.r) * 0.08;
      });
      particles.rotation.y += 0.0015;
      rim.intensity = 0.9 + Math.sin(t * 2.5) * 0.3;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nW = el.clientWidth, nH = el.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('mousemove', onMM);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{
      width: '100%', height: '100%', minHeight: '480px',
      borderRadius: '32px', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 30% 40%, #FFF0F5 0%, #FFF6FB 40%, #EEF9FF 100%)',
      boxShadow: '0 24px 60px rgba(100, 30, 50, 0.13)',
      border: '4px solid #FFFFFF',
      cursor: 'grab',
    }} />
  );
}

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative', padding: 'clamp(3.5rem, 6vw, 6.5rem) 0 5rem',
      background: 'linear-gradient(170deg, #FFF5F8 0%, #FCFBF5 60%, #F4FCFF 100%)',
      overflow: 'hidden',
    }}>
      {/* Dot pattern background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #F0C8D4 1px, transparent 1px)',
        backgroundSize: '28px 28px', opacity: 0.4,
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
        }}>
          {/* Left: Text Content */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#FFFFFF', border: '1px solid var(--color-border)',
              padding: '7px 16px', borderRadius: '9999px',
              boxShadow: 'var(--shadow-sm)', marginBottom: '1.5rem',
            }}>
              <span style={{ fontSize: '1.1rem' }}>🇵🇰</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-rose-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pakistan's 1st Custom Bracelet Brand
              </span>
            </div>

            <h1 className="serif-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Custom Handmade Bracelets for the{' '}
              <span style={{
                color: 'var(--color-rose-dark)', fontStyle: 'italic',
                position: 'relative', display: 'inline-block',
              }}>
                Girls You Love
              </span>.
            </h1>

            <p style={{ fontSize: '1.08rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '520px' }}>
              Spell out love in handmade crystal letter bracelets for Mom, your sister, bestie, and favourite teacher. Shipped across Pakistan, delivered from the heart.
            </p>

            {/* Sale block */}
            <div style={{
              display: 'inline-flex', flexDirection: 'column',
              background: '#FFFFFF', borderRadius: '18px',
              border: '1.5px solid var(--color-border)',
              padding: '14px 20px', marginBottom: '2rem',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#FEE2E2', color: '#B91C1C', padding: '3px 9px', borderRadius: '7px', fontSize: '0.74rem', fontWeight: 800 }}>
                  MEGA OPENING SALE
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  Limited Launch Special
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '7px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-rose-dark)' }}>Rs. 299 for 2 Bracelets</span>
                <span style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>Rs. 400</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <a href="#customizer" className="btn-primary" style={{ fontSize: '1rem' }}>
                <Sparkles size={18} />
                Design Your Bracelet in 3D
              </a>
              <a href="#catalog" className="btn-secondary">
                Browse Gift Catalog
              </a>
            </div>

            {/* Trust badges */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              marginTop: '2.5rem', paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              fontSize: '0.82rem', color: 'var(--color-text-secondary)',
            }}>
              {[
                { icon: <Heart size={15} color="var(--color-rose-dark)" />, text: '100% Handcrafted' },
                { icon: <Truck size={15} color="var(--color-rose-dark)" />, text: 'Delivery Across Pakistan' },
                { icon: <ShieldCheck size={15} color="var(--color-rose-dark)" />, text: 'Premium Stretch Cord' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {b.icon}<span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D Multi-Bracelet Scene */}
          <div style={{ position: 'relative', minHeight: '480px' }}>
            <HeroThreeScene />

            {/* Floating card overlay */}
            <div style={{
              position: 'absolute', bottom: '20px', left: '20px', right: '20px',
              background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(10px)',
              borderRadius: '18px', padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              flexWrap: 'wrap', gap: '10px',
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                  3 Bestselling Designs Shown
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-rose-dark)', fontWeight: 600 }}>
                  All available as custom orders — your words, your crystals
                </div>
              </div>
              <a href="#customizer" style={{
                background: 'var(--color-rose)', color: '#fff',
                padding: '7px 14px', borderRadius: '20px',
                fontSize: '0.78rem', fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>
                Customize Mine
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
