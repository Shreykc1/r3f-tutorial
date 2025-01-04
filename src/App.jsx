import { Canvas,useFrame,  } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { MeshDistortMaterial, MeshWobbleMaterial, OrbitControls } from '@react-three/drei'
import './App.css'
import NPC from './Npc'

const Cube = ({position, color, size}) => {
    const ref = useRef();
    useFrame((state, delta) => {
        // ref.current.position.x += delta;
        ref.current.rotation.y += delta;
    })

    return (
        <mesh position={position} ref={ref}>
            <boxGeometry args={size}/>
            <meshStandardMaterial color={color}/>
        </mesh>
    )
}

const Sphere = ({position, args}) => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();
    // useFrame((state, delta) => {
    //     ref.current.rotation.y += delta * hovered ? 0.4 : 0.2
    // })

    return (
        <mesh position={position} ref={ref} onPointerOver={(event) => (event.stopPropagation(), setHovered(true))} onPointerOut={(event) => (event.stopPropagation(), setHovered(false))}>
            <sphereGeometry args={args}/>
            <meshStandardMaterial color={hovered ? 'lightblue' : 'orange'} wireframe/>
        </mesh>
    )
}

const Torus = ({position, color, args}) => {

    return (
        <mesh position={position}>
            <torusGeometry args={args}/>
            <MeshWobbleMaterial color={color}/>
        </mesh>
    )
}


const App = () => {
  return (
     <Canvas>
        <directionalLight position={[1, -1, 2]} intensity={2}/>
        <ambientLight intensity={1}/>
        <NPC position={[0, 1, 0]} size={[1, 1, 1]} />

        {/* <group position={[0, -1, 0]}>
            <Cube position={[0, 1, 1]} color='orange' size={[1, 1, 1]}/>
        </group> */}

        {/* <Cube position={[0, 0, 0]} color='orange' size={[1, 1, 1]}/> */}
        {/* <Sphere position={[0, 0, 0]}  args={[1, 30, 30]}/> */}
        {/* <Torus position={[0, 0, 0]} color='orange' args={[2, 0.2, 10, 100]}/> */}


        {/* <OrbitControls enableZoom={false}/> */}
    </Canvas>
  )
}

export default App
