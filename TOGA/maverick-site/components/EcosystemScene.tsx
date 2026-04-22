"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type * as THREE from "three";

// ─── Particle beam (inside Canvas, so useFrame is safe) ───────────────────────

function ParticleBeam({
  from,
  to,
  count = 6,
}: {
  from: [number, number, number];
  to: [number, number, number];
  count?: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useFrame } = require("@react-three/fiber");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const THREERuntime = require("three");

  const offsets = useRef<number[]>(
    Array.from({ length: count }, (_, i) => i / count)
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>(Array(count).fill(null));

  const fromVec = new THREERuntime.Vector3(...from);
  const toVec = new THREERuntime.Vector3(...to);

  useFrame(() => {
    offsets.current = offsets.current.map((t) => {
      const next = t + 0.004;
      return next >= 1 ? next - 1 : next;
    });

    offsets.current.forEach((t, i) => {
      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.lerpVectors(fromVec, toVec, t);
      }
    });
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </>
  );
}

// ─── Scene content (all R3F hooks live here, inside Canvas) ───────────────────

function SceneContent() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useFrame } = require("@react-three/fiber");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { OrbitControls, Text } = require("@react-three/drei");

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
      />

      <group ref={groupRef}>
        {/* ── XB70 node ─────────────────────────────────────────────────── */}
        {/* Glow ring behind */}
        <mesh position={[-3.5, 0, -0.01]}>
          <sphereGeometry args={[0.62, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.08}
          />
        </mesh>
        {/* Main sphere */}
        <mesh position={[-3.5, 0, 0]}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <Text
          position={[-3.5, -1.0, 0]}
          fontSize={0.2}
          color="rgba(255,255,255,0.6)"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          XB70
        </Text>

        {/* ── TOGA node (hero) ──────────────────────────────────────────── */}
        {/* Point light for glow */}
        <pointLight position={[0, 0, 1]} intensity={2} color="#ffffff" />
        {/* Outer glow sphere */}
        <mesh position={[0, 0, -0.01]}>
          <sphereGeometry args={[0.98, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.06}
          />
        </mesh>
        {/* Main sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          TOGA
        </Text>

        {/* ── SKYNET node ───────────────────────────────────────────────── */}
        {/* Glow ring behind */}
        <mesh position={[3.5, 0, -0.01]}>
          <sphereGeometry args={[0.62, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.08}
          />
        </mesh>
        {/* Main sphere */}
        <mesh position={[3.5, 0, 0]}>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <Text
          position={[3.5, -1.0, 0]}
          fontSize={0.2}
          color="rgba(255,255,255,0.6)"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          SKYNET
        </Text>

        {/* ── Particle beams ────────────────────────────────────────────── */}
        <ParticleBeam from={[-3.5, 0, 0]} to={[0, 0, 0]} count={6} />
        <ParticleBeam from={[0, 0, 0]} to={[3.5, 0, 0]} count={6} />
      </group>
    </>
  );
}

// ─── Canvas wrapper (dynamically imported, no SSR) ────────────────────────────

const EcosystemCanvas = dynamic(
  async () => {
    const { Canvas } = await import("@react-three/fiber");

    function Scene() {
      return (
        <Canvas
          style={{ width: "100%", height: "100%", background: "transparent" }}
          camera={{ position: [0, 1.5, 7], fov: 45 }}
          gl={{ alpha: true, antialias: true } as never}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[0, 5, 5]} intensity={0.8} />
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
      <div style={{ width: "100%", height: "100%", background: "transparent" }} />
    ),
  }
);

// ─── Public export ─────────────────────────────────────────────────────────────

export default function EcosystemScene() {
  return (
    <div style={{ width: "100%", height: "420px" }}>
      <EcosystemCanvas />
    </div>
  );
}
