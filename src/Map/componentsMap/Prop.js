import React, { useEffect } from "react";
import { Mesh } from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";

export function Prop({file, position, rotation, scale}) {

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


  let arrayObj = [];
  arrayObj[0] = t.scene ;

  useEffect(() => {

    if (!(Array.isArray(position))){
      for (let i=1; i<position.pos.length; i++){
        arrayObj[i] = t.scene.clone() ;

      }
    }

    console.log(t);

  }, []);

  function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


  return <>
    {arrayObj.map((obj, index) =>  
      <mesh key={index} >
        <primitive position={position.pos[index]} rotation={rotation} scale={scale} object={obj} />
      </mesh>
    )}
  </>
  
}