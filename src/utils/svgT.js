import React, { Suspense, useImperativeHandle, useMemo, useRef } from 'react'
import { Box } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { Euler } from "three";

const DefaultModel = () => (
  <Box args={[1, 1, 1]}>
    <meshBasicMaterial attach="material" color="hotpink" />
  </Box>
)

const SvgShape = ({ shape, color, index }) => (
  <mesh>
    <meshLambertMaterial
      attach="material"
      color={color}
      polygonOffset
      polygonOffsetFactor={index * -0.1}
    />
    <shapeBufferGeometry attach="geometry" args={[shape]} />
  </mesh>
)

const SvgAsync = React.memo(({ url, sceneRef, rotation }) => {
  const { paths } = useLoader(SVGLoader, url)
  const mesh = useRef();
  
  useFrame((e) => {
    mesh.current.rotation.x = e.camera.rotation.x;
    mesh.current.rotation.y = e.camera.rotation.y;
    mesh.current.rotation.z = e.camera.rotation.z;
  });

  const shapes = useMemo(
    () =>
      paths.flatMap((path, index) =>
        path.toShapes(true).map(shape => ({ index, shape, color: path.color }))
      ),
    [paths]
  )
  return (
    <group
      ref={mesh}
      // ref={sceneRef}
      children={shapes.map((props, key) => (
        <SvgShape key={key} {...props} />
      ))}
      position={[0.2, 2.8, 0.2]}
      scale={[-0.01, 0.01, 0.01]}
    />
  )
})

const Svg = React.forwardRef((props, ref) => (
  <Suspense
    fallback={<DefaultModel {...props} />}
    children={<SvgAsync {...props} />}
  />
))

export default Svg;

