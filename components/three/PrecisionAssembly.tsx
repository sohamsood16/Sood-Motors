"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A polished, abstract automotive composition rather than a literal car
 * model: a precision alloy wheel assembly, a blueprint floor grid and a
 * drifting light-particle field. Evokes engineering / detailing precision
 * without the cost or licensing risk of a full vehicle mesh.
 */

// Generated once at module load (not during a component render), so it is
// stable across re-renders without relying on Math.random inside render.
const PARTICLE_COUNT = 220;
function createParticlePositions(): Float32Array {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 10;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
  }
  return arr;
}
const PARTICLE_POSITIONS = createParticlePositions();

function AlloyWheel({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const spokeCount = 7;

  const spokes = useMemo(
    () =>
      Array.from({ length: spokeCount }, (_, i) => (i / spokeCount) * Math.PI * 2),
    []
  );

  useFrame((_, delta) => {
    if (reduceMotion || !group.current) return;
    group.current.rotation.z += delta * 0.18;
  });

  return (
    <group ref={group}>
      {/* Outer rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85, 0.09, 32, 96]} />
        <meshStandardMaterial
          color="#c7cbd1"
          metalness={0.95}
          roughness={0.22}
        />
      </mesh>
      {/* Inner barrel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.05, 24, 72]} />
        <meshStandardMaterial
          color="#8f949a"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>
      {/* Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.22, 32]} />
        <meshStandardMaterial
          color="#c1743c"
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
      {/* Spokes */}
      {spokes.map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 0.78, Math.sin(angle) * 0.78, 0]}
          rotation={[0, 0, angle]}
        >
          <boxGeometry args={[1.15, 0.16, 0.1]} />
          <meshStandardMaterial
            color="#aeb3b9"
            metalness={0.85}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function GhostRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0.15, 0]} position={[0, 0, -0.9]}>
      <torusGeometry args={[2.6, 0.01, 8, 128]} />
      <meshBasicMaterial color="#74797f" transparent opacity={0.4} />
    </mesh>
  );
}

function ParticleField({ reduceMotion }: { reduceMotion: boolean }) {
  const points = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (reduceMotion || !points.current) return;
    points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_POSITIONS, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c7cbd1"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

function FloorGrid() {
  return (
    <gridHelper
      args={[20, 40, "#3a3d40", "#222527"]}
      position={[0, -1.8, 0]}
    />
  );
}

export function PrecisionAssemblyParts({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  return (
    <>
      <AlloyWheel reduceMotion={reduceMotion} />
      <GhostRing />
      <ParticleField reduceMotion={reduceMotion} />
      <FloorGrid />
    </>
  );
}

export default function PrecisionAssembly({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const target = reduceMotion
      ? { x: 0, y: 0 }
      : { x: state.pointer.x * 0.35, y: state.pointer.y * 0.2 };
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      target.x,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -target.y * 0.3,
      0.04
    );
  });

  const scale = Math.min(1, viewport.width / 8);

  return (
    <group ref={group} scale={scale}>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.6}
        color="#f3d9c2"
      />
      <pointLight position={[-4, -2, -2]} intensity={12} color="#7fa4c9" />
      <pointLight position={[0, 3, -4]} intensity={8} color="#c1743c" />

      <PrecisionAssemblyParts reduceMotion={reduceMotion} />

      <fog attach="fog" args={["#0a0b0c", 5, 13]} />
    </group>
  );
}
