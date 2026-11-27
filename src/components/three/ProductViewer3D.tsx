"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { BangleModel, ChandbaliModel, JhumkaModel } from "./models";
import { StudioLighting } from "./Lighting";

function Glb({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ProductViewer3D({ model, finish, stone }: { model: string; finish?: string; stone?: string }) {
  const proc = model.startsWith("procedural:") ? model.split(":")[1] : null;
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.3, 6.5], fov: 35 }} gl={{ antialias: true, alpha: true }}>
      <StudioLighting />
      <Suspense fallback={null}>
        <Center>
          {proc === "jhumka" && <JhumkaModel finish={finish} stone={stone} />}
          {proc === "chandbali" && <ChandbaliModel finish={finish} stone={stone} />}
          {proc === "bangle" && <BangleModel finish={finish} stone={stone} />}
          {!proc && <Glb url={model} />}
        </Center>
        <ContactShadows position={[0, -2.4, 0]} opacity={0.25} blur={2.5} scale={8} far={4} />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={3.2} maxDistance={9} autoRotate autoRotateSpeed={1.2} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 1.6} />
    </Canvas>
  );
}
