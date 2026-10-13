import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
}

const ParticleSphereAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const particles: Particle[] = [];
    const radius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.3;
    const particleCount = 420;

    // Fibonacci sphere algorithm for even distribution
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      particles.push({ x, y, z, ox: x, oy: y, oz: z });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      angleX += 0.003;
      angleY += 0.005;

      const cx = w / 2;
      const cy = h / 2;

      const transformedParticles = particles.map((p) => {
        // Rotate around Y axis
        const x1 = p.ox * Math.cos(angleY) + p.oz * Math.sin(angleY);
        const z1 = -p.ox * Math.sin(angleY) + p.oz * Math.cos(angleY);
        // Rotate around X axis
        const y1 = p.oy * Math.cos(angleX) - z1 * Math.sin(angleX);
        const z2 = p.oy * Math.sin(angleX) + z1 * Math.cos(angleX);
        return { x: x1, y: y1, z: z2 };
      });

      transformedParticles.sort((a, b) => a.z - b.z);

      transformedParticles.forEach((p) => {
        const scale = 300 / (300 + p.z);
        const px = p.x * scale + cx;
        const py = p.y * scale + cy;

        const size = Math.max(0.8, 2.2 * scale);
        const depthFactor = (p.z + radius) / (2 * radius);
        const alpha = Math.min(1, Math.max(0.08, depthFactor * 0.8 + 0.2));

        // Warm orange-tinted particles matching brand palette
        const r = Math.round(86 + depthFactor * 158); // 86 → 244
        const g = Math.round(124 - depthFactor * 18);  // 124 → 106
        const b = Math.round(141 - depthFactor * 135);  // 141 → 6

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default ParticleSphereAnimation;
