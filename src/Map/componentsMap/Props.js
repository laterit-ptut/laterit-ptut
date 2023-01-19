import React, { useEffect } from "react";
import { Mesh } from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

export function Props({file, position, rotation, scale}) {

  const t = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/props/" + file
  );

  useEffect(() => {
    t.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [t]);

  return <primitive position={position} rotation={rotation} scale={scale} object={t.scene} />;
}