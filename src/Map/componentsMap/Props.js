import React, { useEffect } from "react";

import { Prop } from './Prop';

export function Props() {

  const positionArbre1 = [[1, 1, 10], [-2, 1, 7]];

  return <>
  

    {/* Ambila lemaitso */}
    <Prop file={"voiture/voiture.gltf"} position={[45, 2, 0]} scale={0.25} rotation={[0.15, -0.5, 0]} />
    {/* <Prop file={"passage/passage_voiture.gltf"} position={[45, 2, -2]} scale={0.25} rotation={[0.15, -0.5, 0]} /> */}

    {/* Fiherenana */}
    <Prop file={"bridge/bridge.gltf"} position={[5, 0.8, 65]} scale={0.4} rotation={[0, -0.95, 0]} />

    {/* Alaotra */}
    <Prop file={"pirogue/3/pirogue3.gltf"} position={[-8, 1, 30]} scale={0.3} rotation={[0.15, -0.5, 0]} />
    <Prop file={"goose/1/goose.gltf"} position={[30, 3, -10]} scale={0.08} rotation={[0.15, -0.5, 0]} />
    <Prop file={"goose/2/goose2.gltf"} position={[30, 3, -7]} scale={0.08} rotation={[0.15, -0.4, 0]} />
    <Prop file={"goose/3/goose3.gltf"} position={[31, 3, -8]} scale={0.08} rotation={[0.15, -0.1, 0]} />
    <Prop file={"goose/4/goose4.gltf"} position={[28, 3, -9]} scale={0.08} rotation={[0.15, -0.1, 0]} />

    {/* Ikopa / Anosizato  */}
    <Prop file={"pirogue/3/pirogue3.gltf"} position={[[57, 0, 52], [54, 0, 12]]} scale={0.4} rotation={[[0, 1, 0],[0, 0.5, 0]]} />

    {/* Fasina  */}
    {/* <Prop file={"pot/pot.gltf"} position={[40, 2, -30]} scale={0.25} rotation={[0.15, -0.5, 0]} /> */}
    <Prop file={"duck/1/duck.gltf"} position={[-1, 0.3, -22]} scale={0.1} rotation={[0.15, 0.8, 0]} />
    <Prop file={"duck/2/duck2.gltf"} position={[-2, 0.3, -25]} scale={0.1} rotation={[0, 0.5, 0]} />
    <Prop file={"duck/3/duck3.gltf"} position={[-1, 0.3, -25]} scale={0.1} rotation={[0.15, -0.1, 0]} />
    <Prop file={"duck/4/duck4.gltf"} position={[0, 0.3, -23]} scale={0.1} rotation={[0, -0.9, 0]} />

    {/* Maroantsetra */}
    <Prop file={"marche/1/marche.gltf"} position={[45, -0.2, -43]} scale={0.3} rotation={[0, 0.8, 0]} />
    <Prop file={"marche/2/marche2.gltf"} position={[46, -0, -42]} scale={0.3} rotation={[0, 0.8, 0]} />
    <Prop file={"marche/3/marche3.gltf"} position={[46, -0.2, -42]} scale={0.3} rotation={[0, 0.8, 0]} />
    <Prop file={"pirogue/2/pirogue2.gltf"} position={[48, 0.2, -39]} scale={0.3} rotation={[0, 0.2, 0]} />

    {/* Ankazomalaza */}
    <Prop file={"eau/1/eau.gltf"} position={[37, 4, 10]} scale={0.2} rotation={[0.15, -0.5, 0]} />
    <Prop file={"eau/2/eau2.gltf"} position={[37, 4, 10]} scale={0.2} rotation={[0.15, -0.5, 0]} />
    <Prop file={"eau/3/eau3.gltf"} position={[37, 4, 10]} scale={0.2} rotation={[0.15, -0.5, 0]} />

    {/* Autres */}
    {/* <Prop file={"buisson/buisson.gltf"} position={[1, 1, 10]} scale={0.25} rotation={[0.15, -0.5, 0]} /> */}
    <Prop file={"pirogue/1/pirogue.gltf"} position={[[-8, 0.6, 30],[-8, 0.8, 35]]} scale={0.3} rotation={[[0.15, -0.5, 0], [0, 0, 0]]} />


    {/* forêt 1 */}
    <Prop file={"tree/1/tree.gltf"} position={[[1, 1, 10], [28, 2, 40], [-6, 1, -7]]} scale={0.4} rotation={[[0.15, -0.5, 0], [0.15, -0.5, 0], [0.15, -0.5, 0]]} />

    <Prop file={"tree/3/tree3.gltf"} position={[[1, 1, 14], [30, 2, 40], [-8, 0, -7],[10, 1, 37], [38, 2.2, -40],[15, 1.5, 1]]} scale={0.4} rotation={[[0.15, -0.5, 0], [0, 0, 0],[0, 0, 0], [0, 0, 0], [0.15, -0.5, 0], [0, 0, 0]]} />
    {/* <Prop file={"tree/2/tree2.gltf"} position={[[1, 1, 14], [31, 1, 42]]} scale={0.4} rotation={[[0.15, -0.5, 0], [0.45, 0, 0]]} /> */}
    <Prop file={"tree/4/tree4.gltf"} position={[[0, 1, 10], [29, 2, 44], [31, 2, 42], [-1, 1, 8]]} scale={0.4} rotation={[[0, 0, 0],  [0, 0, 0], [0.15, -0.5, 0], [0.15, -0.5, 0]]} />


    <Prop file={"baobab/1/baobab.gltf"} position={[[15, 1, -20], [26, 2, 70]]} scale={0.3} rotation={[[0, 0, 0], [0.15, -0.5, 0]]} />
    <Prop file={"baobab/2/baobab2.gltf"} position={[[47, 1, 50],[15, 1, -21], [24, 2, 70], [25, 2, 72]]} scale={0.6} rotation={[[0, 0, 0],[0, 0, 0],[0, 0.9, 0], [0.15, -0.5, 0]]} />
    <Prop file={"baobab/4/baobab4.gltf"} position={[[48, 1, 37], [16, 1, -20], [26, 2, 72]]} scale={0.3} rotation={[[0, 0, 0],[0, 0.9, 0],[0.15, -0.5, 0]]} />
    <Prop file={"baobab/3/baobab3.gltf"} position={[[16, 1, -20], [26, 2, 70], [0, 2, 50]]} scale={0.3} rotation={[[0.15, -0.5, 0], [0, 0, 0],[0.15, -0.5, 0]]} />
  </>

}