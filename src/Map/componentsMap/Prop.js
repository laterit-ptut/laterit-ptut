import React, { useEffect, useState } from "react";
import { useGLTF } from '@react-three/drei'
import { Mesh } from "three";

export function Prop({ file, position, rotation, scale }) {

  const t = useGLTF(process.env.PUBLIC_URL + "models/props/" + file)

  const [objs, setObjs] = useState([]);
  const [objsPosition, setObjsPosition] = useState([]);
  const [objsRotation, setObjsRotation] = useState([]);

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


  useEffect(() => {
    let arrayObj = [];

    if (position.length === rotation.length) {
      arrayObj[0] = t.scene;
      if (Array.isArray(position[0])) { //multiple objects
        setObjsPosition(position);
        setObjsRotation(rotation);
        for (let i = 1; i < position.length; i++) {
          arrayObj[i] = t.scene.clone();
        }
      } else { // single object
        setObjsPosition([position]);
        setObjsRotation([rotation]);
      }
    }

    setObjs(arrayObj);

  }, []);

  return <>
    {objs.map((obj, index) =>
      <mesh key={index} >
        <primitive position={objsPosition[index]} rotation={objsRotation[index]} scale={scale} object={obj} />
      </mesh>
    )}
  </>

}