import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky, Cloud } from "@react-three/drei";
import { Stats } from "@react-three/drei";

// import { Ground } from './componentsMap/Ground';
import { Ocean } from './componentsMap/Water';
import { ObjMap } from './componentsMap/ObjMap';
import { Point } from './componentsMap/Point';

import { Bezier } from "../utils/Bezier";

export function Map({setActivePoint, activePoint}) {

  //GET FRAMERATE
  let t = [];
  let test;
  let i = 100; // get framerate after 100 epoch
  function animate(now) {
      t.unshift(now);
      if (t.length > 10) {
          let t0 = t.pop();
          let fps = Math.floor(1000 * 10 / (now - t0));
          if(test) {
            if(i < 0) {
              test = false;
              console.log(fps + ' fps');
              for (let i = 0; i < bez.length; i++) {
                bez[i].changeFramerate(fps);
              }
            }
            i--;
          }          
      }
      if(test) {
        window.requestAnimationFrame(animate);
      }
  };
  window.requestAnimationFrame(animate);

  useEffect(() => {
    test = true;
  }, [])

  const axes = ['x', 'y', 'z'];
  let bez = [];
  // 6 courbes de bezier pour
  // x, z, y position
  // x, z, y rotation
  for (let i = 0; i < 6; i++) { 
    bez.push(new Bezier()) ;
  }
  let cameraTravel = false;
  let pointFocus = -1;

  //debug activation
  const debug = false;
  const points = [[40, 6, -30], [20, 6, -10], [-1, 6, 10]]

  const camera = useRef();

  //debug functions
  function getCamera() {
    console.log(camera.current.position);
    console.log(camera.current.rotation);
  }
  function p1() {
    moveTo([-0.53, 168, 2.54], [-1.57, 0, -0.43])
  }


  function moveTo(position, rotation) {
    //position
    for (let i = 0; i < position.length; i++) {
      bez[i].setPoints(camera.current.position[axes[i]], position[i]);
    }
    //rotation
    for (let i = 0; i < rotation.length; i++) {
      bez[i+3].setPoints(camera.current.rotation[axes[i]], rotation[i]);
    }

    pointFocus = 1;
    cameraTravel = true;
  }

  function focusPoint(index) {
    // moveTo(points[index], [-0.48, -0.75, -0.34]);
    moveTo(points[index], [-0.550, -0.506, -0.289]);
  }

  const Camera = () => {    

    useFrame(() => {

      let value;
      //position
      for (let i = 0; i < axes.length; i++) {
        value = bez[i].get();
        if(value) {camera.current.position[axes[i]] = value}
      }
      //rotation
      for (let i = 0; i < axes.length; i++) {
        value = bez[i+3].get();
        if(value) {camera.current.rotation[axes[i]] = value}
      }
      if(value === false) {
        cameraTravel = false;
      }

      if(!cameraTravel && pointFocus !== -1) {
        // setActivePoint(pointFocus);
        console.log("c");
      }

    });

    return <>
      {/* <OrbitControls maxPolarAngle={1.45}/> */}
      <PerspectiveCamera ref={camera} makeDefault fov={50} position={[-0.53, 168, 2.54]} rotation={[-1.57, 0, -0.43]} />
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
          <Stats />
          <Camera />

          {/* <color attach="background" args={['##C0D1DB']} /> */}

          <ambientLight intensity={0.5} />

          {points.map((point, index) =>
            <Point key={index} position={point} index={index} url={'/icons/point.svg'} handleClick={(index) => focusPoint(index)} />
          )}

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
          {/* <fog attach="fog" args={['#C0D1DB', 200, 300]} /> */}
          <Sky azimuth={0.1} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />
          <Ocean />
          <ObjMap />
          {/* <Ground /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
