"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ChandbaliModel, GiftBoxModel, JhumkaModel, Pearl, BangleModel } from "./models";
import { StudioLighting } from "./Lighting";

function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, state.pointer.x * 0.25 + scroll * 0.6, 0.05);
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, -state.pointer.y * 0.12, 0.05);
    g.current.position.y = THREE.MathUtils.lerp(g.current.position.y, scroll * 1.6, 0.08);
  });
  return <group ref={g}>{children}</group>;
}

function Spinner({ children, speed = 0.25 }: { children: React.ReactNode; speed?: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (g.current) g.current.rotation.y += d * speed; });
  return <group ref={g}>{children}</group>;
}

function PearlField({ count = 26 }: { count?: number }) {
  const pts = useMemo(() => Array.from({ length: count }, (_, i) => {
    const a = i * 2.39996;
    const r = 2.6 + (i % 5) * 0.7;
    return { p: [Math.cos(a) * r, Math.sin(a * 1.3) * 2.2, -1.5 - (i % 4) * 0.8] as [number, number, number], s: 0.07 + (i % 3) * 0.05 };
  }), [count]);
  return (
    <>
      {pts.map((x, i) => (
        <Float key={i} speed={1 + (i % 3) * 0.4} floatIntensity={0.6} rotationIntensity={0}>
          <mesh position={x.p}><sphereGeometry args={[x.s, 20, 20]} /><Pearl /></mesh>
        </Float>
      ))}
    </>
  );
}

export default function HeroScene({ compact }: { compact?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 9], fov: 35 }} frameloop={visible ? "always" : "never"} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <StudioLighting />
        <Rig>
          <group position={compact ? [0.6, 0.6, 0] : [2.1, 0.15, 0]} scale={compact ? 0.72 : 0.95}>
            <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
              <Spinner speed={0.35}><JhumkaModel finish="antique" stone="#9B1B30" /></Spinner>
            </Float>
          </group>
          <group position={compact ? [-1.3, -2.1, -0.5] : [-0.3, -1.9, -0.8]} rotation={[0.4, 0.6, 0.1]} scale={compact ? 0.55 : 0.75}>
            <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.9}><GiftBoxModel color="#F5DFD9" ribbon="#1E3A4F" /></Float>
          </group>
          <group position={compact ? [1.6, -1.9, -1] : [4.6, -1.6, -1.2]} rotation={[0.3, 0, 0.5]} scale={0.5}>
            <Float speed={1.6} rotationIntensity={0.6}><ChandbaliModel finish="gold" stone="#F3E6BE" /></Float>
          </group>
          {!compact && (
            <group position={[4.2, 2.2, -2]} scale={0.45}>
              <Float speed={1.2} rotationIntensity={0.8}><BangleModel finish="gold" stone="#1F5B45" /></Float>
            </group>
          )}
          <PearlField count={compact ? 14 : 26} />
        </Rig>
      </Canvas>
    </div>
  );
}
