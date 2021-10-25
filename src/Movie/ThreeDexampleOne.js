import React, { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import anime from '../blender.glb'


function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing() {
  const group = useRef();
  const { nodes, materials } = useLoader(GLTFLoader, anime);
  // useFrame will run outside of react in animation frames to optimize updates.  useFrame(() => {    group.current.rotation.y += 0.004;  });  
  return (
    // Add a ref to the group. This gives us a hook to manipulate the properties of this geometry in the useFrame callback.
    <group ref={group}>
      <mesh visible geometry={nodes.Cylinder.geometry} material={materials.glass} material-color={"#ff0000"}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
       </mesh>

       <mesh visible geometry={nodes.blender.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
       </mesh>

    

       <mesh visible geometry={nodes.cover_main.geometry}>
        {/* <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        /> */}
       </mesh>

       <mesh visible geometry={nodes.cover_top.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
       </mesh>

       <mesh visible geometry={nodes.handle_main.geometry}>
        {/* <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        /> */}
       </mesh>

       <mesh visible geometry={nodes.Cone.geometry}>
        {/* <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        /> */}
       </mesh>
       
    </group>
  );
}

/* <mesh visible geometry={nodes.Cylinder.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh> */

export default function ThreeJsSecondExample() {
  return (
    <Canvas style={{ backgroundColor: "white", height:'50vh'}}>
      <directionalLight intensity={0.5} />
      {/* <Loading/> */}
      <Suspense fallback={<Loading />}>
        <ArWing />
        <Environment preset="city" />
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
      </Suspense>
      <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
    </Canvas>
  );
}