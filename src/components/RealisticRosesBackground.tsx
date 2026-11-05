import React, { useRef, useEffect } from 'react';
import { RoseStyleId } from '../types';
import { ROSE_STYLES } from '../constants';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  isBurst: boolean;
  layer: number;
  type: 'bokeh' | 'rose' | 'petal';
  size: number;
  roll: number;
  pitch: number;
  yaw: number;
  vRoll: number;
  vPitch: number;
  vYaw: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  opacity: number;
  petalVariant: number;
}

interface RealisticRosesBackgroundProps {
  roseStyleId?: RoseStyleId;
  burstSignal?: number;
  zIndexClass?: string;
}

export const RealisticRosesBackground: React.FC<RealisticRosesBackgroundProps> = ({
  roseStyleId = 'crimson',
  burstSignal = 0,
  zIndexClass = 'z-10'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000 });
  const styleConfig = ROSE_STYLES[roseStyleId] || ROSE_STYLES.crimson;

  // Create a single rose petal, blooming rose bud, or golden bokeh particle
  const createParticle = (
    width: number,
    height: number,
    isBurst: boolean = false,
    depthLayer: number | null = null
  ): Particle => {
    // Depth layer: 0 = distant background, 1 = sharp mid-ground, 2 = close foreground blur
    const layer = depthLayer !== null ? depthLayer : Math.random() < 0.22 ? 0 : Math.random() < 0.84 ? 1 : 2;
    const isBloomingRose = layer === 1 && Math.random() < 0.22;
    const isBokeh = layer === 0 && Math.random() < 0.38;

    const baseSize = isBloomingRose
      ? 18 + Math.random() * 10
      : layer === 2
      ? 24 + Math.random() * 14
      : layer === 1
      ? 13 + Math.random() * 9
      : 7 + Math.random() * 6;

    const startX = isBurst
      ? width * 0.5 + (Math.random() - 0.5) * 180
      : Math.random() * (width + 120) - 60;
    const startY = isBurst
      ? height * 0.52 + (Math.random() - 0.5) * 90
      : -Math.random() * height - 40;

    const speedMultiplier = layer === 2 ? 1.35 : layer === 1 ? 0.95 : 0.55;

    return {
      x: startX,
      y: startY,
      vx: isBurst ? (Math.random() - 0.5) * 7.5 : (Math.random() - 0.5) * 0.7,
      vy: isBurst ? -3.5 - Math.random() * 5.5 : (0.65 + Math.random() * 0.95) * speedMultiplier,
      gravity: isBurst ? 0.085 : 0,
      isBurst,
      layer,
      type: isBokeh ? 'bokeh' : isBloomingRose ? 'rose' : 'petal',
      size: baseSize,
      // 3D orientation angles
      roll: Math.random() * Math.PI * 2,
      pitch: Math.random() * Math.PI * 2,
      yaw: Math.random() * Math.PI * 2,
      vRoll: (Math.random() - 0.5) * 0.024,
      vPitch: 0.014 + Math.random() * 0.022,
      vYaw: 0.01 + Math.random() * 0.018,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.012 + Math.random() * 0.016,
      swayAmp: 0.45 + Math.random() * 0.85,
      opacity: layer === 2 ? 0.68 : layer === 1 ? 0.94 : 0.52,
      petalVariant: Math.floor(Math.random() * 3)
    };
  };

  // Trigger celebratory rose burst when envelope opens
  useEffect(() => {
    if (!burstSignal || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const burstParticles: Particle[] = [];
    for (let i = 0; i < 38; i++) {
      burstParticles.push(createParticle(canvas.width, canvas.height, true, i % 5 === 0 ? 2 : 1));
    }
    particlesRef.current.push(...burstParticles);
  }, [burstSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse & touch movement for interactive breeze
    const updatePointer = (clientX: number, clientY: number) => {
      const p = pointerRef.current;
      p.vx = (clientX - p.lastX) * 0.15;
      p.vy = (clientY - p.lastY) * 0.15;
      p.x = clientX;
      p.y = clientY;
      p.lastX = clientX;
      p.lastY = clientY;
    };

    const onMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Initialize multi-layered particles
    const totalCount = window.innerWidth < 640 ? 34 : 54;
    const initial: Particle[] = [];
    for (let i = 0; i < totalCount; i++) {
      const p = createParticle(canvas.width, canvas.height, false);
      p.y = Math.random() * canvas.height;
      initial.push(p);
    }
    particlesRef.current = initial;

    // Draw a realistic velvet rose petal with notched tip, veins & 3D flip shading
    const drawVelvetPetal = (context: CanvasRenderingContext2D, p: Particle, palette: typeof styleConfig) => {
      const s = p.size;
      const flipCos = Math.cos(p.pitch);
      const tiltSin = Math.sin(p.yaw);
      const scaleX = Math.max(0.22, Math.abs(flipCos));
      const scaleY = 0.65 + 0.35 * Math.abs(tiltSin);
      const isFrontFace = flipCos >= 0;

      context.save();
      context.translate(p.x, p.y);
      context.rotate(p.roll);
      context.scale(scaleX, scaleY);
      context.globalAlpha = p.opacity;

      // Soft depth-of-field shadow
      if (p.layer === 1) {
        context.shadowColor = 'rgba(0, 0, 0, 0.35)';
        context.shadowBlur = 8;
        context.shadowOffsetY = 4;
      } else if (p.layer === 2) {
        context.shadowColor = palette.coreDark;
        context.shadowBlur = 14;
      }

      // Velvet radial gradient across petal curvature
      const grad = context.createRadialGradient(-s * 0.2, -s * 0.25, s * 0.1, 0, s * 0.1, s * 1.15);
      if (isFrontFace) {
        grad.addColorStop(0, palette.highlight);
        grad.addColorStop(0.28, palette.brightTone);
        grad.addColorStop(0.72, palette.midTone);
        grad.addColorStop(1, palette.coreDark);
      } else {
        grad.addColorStop(0, palette.brightTone);
        grad.addColorStop(0.55, palette.underside);
        grad.addColorStop(1, palette.coreDark);
      }

      context.fillStyle = grad;
      context.beginPath();
      // Realistic cupped rose petal silhouette with organic upper cleft
      context.moveTo(0, s * 0.95); // tapered base attachment
      context.bezierCurveTo(-s * 0.85, s * 0.55, -s * 1.15, -s * 0.35, -s * 0.48, -s * 0.88);
      // Subtle top heart notch of a real Damascus rose petal
      context.bezierCurveTo(-s * 0.2, -s * 1.02, -s * 0.05, -s * 0.78, 0, -s * 0.82);
      context.bezierCurveTo(s * 0.05, -s * 0.78, s * 0.22, -s * 1.02, s * 0.48, -s * 0.88);
      context.bezierCurveTo(s * 1.15, -s * 0.35, s * 0.85, s * 0.55, 0, s * 0.95);
      context.closePath();
      context.fill();

      // Delicate silk rim edge & central botanical veins
      context.shadowBlur = 0;
      context.strokeStyle = palette.veinColor;
      context.lineWidth = 0.8;
      context.beginPath();
      context.moveTo(0, s * 0.8);
      context.quadraticCurveTo(-s * 0.08, 0, -s * 0.18, -s * 0.65);
      context.moveTo(0, s * 0.4);
      context.quadraticCurveTo(s * 0.25, -s * 0.05, s * 0.42, -s * 0.45);
      context.moveTo(0, s * 0.2);
      context.quadraticCurveTo(-s * 0.28, -s * 0.15, -s * 0.45, -s * 0.4);
      context.stroke();

      context.restore();
    };

    // Draw a whole miniature blooming 3D rose bud with spiraled layered petals & calyx leaves
    const drawBloomingRose = (context: CanvasRenderingContext2D, p: Particle, palette: typeof styleConfig) => {
      const s = p.size;
      context.save();
      context.translate(p.x, p.y);
      context.rotate(p.roll);
      const tiltScale = 0.82 + 0.18 * Math.sin(p.pitch);
      context.scale(tiltScale, tiltScale);
      context.globalAlpha = p.opacity;

      // Two small emerald-gold sepaled calyx leaves underneath the rose bud
      context.fillStyle = '#2D4F38';
      for (let l = 0; l < 2; l++) {
        context.save();
        context.rotate(l === 0 ? -0.65 : 2.45);
        context.beginPath();
        context.moveTo(0, 0);
        context.quadraticCurveTo(s * 0.5, -s * 0.9, 0, -s * 1.35);
        context.quadraticCurveTo(-s * 0.5, -s * 0.9, 0, 0);
        context.fill();
        context.restore();
      }

      // Outer 5 guard petals
      for (let i = 0; i < 5; i++) {
        context.save();
        context.rotate((i * Math.PI * 2) / 5);
        const outerGrad = context.createRadialGradient(0, -s * 0.3, s * 0.08, 0, -s * 0.4, s * 0.95);
        outerGrad.addColorStop(0, palette.brightTone);
        outerGrad.addColorStop(0.6, palette.midTone);
        outerGrad.addColorStop(1, palette.coreDark);
        context.fillStyle = outerGrad;
        context.beginPath();
        context.moveTo(0, 0);
        context.bezierCurveTo(-s * 0.65, -s * 0.25, -s * 0.75, -s * 0.95, 0, -s * 1.05);
        context.bezierCurveTo(s * 0.75, -s * 0.95, s * 0.65, -s * 0.25, 0, 0);
        context.fill();
        context.restore();
      }

      // Middle 5 cupped overlapping petals
      for (let i = 0; i < 5; i++) {
        context.save();
        context.rotate((i * Math.PI * 2) / 5 + 0.62);
        const midGrad = context.createRadialGradient(0, -s * 0.2, s * 0.05, 0, -s * 0.2, s * 0.7);
        midGrad.addColorStop(0, palette.highlight);
        midGrad.addColorStop(0.45, palette.brightTone);
        midGrad.addColorStop(1, palette.coreDark);
        context.fillStyle = midGrad;
        context.beginPath();
        context.arc(0, -s * 0.34, s * 0.44, 0, Math.PI, true);
        context.closePath();
        context.fill();
        context.restore();
      }

      // Tightly spiraled inner velvet rose heart
      const coreGrad = context.createRadialGradient(0, 0, 1, 0, 0, s * 0.42);
      coreGrad.addColorStop(0, palette.coreDark);
      coreGrad.addColorStop(0.65, palette.midTone);
      coreGrad.addColorStop(1, palette.highlight);
      context.fillStyle = coreGrad;
      context.beginPath();
      context.arc(0, 0, s * 0.36, 0, Math.PI * 2);
      context.fill();

      // Delicate spiral highlight swirl in the bud center
      context.strokeStyle = palette.highlight;
      context.lineWidth = 1.1;
      context.beginPath();
      for (let a = 0; a < Math.PI * 3.2; a += 0.3) {
        const r = (a / (Math.PI * 3.2)) * (s * 0.28);
        const sx = Math.cos(a) * r;
        const sy = Math.sin(a) * r;
        if (a === 0) context.moveTo(sx, sy);
        else context.lineTo(sx, sy);
      }
      context.stroke();

      context.restore();
    };

    const renderLoop = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle volumetric golden-rose light rays from top center
      const rayGrad = ctx.createRadialGradient(
        canvas.width * 0.5,
        -canvas.height * 0.1,
        20,
        canvas.width * 0.5,
        canvas.height * 0.35,
        canvas.width * 0.75
      );
      rayGrad.addColorStop(0, styleConfig.rayColor);
      rayGrad.addColorStop(0.5, styleConfig.bokehColor.replace('0.22', '0.05'));
      rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rayGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decay pointer velocity
      pointerRef.current.vx *= 0.92;
      pointerRef.current.vy *= 0.92;

      const list = particlesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];

        // Natural wind sway + burst gravity recovery
        p.swayPhase += p.swaySpeed;
        const windX = Math.sin(p.swayPhase + time * 0.7) * p.swayAmp;

        if (p.isBurst) {
          p.vy += p.gravity;
          p.vx *= 0.985;
          if (p.vy > 1.3) {
            p.isBurst = false;
            p.gravity = 0;
          }
        }

        // Interactive cursor / finger breeze repulsion
        const dx = p.x - pointerRef.current.x;
        const dy = p.y - pointerRef.current.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 19000 && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (138 - dist) / 138;
          p.x += (dx / dist) * force * 2.4 + pointerRef.current.vx * force * 0.35;
          p.y += (dy / dist) * force * 1.2 + pointerRef.current.vy * force * 0.35;
          p.vRoll += (Math.random() - 0.5) * 0.008;
        }

        p.x += p.vx + windX;
        p.y += p.vy;
        p.roll += p.vRoll;
        p.pitch += p.vPitch;
        p.yaw += p.vYaw;

        // Draw particle by type
        if (p.type === 'bokeh') {
          ctx.save();
          const bGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.1);
          bGrad.addColorStop(0, 'rgba(255, 240, 195, 0.55)');
          bGrad.addColorStop(0.45, styleConfig.bokehColor);
          bGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = bGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'rose') {
          drawBloomingRose(ctx, p, styleConfig);
        } else {
          drawVelvetPetal(ctx, p, styleConfig);
        }

        // Recycle particles that fall below screen
        if (p.y > canvas.height + 60) {
          if (list.length > totalCount) {
            list.splice(i, 1);
          } else {
            p.y = -45;
            p.x = Math.random() * (canvas.width + 80) - 40;
            p.vx = (Math.random() - 0.5) * 0.7;
            p.vy = 0.65 + Math.random() * 0.95;
          }
        }
        if (p.x > canvas.width + 80) p.x = -60;
        if (p.x < -80) p.x = canvas.width + 60;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [styleConfig]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${zIndexClass}`}
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default RealisticRosesBackground;

