import { Canvas,useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import './App.css'


const Cube = ({position, color, size}) => {
    const ref = useRef();
    useFrame((state, delta) => {
        ref.current.rotation.x += delta;
        ref.current.rotation.y += delta;
        ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2.0;
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
    useFrame((state, delta) => {
        ref.current.rotation.y += delta * hovered ? 0.4 : 0.2
    })

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
            <meshStandardMaterial color={color}/>
        </mesh>
    )
}


const App = () => {
  return (
     <Canvas>
        <directionalLight position={[1, -1, 2]} intensity={2}/>
        <ambientLight intensity={1}/>


        {/* <group position={[0, -1, 0]}>
            <Cube position={[-2, 1, 2]} color='orange' size={[1, 1, 1]}/>
            <Cube position={[2, 1, 2]} color='purple' size={[1, 1, 1]}/>
        </group> */}

        {/* <Cube position={[0, 0, 0]} color='orange' size={[1, 1, 1]}/> */}
        <Sphere position={[0, 0, 0]}  args={[1, 30, 30]}/>
        {/* <Torus position={[0, 0, 0]} color='purple' args={[1, 0.5, 100, 100]}/> */}

    </Canvas>
  )
}

export default App
