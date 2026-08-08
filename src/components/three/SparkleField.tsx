"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

/**
 * The one deliberate 3D moment on the site: a handful of soft, slow
 * drifting motes behind the hero's floating photo card, suggesting depth
 * without calling attention to itself. Loaded client-only (see
 * HeroParticles) and only mounted on desktop with motion allowed.
 */
export default function SparkleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Sparkles count={26} scale={[5, 6, 3]} size={3.2} speed={0.15} opacity={0.4} color="#F26B5B" />
      <Sparkles count={22} scale={[5, 6, 3]} size={2.4} speed={0.1} opacity={0.35} color="#6FA7A2" />
    </Canvas>
  );
}
