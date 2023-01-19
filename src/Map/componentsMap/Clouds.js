import React from "react";
import { Cloud } from "@react-three/drei";

const nbCloud = 20;

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//x -5 , 45
//y 30 , 40 //altitude
//z -55 , 65

let clouds = [];
for (let i = 0; i < nbCloud; i++) {
  clouds.push({
    position: [rand(-5, 45), rand(40, 60), rand(-55, 65)],
    opacity: rand(5, 5) / 10
  })
}

export function Clouds() {
  return<>
    {clouds.map((cloud, index) =>
      <Cloud key={index} position={cloud.position} speed={0.2} opacity={cloud.opacity} />
    )}

    {/* <Cloud position={[40, altitude, -60]} speed={0.2} opacity={0.7} />
    <Cloud position={[10, altitude, 40]} speed={0.2} opacity={0.5} />
    <Cloud position={[30, altitude, 10]} speed={0.2} opacity={0.6} />
    <Cloud position={[-5, altitude, -5]} speed={0.2} opacity={1} />
    <Cloud position={[40, altitude, 60]} speed={0.2} opacity={0.5} />
    <Cloud position={[20, altitude, -25]} speed={0.2} opacity={0.9} />
    <Cloud position={[50, altitude, 0]} speed={0.2} opacity={0.9} /> */}
  </>
}