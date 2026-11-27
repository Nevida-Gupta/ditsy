"use client";
import { useMemo } from "react";
import * as THREE from "three";

/*
 * Procedural sample models. These are real, rotatable 3D geometry built in code so the
 * experience works before product scans exist. Replace per product with a GLB scan by
 * setting `model3d: "/models/<file>.glb"` in the catalogue.
 */

export const METAL: Record<string, string> = {
  gold: "#D9B160", antique: "#B88C45", silver: "#D4D6DC", oxidised: "#8C8782", rosegold: "#DDA58C",
};

export function Metal({ finish = "gold", rough = 0.22 }: { finish?: string; rough?: number }) {
  return <meshPhysicalMaterial color={METAL[finish] ?? METAL.gold} metalness={1} roughness={rough} clearcoat={0.4} clearcoatRoughness={0.2} />;
}
export function Pearl() {
  return <meshPhysicalMaterial color="#F6EFE6" metalness={0} roughness={0.18} clearcoat={1} clearcoatRoughness={0.08} sheen={1} sheenColor="#FFE9F0" />;
}
export function Gem({ color }: { color: string }) {
  return <meshPhysicalMaterial color={color} metalness={0.1} roughness={0.04} clearcoat={1} reflectivity={1} ior={1.8} />;
}

export function JhumkaModel({ finish = "antique", stone = "#9B1B30" }: { finish?: string; stone?: string }) {
  const dome = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      // bell profile: narrow top, flaring rim
      const y = 1 - t * 1.25;
      const r = 0.12 + Math.pow(t, 0.75) * 0.82 + Math.sin(t * Math.PI) * 0.06;
      pts.push(new THREE.Vector2(r, y));
    }
    return new THREE.LatheGeometry(pts, 72);
  }, []);
  const fringe = useMemo(() => Array.from({ length: 28 }, (_, i) => (i / 28) * Math.PI * 2), []);
  return (
    <group>
      {/* top stud */}
      <mesh position={[0, 2.05, 0]}><sphereGeometry args={[0.32, 40, 40]} /><Gem color={stone} /></mesh>
      <mesh position={[0, 2.05, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.38, 0.07, 16, 48]} /><Metal finish={finish} /></mesh>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <mesh key={i} position={[Math.cos(a) * 0.5, 2.05 + Math.sin(a) * 0.5, 0]}><sphereGeometry args={[0.07, 16, 16]} /><Pearl /></mesh>;
      })}
      <mesh position={[0, 1.42, 0]}><cylinderGeometry args={[0.05, 0.05, 0.6, 12]} /><Metal finish={finish} /></mesh>
      {/* dome */}
      <mesh geometry={dome} position={[0, 0.1, 0]}><Metal finish={finish} rough={0.3} /></mesh>
      <mesh position={[0, 1.12, 0]}><sphereGeometry args={[0.16, 24, 24]} /><Metal finish={finish} /></mesh>
      {/* stones ring */}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <mesh key={i} position={[Math.cos(a) * 0.62, 0.35, Math.sin(a) * 0.62]}><sphereGeometry args={[0.075, 16, 16]} /><Gem color={stone} /></mesh>;
      })}
      {/* rim */}
      <mesh position={[0, -1.15, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.98, 0.06, 16, 96]} /><Metal finish={finish} /></mesh>
      {/* fringe of pearls */}
      {fringe.map((a, i) => (
        <group key={i} position={[Math.cos(a) * 0.96, -1.2, Math.sin(a) * 0.96]}>
          <mesh position={[0, -0.16, 0]}><cylinderGeometry args={[0.012, 0.012, 0.3, 6]} /><Metal finish={finish} /></mesh>
          <mesh position={[0, -0.36 - (i % 2) * 0.12, 0]}><sphereGeometry args={[0.085, 18, 18]} /><Pearl /></mesh>
        </group>
      ))}
    </group>
  );
}

