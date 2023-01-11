import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Euler } from "three";

import { Ground } from './componentsMap/Ground';

export function Map() {
  return (
    <div className="Map">
      <Suspense fallback={null}>
        <Canvas shadows>
          <OrbitControls 
            target={[0, 0.35, 0]}
            maxPolarAngle={1.45}
          />
          <PerspectiveCamera makeDefault fov={50} position={[6.191, 4.909, 2.280]} rotation={new Euler( -1.107, 0.882, 0.996, 'XYZ' )} />

          <color args={[11 / 255, 137 / 255, 202 / 255]} attach="background" />

          <ambientLight intensity={0.5} />

          <spotLight
            color={[1, 0.25, 0.7]}
            intensity={1.5}
            angle={1}
            penumbra={0.5}
            position={[5, 5, 0]}
            castShadow
            shadow-bias={-0.0001}
          />
          <spotLight
            color={[0.14, 0.5, 1]}
            intensity={2}
            angle={1}
            penumbra={0.5}
            position={[-5, 5, 0]}
            castShadow
            shadow-bias={-0.0001}
          />
          <Ground />
        </Canvas>
      </Suspense>
    </div>
  );
}
