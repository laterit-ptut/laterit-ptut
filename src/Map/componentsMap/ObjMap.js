import React, { useEffect } from "react";

import { useGLTF } from '@react-three/drei'
import { Mesh } from "three";

const file = "ps_madagascar_22.gltf";

useGLTF.preload('/models/map/' + file)

export function ObjMap() {

  const t = useGLTF('/models/map/' + file)

  useEffect(() => {
    t.scene.castShadow = true;
    t.scene.receiveShadow = true;
    t.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [t]);

  return <primitive scale={5} rotation={[0, 0.43, 0]} position={[0, -10.3, 0]} object={t.scene} />;
}