import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Canvas, useFrame } from '@react-three/fiber';

export default function BoxComp() {
    return (
        <Canvas style={{backgroundColor:'gray', height: '200vh'}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[0, 0, -5]}/>
            {/* <Box position={[5.2, 0, 0]} /> */}
        </Canvas>
    )
}



function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [position, setPosition] = useState([0,0,1])
    // Rotate mesh every frame, this is outside of React without overhead

    // useFrame(() => {
    //     // mesh.current.rotation.x += 0.03
    //     mesh.current.rotation.y += 0.03
    //     // mesh.current.position[3] += 1;
    // })

    function animate(isScrollUp) {

        let newPosition = [...position];

        if(isScrollUp){
            mesh.current.rotation.x += 0.01;
            mesh.current.rotation.y += 0.01;
            mesh.current.rotation.z += 0.01;
    
            newPosition[0] += 0.01;
            newPosition[2] += 0.01;
            newPosition[3] += 0.01;
        }else{
            mesh.current.rotation.x -= 0.01;
            mesh.current.rotation.y -= 0.01;
            mesh.current.rotation.z -= 0.01;
    
            newPosition[0] -= 0.01;
            newPosition[2] -= 0.01;
            newPosition[3] -= 0.01;
        }
        
        setPosition([...newPosition])
        // renderer.render( scene, camera );
    }

    // document.body.onscroll = () => { 
    //     animate()
    //     console.log(document.body.offsetTop)
    //   }

    function onClickFun(){
        setPosition([2,3,-10]);
     }



     React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    let lastScrollY = 0;

    function handleScroll(e) {
        if (window.scrollY > lastScrollY) {
            //console.log("scrolling Down")
            animate(false);
        } else {
            //console.log("scrolling Up")
            animate(true);
        }
        lastScrollY = window.scrollY > 0 ? window.scrollY : 0;
    }
  
    return (
      <mesh
        position={[...position]}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => onClickFun()}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }