import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Stats } from "@react-three/drei";
import { AxesHelper } from "three";

import { Ocean } from './componentsMap/Water';
import { ObjMap } from './componentsMap/ObjMap';
import { Point } from './componentsMap/Point';
import { MyCloud } from './componentsMap/MyCloud';
import { Props } from './componentsMap/Props';

import { Bezier } from "../utils/Bezier";
import { BezierProvider } from "../utils/BezierProvider";

import { ResizeObserver } from '@juggle/resize-observer';
import { StateMapManager } from "./componentsMap/StateMapManager";
import { LongLatToXY } from "../utils/LongLatToXY";


export function Map({data}) {

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
    StateMapManager.addCallbackActivePoint(focusPoint);
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
  
  const p0 = { position : [16, 176, 4], rotation : [-1.57, 0, 0.1] } // default position & rotation

  //debug activation
  const debug = false;
 
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

  }

  function focusPoint(index) {
    if(index === -1) { // return to p0 position
      moveToP0();
    } else {
      let position = LongLatToXY(data.points[index]) ; 
      position[2] = position[2] + 13;
      moveTo(position, [-0.420, 0, 0]);
    }
    StateMapManager.changeActivePoint(index);    
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
        StateMapManager.changeBlockInterface(false);
      }else {
        StateMapManager.changeBlockInterface(true);
      }

      if(camera.current.position.y > 100) {// fix interface flash
        StateMapManager.changeBlockInterface(true);
      }

    });

    return <>
       <OrbitControls maxPolarAngle={1.45}/>
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
          {(debug) &&
            <axesHelper args={[5]} position={[0, 10, 0]} />
          }
          <ambientLight intensity={0.5} />

          {(data.points).map((point, index) =>
            <Point key={index} data={data.points[index]} index={index} handleClick={(index) => focusPoint(index)} />
          )}

          <spotLight
            color={[1, 1, 1]}
            intensity={0.4}
            angle={15}
            penumbra={0.5}
            position={[5, 30, 0]}
            castShadow
            shadow-bias={-0.0001}
            
          />

          <spotLight
            color={[1, 1, 1]}
            intensity={0.4}
            angle={15}
            penumbra={0.5}
            position={[-5, 30, 0]}
            castShadow
            shadow-bias={-0.0001}
          />

          {/* <fog attach="fog" args={['#C0D1DB', 200, 250]} /> */}
          <Sky azimuth={0.1} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />
          {/* <Clouds /> */}
          <MyCloud p0={p0} />
          <Ocean />
          <ObjMap />
          <Props />
          {/* <Ground /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
