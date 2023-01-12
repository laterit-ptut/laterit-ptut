import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky, Cloud } from "@react-three/drei";
import { Euler } from "three";

import { Ground } from './componentsMap/Ground';
import { Ocean } from './componentsMap/Water';
import { ObjMap } from './componentsMap/ObjMap';

export function Map() {

  // const config = { fov: 35, position: [0, 0, 10] }

  const camera = useRef();

  

  const Camera = () => {

    useFrame(() => {
      // console.log(camera.current);
    });

    return (
      <PerspectiveCamera ref={camera} makeDefault fov={50} position={[6.191, 4.909, 2.280]} rotation={new Euler( -1.107, 0.882, 0.996, 'XYZ' )} />
    )
  }

  return (
    <div className="Map">
      <Canvas shadows>
        <Suspense fallback={null}>
          <OrbitControls 
            target={[0, 0.35, 0]}
            maxPolarAngle={1.45}
          />
          <Camera />

          {/* <color attach="background" args={['##C0D1DB']} /> */}

          <ambientLight intensity={0.5} />

          <spotLight
            color={[1, 0.25, 0.7]}
            intensity={1.5}
            angle={10}
            penumbra={0.5}
            position={[5, 5, 0]}
            castShadow
            shadow-bias={-0.0001}
          />
          <spotLight
            color={[0.14, 0.5, 1]}
            intensity={2}
            angle={10}
            penumbra={0.5}
            position={[-5, 5, 0]}
            castShadow
            shadow-bias={-0.0001}
          />
          <Cloud position={[-4, 10, -25]} speed={0.2} opacity={1} />
          <Cloud position={[10, 10, 10]} speed={0.2} opacity={1} />
          <fog attach="fog" args={['#C0D1DB', 500, 1000]} />
          <Sky azimuth={0.1} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />
          <Ocean />
          <ObjMap />
          {/* <Ground /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
