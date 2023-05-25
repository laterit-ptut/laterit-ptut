import React, { useRef } from "react";
import { Cloud } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function MyCloud({ p0 }) {

  const cloud = useRef();

  useFrame((state) => {
    cloud.current.position.x = p0.position[0];
    cloud.current.position.y = p0.position[1] - 25;
    cloud.current.position.z = p0.position[2];
  })

  return <>
    <mesh ref={cloud}>
      <Cloud texture={'cloud.png'} speed={0.2} opacity={0.35} />
    </mesh>
  </>
}