export function ChandbaliModel({ finish = "gold", stone = "#F3E6BE" }: { finish?: string; stone?: string }) {
  return (
    <group rotation={[0, 0, Math.PI]}>
      <mesh><torusGeometry args={[1.2, 0.22, 24, 96, Math.PI]} /><Metal finish={finish} /></mesh>
      {Array.from({ length: 9 }, (_, i) => {
        const a = (0.08 + (i / 8) * 0.84) * Math.PI;
        return <mesh key={i} position={[Math.cos(a) * 1.2, Math.sin(a) * 1.2, 0.2]}><sphereGeometry args={[0.1, 20, 20]} /><Gem color={stone} /></mesh>;
      })}
      {Array.from({ length: 15 }, (_, i) => {
        const a = (0.03 + (i / 14) * 0.94) * Math.PI;
        return (
          <group key={`p${i}`} position={[Math.cos(a) * 1.48, Math.sin(a) * 1.48, 0]}>
            <mesh position={[Math.cos(a) * 0.18, Math.sin(a) * 0.18, 0]}><sphereGeometry args={[0.09, 18, 18]} /><Pearl /></mesh>
          </group>
        );
      })}
      <mesh position={[0, -0.6, 0]}><sphereGeometry args={[0.24, 32, 32]} /><Gem color={stone} /></mesh>
      <mesh position={[0, -0.6, 0]}><torusGeometry args={[0.3, 0.05, 12, 40]} /><Metal finish={finish} /></mesh>
    </group>
  );
}

export function BangleModel({ finish = "gold", stone = "#9B1B30" }: { finish?: string; stone?: string }) {
  return (
    <group rotation={[Math.PI / 2.6, 0, 0]}>
      {[0, 1, 2].map((k) => (
        <group key={k} position={[0, 0, (k - 1) * 0.34]}>
          <mesh><torusGeometry args={[1.3, 0.12, 24, 120]} /><Metal finish={finish} /></mesh>
          {k !== 1 && Array.from({ length: 36 }, (_, i) => {
            const a = (i / 36) * Math.PI * 2;
            return <mesh key={i} position={[Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0.1]}><sphereGeometry args={[0.05, 10, 10]} /><Gem color={stone} /></mesh>;
          })}
        </group>
      ))}
    </group>
  );
}

export function GiftBoxModel({ color = "#F5DFD9", ribbon = "#1E3A4F" }: { color?: string; ribbon?: string }) {
  return (
    <group>
      <mesh position={[0, -0.15, 0]}><boxGeometry args={[1.6, 1.2, 1.6]} /><meshPhysicalMaterial color={color} roughness={0.55} sheen={0.6} sheenColor="#fff" /></mesh>
      <mesh position={[0, 0.55, 0]}><boxGeometry args={[1.72, 0.3, 1.72]} /><meshPhysicalMaterial color={color} roughness={0.5} sheen={0.6} sheenColor="#fff" /></mesh>
      <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.22, 1.72, 1.76]} /><meshPhysicalMaterial color={ribbon} roughness={0.3} sheen={1} sheenColor="#ffd6dd" /></mesh>
      <mesh position={[0, 0.1, 0]}><boxGeometry args={[1.76, 1.72, 0.22]} /><meshPhysicalMaterial color={ribbon} roughness={0.3} sheen={1} sheenColor="#ffd6dd" /></mesh>
      <mesh position={[-0.28, 0.85, 0]} rotation={[0, 0, Math.PI / 5]} scale={[1, 0.6, 0.5]}><torusGeometry args={[0.3, 0.09, 16, 40]} /><meshPhysicalMaterial color={ribbon} roughness={0.3} /></mesh>
      <mesh position={[0.28, 0.85, 0]} rotation={[0, 0, -Math.PI / 5]} scale={[1, 0.6, 0.5]}><torusGeometry args={[0.3, 0.09, 16, 40]} /><meshPhysicalMaterial color={ribbon} roughness={0.3} /></mesh>
      <mesh position={[0, 0.78, 0]}><sphereGeometry args={[0.13, 20, 20]} /><meshPhysicalMaterial color={ribbon} roughness={0.3} /></mesh>
    </group>
  );
}
