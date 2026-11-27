"use client";
import { Environment, Lightformer } from "@react-three/drei";

/** Studio reflections built from light panels, so nothing is downloaded at runtime. */
export function StudioLighting({ warm = "#FFE6C7" }: { warm?: string }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color={warm} />
      <directionalLight position={[-5, -2, 3]} intensity={0.5} color="#F5DFD9" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#fff4e6" position={[0, 5, -3]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffd9c2" position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[5, 0, 1]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={2} color="#E9DDC4" position={[0, -3, 4]} scale={3} />
      </Environment>
    </>
  );
}
