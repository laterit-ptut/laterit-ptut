import React, { useRef } from 'react'
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Bezier } from '../../utils/Bezier';
import { BezierProvider } from '../../utils/BezierProvider';

export function Point({position, index, handleClick}) {
  const texture = useLoader(TextureLoader, '/icons/point.png');
  const focus = useLoader(TextureLoader, '/icons/pointfocus.png');
  const mesh = useRef();
  const meshBasicMaterial = useRef();
  const meshFocus = useRef();
  const meshFocusBasicMaterial = useRef();
  let mode = "down";

  let bez = [];
  bez.push(new Bezier());
  bez.push(new Bezier());
  bez[0].setPoints(7, 8);
  bez[1].setPoints(0, 1);

  BezierProvider.beziers["point" + index] = bez;
  
  useFrame((e) => {
    mesh.current.rotation.x = e.camera.rotation.x;
    mesh.current.rotation.y = e.camera.rotation.y;
    mesh.current.rotation.z = e.camera.rotation.z;
    meshFocus.current.scale.y = 0.53;

    //animation focus
    let coord = BezierProvider.beziers["point" + index][0].get();
    if(coord) {meshFocus.current.position.y = mesh.current.position.y - coord}
    let opacity = BezierProvider.beziers["point" + index][1].get();
    if(opacity) {meshFocusBasicMaterial.current.opacity = opacity}

    if(opacity >= 0.95 && mode === "down") {
      mode = "up";
      BezierProvider.beziers["point" + index][0].setPoints(8, 7);
      BezierProvider.beziers["point" + index][1].setPoints(1, 0);
    }

    if(opacity < 0.05 && mode === "up") {
      mode = "down";
      BezierProvider.beziers["point" + index][0].setPoints(7, 8);
      BezierProvider.beziers["point" + index][1].setPoints(0, 1);
    }


    //animation opacity with camera down
    let max = 100;
    let min = 50;
    if(e.camera.position.y < max) {
      opacity = 1 - ((max - e.camera.position.y) / (max - min));
      meshBasicMaterial.current.opacity = opacity;
      meshFocusBasicMaterial.current.opacity = opacity;
    }
  });

  return <>
    <mesh ref={mesh} scale={1} position={position} onClick={(e) => handleClick(index)}>
      <planeBufferGeometry attach="geometry" args={[4, 4]} />
      <meshBasicMaterial ref={meshBasicMaterial}  attach="material" map={texture} transparent />
      <mesh ref={meshFocus} scale={1}>
        <planeBufferGeometry attach="geometry" args={[4, 4]} />
        <meshBasicMaterial ref={meshFocusBasicMaterial}  attach="material" map={focus} transparent />
      </mesh>
    </mesh>
    
  </>
}
