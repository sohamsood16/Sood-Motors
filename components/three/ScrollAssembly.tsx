"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PrecisionAssemblyParts } from "./PrecisionAssembly";

/**
 * Rotation is driven by page scroll progress (written into a shared ref by
 * the parent section via GSAP ScrollTrigger) rather than pointer position,
 * giving this section a distinct, camera-choreographed feel from the hero.
 */
export default function ScrollAssembly({
  reduceMotion,
  progressRef,
}: {
  reduceMotion: boolean;
  progressRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const current = useRef(0);

  useFrame(() => {
    if (!group.current) return;
    const target = reduceMotion ? 0 : progressRef.current;
    current.current = THREE.MathUtils.lerp(current.current, target, 0.06);
    group.current.rotation.y = current.current * Math.PI * 1.4;
    group.current.rotation.x = current.current * 0.25;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={1.7} color="#f3d9c2" />
      <pointLight position={[-4, -2, -2]} intensity={14} color="#7fa4c9" />
      <pointLight position={[0, 3, -4]} intensity={9} color="#c1743c" />
      <PrecisionAssemblyParts reduceMotion={reduceMotion} />
      <fog attach="fog" args={["#0a0b0c", 6, 14]} />
    </group>
  );
}
