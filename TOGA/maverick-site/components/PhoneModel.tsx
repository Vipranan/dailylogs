"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ─── Inner scene components (only imported client-side) ───────────────────────

function SceneContent() {
  // These imports happen inside the dynamic boundary — safe from SSR
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useTexture, OrbitControls, RoundedBox } = require("@react-three/drei");
  const THREE = require("three");

  const textures = useTexture([
    "/images/screen1.png",
    "/images/screen2.png",
    "/images/screen3.png",
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i: number) => (i + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group>
        {/* Phone body */}
        <RoundedBox args={[1.8, 3.6, 0.12]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </RoundedBox>

        {/* Screen */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[1.55, 3.1]} />
          <meshBasicMaterial map={textures[activeIndex]} toneMapped={false} />
        </mesh>

        {/* Notch */}
        <mesh position={[0, 1.42, 0.08]}>
          <boxGeometry args={[0.4, 0.06, 0.01]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Side button 1 */}
        <mesh position={[0.915, 0.3, 0]}>
          <boxGeometry args={[0.03, 0.2, 0.06]} />
          <meshStandardMaterial color="#222222" metalness={0.9} />
        </mesh>

        {/* Side button 2 */}
        <mesh position={[0.915, -0.05, 0]}>
          <boxGeometry args={[0.03, 0.2, 0.06]} />
          <meshStandardMaterial color="#222222" metalness={0.9} />
        </mesh>
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </>
  );
}

// ─── Canvas wrapper (dynamically imported, no SSR) ────────────────────────────

const PhoneCanvas = dynamic(
  async () => {
    const { Canvas } = await import("@react-three/fiber");

    function Scene() {
      return (
        <Canvas
          style={{ width: "100%", height: "100%", background: "transparent" }}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true, clearColor: 0x000000, clearAlpha: 0 } as never}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      );
    }

    return Scene;
  },
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          animation: "pulse 2s infinite",
        }}
      />
    ),
  }
);

// ─── Public export ─────────────────────────────────────────────────────────────

export default function PhoneModel() {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        background: "transparent",
      }}
    >
      <PhoneCanvas />
    </div>
  );
}
