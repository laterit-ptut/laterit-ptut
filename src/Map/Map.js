import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky, Cloud } from "@react-three/drei";
import { Euler, Vector3 } from "three";

import { Ground } from './componentsMap/Ground';
import { Ocean } from './componentsMap/Water';
import { ObjMap } from './componentsMap/ObjMap';

import { Bezier } from "../utils/Bezier";

export function Map() {

  const bezPX = new Bezier();
  const bezPZ = new Bezier();
  const bezPY = new Bezier();

  const bezRX = new Bezier();
  const bezRZ = new Bezier();
  const bezRY = new Bezier();

  bezPY.setPoints(3, 8);

  //debug activation
  const debug = true;

  const camera = useRef();
  const orbit = useRef();

  //debug functions
  function getCamera() {
    console.log(camera.current.position);
    console.log(camera.current.rotation);
  }
  function p1() {
    bezPX.setPoints(camera.current.position.x, 0.42);
    bezPZ.setPoints(camera.current.position.z, -8.80);
    bezPY.setPoints(camera.current.position.y, 5.2);

    bezRX.setPoints(camera.current.rotation.x, -2.63);
    bezRZ.setPoints(camera.current.rotation.z, 3.11);
    bezRY.setPoints(camera.current.rotation.y, 0.04);
  }

  const Camera = () => {    

    useFrame(() => {
      if(!debug) {
        orbit.current.dispose();
      }

      let px = bezPX.get();
      if(px) {
        camera.current.position.x = px;
      }

      let pz = bezPZ.get();
      if(pz) {
        camera.current.position.z = pz;
      }

      let py = bezPY.get();
      if(py) {
        camera.current.position.y = py;
      }

      let rx = bezRX.get();
      if(rx) {
        camera.current.rotation.x = rx;
      }

      let rz = bezRZ.get();
      if(rz) {
        camera.current.rotation.z = rz;
      }

      let ry = bezRY.get();
      if(ry) {
        camera.current.rotation.y = ry;
      }

    });

    return <>
      {/* <OrbitControls
        ref={orbit}
        maxPolarAngle={1.45}
      /> */}
      <PerspectiveCamera ref={camera} makeDefault fov={50} position={[6.191, 5, 2.280]} rotation={new Euler( -1.107, 0.882, 0.996, 'XYZ' )} />
    </>
  }

  return (
    <div className="Map">
      {(debug) &&
        <div className="debug">
          <p>debug</p>
          <button onClick={getCamera}>Coords cam</button>
          <button onClick={p1}>p1</button>
        </div>
      }
      <Canvas shadows>
        <Suspense fallback={null}>
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
