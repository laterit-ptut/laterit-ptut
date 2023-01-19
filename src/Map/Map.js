import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Stats } from "@react-three/drei";
import { AxesHelper } from "three";

// import { Ground } from './componentsMap/Ground';
import { Ocean } from './componentsMap/Water';
import { ObjMap } from './componentsMap/ObjMap';
import { Point } from './componentsMap/Point';
import { Clouds } from './componentsMap/Clouds';
import { MyCloud } from './componentsMap/MyCloud';
import { Props } from './componentsMap/Props';

import { Bezier } from "../utils/Bezier";
import { BezierProvider } from "../utils/BezierProvider";

import { ResizeObserver } from '@juggle/resize-observer';


export function Map({setActivePoint, activePoint}) {

  //GET FRAMERATE
  let t = [];
  let test;
  let i = 100; // get framerate after 100 epoch
  let fps; 
  function animate(now) {
      t.unshift(now);
      if (t.length > 10) {
          let t0 = t.pop();
          if(test) {
            if(i < 0) {
              fps = Math.floor(1000 * 10 / (now - t0));
              test = false;
              console.log(fps + ' fps');
              BezierProvider.changeFramerate(fps);
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
  BezierProvider.beziers["map"] = bez;
  
  let cameraTravel = false;
  let pointFocus = -1;
  const p0 = {
    position : [16, 176, 4],
    rotation : [-1.57, 0, 0.1]
  }

  // const p0 = {
  //   position : [-0.99, 6, 19.99],
  //   rotation : [-0.42, 0, 0]
  // }

  //debug activation
  const debug = true;
  const points = [[40, 6, -30], [20, 6, -10], [-1, 6, 10]]

  const camera = useRef();

  //debug functions
  function getCamera() {
    console.log(camera.current.position);
    console.log(camera.current.rotation);
  }
  function moveToP0() {
    moveTo(p0.position, p0.rotation)
  }

  function moveTo(position, rotation) {
    //position
    for (let i = 0; i < position.length; i++) {
      BezierProvider.beziers["map"][i].setPoints(camera.current.position[axes[i]], position[i]);
    }
    //rotation
    for (let i = 0; i < rotation.length; i++) {
      BezierProvider.beziers["map"][i+3].setPoints(camera.current.rotation[axes[i]], rotation[i]);
    }

    pointFocus = 1;
    cameraTravel = true;
  }

  function focusPoint(index) {
    let position = [points[index][0], points[index][1], points[index][2] + 10]
    moveTo(position, [-0.420, 0, 0]);
  }

  const Camera = () => {    

    useFrame(() => {
      let value;
      //position
      for (let i = 0; i < axes.length; i++) {
        value = BezierProvider.beziers["map"][i].get();
        if(value) {camera.current.position[axes[i]] = value}
      }
      //rotation
      for (let i = 0; i < axes.length; i++) {
        value = BezierProvider.beziers["map"][i+3].get();
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
      <PerspectiveCamera ref={camera} makeDefault fov={50} position={p0.position} rotation={p0.rotation} />
    </>
  }
  return (
    <div className="Map">
      {(debug) &&
        <div className="debug">
          <p>debug</p>
          <button onClick={getCamera}>Coords cam</button>
          <button onClick={moveToP0}>p0</button>
        </div>
      }
      <Canvas shadows resize={{ polyfill: ResizeObserver }}>
        <Suspense fallback={null}>
          {(debug) &&
            <Stats />
          }
          <Camera />

          {/* <color attach="background" args={['##C0D1DB']} /> */}

          <ambientLight intensity={0.5} />

          {points.map((point, index) =>
            <Point key={index} position={point} index={index} handleClick={(index) => focusPoint(index)} />
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
          {/* <fog attach="fog" args={['#C0D1DB', 200, 250]} /> */}
          <Sky azimuth={0.1} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />
          {/* <Clouds /> */}
          <MyCloud p0={p0} />
          <Ocean />
          <ObjMap />
          <Props file={"voiture/voiture.gltf"} position={[1, 1, 10]} scale={0.25} rotation={[0.15, -0.5, 0]} />
          {(debug) &&
            <primitive position={[0, 20, 0]} object={new AxesHelper(10)} />
          }
          {/* <Ground /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
