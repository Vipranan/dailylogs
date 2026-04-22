"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Phone mesh — built from Three.js primitives                               */
/* -------------------------------------------------------------------------- */

function Phone({
  textures,
  activeIndex,
}: {
  textures: THREE.Texture[];
  activeIndex: number;
}) {
  return (
    <group>
      {/* Phone body */}
      <RoundedBox
        args={[1.8, 3.6, 0.12]}
        radius={0.12}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </RoundedBox>

      {/* Screen */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.55, 3.1]} />
        <meshBasicMaterial map={textures[activeIndex]} toneMapped={false} />
      </mesh>

      {/* Screen notch */}
      <mesh position={[0, 1.42, 0.08]}>
        <boxGeometry args={[0.4, 0.06, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Volume button 1 (right side) */}
      <mesh position={[0.915, 0.3, 0]}>
        <boxGeometry args={[0.03, 0.2, 0.06]} />
        <meshStandardMaterial color="#222222" metalness={0.9} />
      </mesh>

      {/* Volume button 2 (right side) */}
      <mesh position={[0.915, -0.05, 0]}>
        <boxGeometry args={[0.03, 0.2, 0.06]} />
        <meshStandardMaterial color="#222222" metalness={0.9} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scene — loaded client-side only via dynamic import                        */
/* -------------------------------------------------------------------------- */

function PhoneScene() {
  const textures = useTexture([
    "/images/screen1.png",
    "/images/screen2.png",
    "/images/screen3.png",
  ]) as THREE.Texture[];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Phone textures={textures} activeIndex={activeIndex} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </Canvas>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dynamic wrapper — prevents SSR of WebGL canvas                            */
/* -------------------------------------------------------------------------- */

const DynamicPhoneScene = dynamic(() => Promise.resolve(PhoneScene), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full animate-pulse bg-white/5 rounded-2xl" />
  ),
});

/* -------------------------------------------------------------------------- */
/*  Public export                                                              */
/* -------------------------------------------------------------------------- */

export default function PhoneModel() {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <DynamicPhoneScene />
    </div>
  );
}
