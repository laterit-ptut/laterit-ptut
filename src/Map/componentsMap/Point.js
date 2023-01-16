import React, { useRef } from 'react'
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Bezier } from '../../utils/Bezier';

export function Point(props) {
  const texture = useLoader(TextureLoader, '/icons/point.png');
  const focus = useLoader(TextureLoader, '/icons/pointfocus.png');
  const mesh = useRef();
  const meshFocus = useRef();
  const meshBasicMaterial = useRef();
  let mode = "down";

  const bez = new Bezier();
  bez.setPoints(7, 8);
  const bezO = new Bezier();
  bezO.setPoints(0, 1);
  
  useFrame((e) => {
    mesh.current.rotation.x = e.camera.rotation.x;
    mesh.current.rotation.y = e.camera.rotation.y;
    mesh.current.rotation.z = e.camera.rotation.z;

    meshFocus.current.scale.y = 0.53;
    // meshFocus.current.position.y = mesh.current.position.y - 7.5;
    // meshBasicMaterial.opacity = 0.5;

    let coord = bez.get();
    if(coord) {meshFocus.current.position.y = mesh.current.position.y - coord}
    let opacity = bezO.get();
    if(opacity) {meshBasicMaterial.current.opacity = opacity}

    if(opacity >= 0.95 && mode === "down") {
      mode = "up";
      bez.setPoints(8, 7);
      bezO.setPoints(1, 0);
    }

    if(opacity < 0.05 && mode === "up") {
      mode = "down";
      bez.setPoints(7, 8);
      bezO.setPoints(0, 1);
    }

  });

  return <>
    <mesh ref={mesh} scale={1} position={props.position} onClick={(e) => props.handleClick(props.index)}>
      <planeBufferGeometry attach="geometry" args={[4, 4]} />
      <meshBasicMaterial  attach="material" map={texture} transparent />
      <mesh ref={meshFocus} scale={1}>
        <planeBufferGeometry attach="geometry" args={[4, 4]} />
        <meshBasicMaterial ref={meshBasicMaterial}  attach="material" map={focus} transparent />
      </mesh>
    </mesh>
    
  </>
}
