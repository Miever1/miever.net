import * as React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { a, useSpring } from '@react-spring/three';
import { Shadow } from '@react-three/drei';

const useWobble = (factor = 1, fn = 'sin', cb) => {
  const ref = React.useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math[fn](t) * factor;
    if (cb) cb(t, ref.current);
  });
  return ref;
};

export const Box = (props) => {
  const [hovered, setHover] = React.useState(false);
  const { spring } = useSpring({
    spring: hovered,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const scale = spring.to([0, 1], [1, 1.5]);
  const color = spring.to([0, 1], ['white', '#50E3C1']);
  const ref = useWobble(0.5, 'cos');
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01));
  return (
    <>
      <a.mesh
        ref={ref}
        {...props}
        scale-y={scale}
        scale-z={scale}
        scale-x={scale}
        onPointerOver={() => {
          setHover(Number(!hovered));
        }}
        onPointerOut={() => {
          setHover(Number(!hovered));
        }}
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
      </a.mesh>
    </>
  );
};

export const Shapes = () => {
  const {
    viewport: { width, height },
  } = useThree();
  const crossSize = 0.7;
  return (
    <>
      <Triangle
        position={[-width / 2.5, height / 8, -1]}
        scale={[crossSize, crossSize, 1]}
        rotation={[0, 0, Math.PI / 4]}
      />
      <Sphere
        position={[width / 3, -height / 3.5, -2]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, 0, Math.PI / 10]}
      ></Sphere>
      <group rotation={[Math.PI / 8, 0, 0]} position={[-width / 4, -height / 6, 0]}>
        <Box scale={[0.8, 0.8, 0.8]} />
        <Box position={[width / 1.5, height / 4, -3]} scale={[0.5, 0.5, 0.5]} />
        <Lights />
      </group>
    </>
  );
};

const Sphere = (props) => {
  const inner = React.useRef();

  const ref = useWobble(0.1, 'sin', () => (inner.current.rotation.z += 0.001));
  return (
    <group ref={ref}>
      <group ref={inner} {...props}>
        <mesh>
          <sphereBufferGeometry attach="geometry" args={[0.7, 30, 30]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>
        <Shadow scale={[2, 2, 1]} opacity={0.2} position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
    </group>
  );
};

const Triangle = (props) => {
  const inner = React.useRef();
  const ref = useWobble(0.1, 'sin', () => (inner.current.rotation.z += 0.001));
  return (
    <group ref={ref}>
      <group ref={inner} {...props}>
        <mesh>
          <geometry attach="geometry">
            <vector3 attachArray="vertices" args={[0, 0, 0]}></vector3>
            <vector3 attachArray="vertices" args={[1, 0, 0]}></vector3>
            <vector3 attachArray="vertices" args={[1, 1, 0]}></vector3>
            <vector3 attachArray="vertices" args={[1, 0, 1]}></vector3>
            <face3 attachArray="faces" args={[0, 1, 2]}></face3>
          </geometry>
          <meshBasicMaterial attach="material" color="#50E3C1" toneMapped={false} transparent opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[7, -5, 10]} intensity={1} angle={0.3} penumbra={1} />
      <pointLight position={[1, -1, -5]} intensity={0.5} />
    </>
  );
};
