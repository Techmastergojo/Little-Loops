import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ─── Palette definitions ─────────────────────────────────────────────────────
const PALETTES = {
  'pink-cyan': [0xF48FB1, 0x80DEEA, 0xF8BBD0, 0x4DD0E1, 0xFFCDD2, 0x26C6DA, 0xFCE4EC, 0xB2EBF2],
  'pure-pink': [0xF48FB1, 0xFCE4EC, 0xF06292, 0xFFF0F5, 0xE91E63, 0xFFCDD2, 0xFF80AB, 0xFFA0C0],
  'ocean-ice': [0x80DEEA, 0xE0F7FA, 0x26C6DA, 0xB2EBF2, 0x00BCD4, 0xCCF7FF, 0xA7F3FD, 0x67E8F9],
  'crystal-mix': [0xF48FB1, 0x93C5FD, 0xFDE68A, 0xC4B5FD, 0x6EE7B7, 0xFCA5A5, 0xFCD34D, 0xA5B4FC],
};

const CHARM_EMOJI = { heart: '♥', ribbon: '🎀', star: '★' };

// ─── Canvas helper: draw a crisp letter bead texture ─────────────────────────
function makeLetterTexture(letter, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');

  // White bead base with subtle gradient for 3D feel
  const grad = ctx.createRadialGradient(size * 0.38, size * 0.35, size * 0.05, size * 0.5, size * 0.5, size * 0.5);
  grad.addColorStop(0, '#FFFFFF');
  grad.addColorStop(0.75, '#F5F0F3');
  grad.addColorStop(1, '#E8DCE2');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
  ctx.fill();

  // Subtle ring edge
  ctx.strokeStyle = 'rgba(200,160,175,0.6)';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Letter — bold, centered, anti-aliased
  ctx.fillStyle = '#1A0F13';
  ctx.font = `bold ${Math.round(size * 0.52)}px "Arial Black", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const metrics = ctx.measureText(letter);
  const textY = size / 2 + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
  ctx.fillText(letter, size / 2, textY + size * 0.03);

  return new THREE.CanvasTexture(canvas);
}

// ─── Canvas helper: draw heart charm bead ───────────────────────────────────
function makeCharmTexture(charm, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');

  // White base with pink tint
  const grad = ctx.createRadialGradient(size * 0.38, size * 0.35, size * 0.05, size * 0.5, size * 0.5, size * 0.5);
  grad.addColorStop(0, '#FFFFFF');
  grad.addColorStop(1, '#FFD6E5');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(230,100,145,0.5)';
  ctx.lineWidth = 6;
  ctx.stroke();

  if (charm === 'heart') {
    // Draw actual heart shape (SVG path method)
    ctx.fillStyle = '#E91E63';
    ctx.font = `${Math.round(size * 0.56)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('♥', size / 2, size / 2 + size * 0.04);
  } else if (charm === 'star') {
    ctx.fillStyle = '#F59E0B';
    ctx.font = `${Math.round(size * 0.52)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', size / 2, size / 2 + size * 0.03);
  } else {
    // ribbon
    ctx.font = `${Math.round(size * 0.45)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎀', size / 2, size / 2);
  }

  return new THREE.CanvasTexture(canvas);
}

// ─── Build a full bracelet group ─────────────────────────────────────────────
function buildBraceletGroup(text, paletteName, charm, sizeCm) {
  const group = new THREE.Group();
  const colors = PALETTES[paletteName] || PALETTES['pink-cyan'];

  // Size the ring radius proportional to wrist size
  const braceletRadius = 2.4 + (sizeCm - 16) * 0.055;

  // Build sequence: crystals | charm | letters | charm | crystals
  const letters = text.toUpperCase().replace(/[^A-Z0-9 ]/g, '').substring(0, 14).split('');
  const CRYSTAL_SIDE = 5;

  const sequence = [];
  for (let i = 0; i < CRYSTAL_SIDE; i++) sequence.push({ type: 'crystal', ci: i });
  sequence.push({ type: 'charm' });
  letters.forEach(ch => sequence.push({ type: ch === ' ' ? 'spacer' : 'letter', char: ch }));
  sequence.push({ type: 'charm' });
  for (let i = 0; i < CRYSTAL_SIDE; i++) sequence.push({ type: 'crystal', ci: i + 1 });

  const total = sequence.length;
  const beadR = 0.26;
  const angleStep = (Math.PI * 2) / total;

  // Shared geometries
  const sphereGeo = new THREE.SphereGeometry(beadR, 36, 36);
  const crystalGeo = new THREE.SphereGeometry(beadR * 1.05, 10, 8); // slightly faceted

  sequence.forEach((bead, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = Math.cos(angle) * braceletRadius;
    const z = Math.sin(angle) * braceletRadius;
    let mesh;

    if (bead.type === 'crystal') {
      const color = colors[bead.ci % colors.length];
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.05,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 1.0,
        transparent: true,
        opacity: 0.88,
        envMapIntensity: 1.5,
      });
      mesh = new THREE.Mesh(crystalGeo, mat);
      // Slight random bead rotation for faceted variety
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

    } else if (bead.type === 'charm') {
      const tex = makeCharmTexture(charm);
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.25, metalness: 0.0 });
      mesh = new THREE.Mesh(new THREE.SphereGeometry(beadR * 1.12, 36, 36), mat);

    } else if (bead.type === 'spacer') {
      // Small crystal for space character
      const mat = new THREE.MeshPhysicalMaterial({ color: colors[0], roughness: 0.08, transparent: true, opacity: 0.5, clearcoat: 1 });
      mesh = new THREE.Mesh(new THREE.SphereGeometry(beadR * 0.55, 20, 20), mat);

    } else {
      // Letter bead
      const tex = makeLetterTexture(bead.char);
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.2, metalness: 0.0 });
      mesh = new THREE.Mesh(sphereGeo, mat);
    }

    mesh.position.set(x, 0, z);
    // Face outward from center so letters are readable from outside
    mesh.lookAt(x * 2, 0, z * 2);
    group.add(mesh);
  });

  // Elastic cord — smooth thick torus
  const cordMat = new THREE.MeshStandardMaterial({
    color: 0xE8C8D0,
    roughness: 0.85,
    metalness: 0.0,
  });
  const cord = new THREE.Mesh(
    new THREE.TorusGeometry(braceletRadius, 0.038, 20, total * 3),
    cordMat
  );
  cord.rotation.x = Math.PI / 2; // lay flat in XZ plane
  group.add(cord);

  // Glow halo disc under the bracelet (canvas-based radial gradient)
  const haloCanvas = document.createElement('canvas');
  haloCanvas.width = 256; haloCanvas.height = 256;
  const hCtx = haloCanvas.getContext('2d');
  const hGrad = hCtx.createRadialGradient(128, 128, 20, 128, 128, 128);
  const dominantHex = '#' + colors[0].toString(16).padStart(6, '0');
  hGrad.addColorStop(0, dominantHex + '55');
  hGrad.addColorStop(0.5, dominantHex + '20');
  hGrad.addColorStop(1, 'transparent');
  hCtx.fillStyle = hGrad;
  hCtx.fillRect(0, 0, 256, 256);
  const haloTex = new THREE.CanvasTexture(haloCanvas);
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(braceletRadius * 2.5, braceletRadius * 2.5),
    new THREE.MeshBasicMaterial({ map: haloTex, transparent: true, opacity: 0.7, depthWrite: false })
  );
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = -0.4;
  group.add(halo);

  return group;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function BraceletCanvas3D({ text = 'LOVE', palette = 'pink-cyan', charm = 'heart', sizeCm = 16 }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ scene: null, group: null, controls: null, renderer: null, frame: null });
  // Debounce text updates so it doesn't rebuild on every single keypress
  const rebuildTimer = useRef(null);

  // Initial scene setup — runs once
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    el.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // ── Camera ────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 5.5, 8.5);
    camera.lookAt(0, 0, 0);

    // ── Scene ─────────────────────────────────────────────────
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    // ── Lighting — cinematic product-display setup ─────────────
    // Sky/ground hemisphere light — warm ambient
    const hemi = new THREE.HemisphereLight(0xFFF0F8, 0xF0E0E8, 0.9);
    scene.add(hemi);

    // Key light — main sharp bright light
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(6, 10, 7);
    scene.add(key);

    // Fill light — soft rose from left
    const fill = new THREE.DirectionalLight(0xFFD6E5, 0.9);
    fill.position.set(-7, 4, 2);
    scene.add(fill);

    // Crystal sparkle light — dynamic cyan point from below/behind
    const spark = new THREE.PointLight(0x80DEEA, 1.6, 20);
    spark.position.set(0, -4, -4);
    scene.add(spark);

    // ── OrbitControls ─────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = true;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI * 0.65; // Can't go below the bracelet
    controls.minPolarAngle = Math.PI * 0.08;
    stateRef.current.controls = controls;

    // Stop autorotate on user interaction, resume after 2s idle
    let resumeTimer;
    controls.addEventListener('start', () => {
      controls.autoRotate = false;
      clearTimeout(resumeTimer);
    });
    controls.addEventListener('end', () => {
      resumeTimer = setTimeout(() => { controls.autoRotate = true; }, 2000);
    });

    // ── Floating particles ────────────────────────────────────
    const pGeo = new THREE.BufferGeometry();
    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xF48FB1, size: 0.055, transparent: true, opacity: 0.55 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Initial bracelet build ────────────────────────────────
    const initGroup = buildBraceletGroup(text, palette, charm, sizeCm);
    scene.add(initGroup);
    stateRef.current.group = initGroup;

    // ── Animation loop ────────────────────────────────────────
    let t = 0;
    const animate = () => {
      stateRef.current.frame = requestAnimationFrame(animate);
      t += 0.012;
      controls.update();
      // Pulsing sparkle light
      spark.intensity = 1.4 + Math.sin(t * 2.2) * 0.4;
      spark.position.x = Math.sin(t * 0.7) * 3;
      // Slow particle drift
      particles.rotation.y += 0.0012;
      pMat.opacity = 0.4 + Math.sin(t * 1.5) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ────────────────────────────────────────
    const onResize = () => {
      const nW = el.clientWidth, nH = el.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(resumeTimer);
      clearTimeout(rebuildTimer.current);
      cancelAnimationFrame(stateRef.current.frame);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []); // only once

  // Rebuild bracelet when visual props change (debounced 200ms for text typing)
  useEffect(() => {
    clearTimeout(rebuildTimer.current);
    rebuildTimer.current = setTimeout(() => {
      const { scene, group } = stateRef.current;
      if (!scene) return;

      // Remove & dispose old group
      if (group) {
        scene.remove(group);
        group.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); });
          }
        });
      }

      const newGroup = buildBraceletGroup(text, palette, charm, sizeCm);
      scene.add(newGroup);
      stateRef.current.group = newGroup;
    }, 180);
  }, [text, palette, charm, sizeCm]);

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '24px', overflow: 'hidden' }}>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '380px',
          background: 'radial-gradient(ellipse at 40% 35%, #FFF0F8 0%, #FFF5FB 45%, #EEF9FF 100%)',
          cursor: 'grab',
          display: 'block',
        }}
        aria-label="Interactive 3D bracelet preview — drag to rotate"
      />
      {/* Interaction hint */}
      <div style={{
        position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)',
        padding: '5px 14px', borderRadius: '20px',
        fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-secondary)',
        border: '1px solid var(--color-border)', pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}
