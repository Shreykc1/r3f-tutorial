import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

const NPC = ({ position, size }) => {
  const ref = useRef();
  const { viewport } = useThree();


  const directionRef = useRef(Math.random() * Math.PI * 2);
  const stateRef = useRef('patrolling');
  const timeSinceLastChangeRef = useRef(0);
  const speedRef = useRef(0.05);

  useFrame((state, delta) => {
    timeSinceLastChangeRef.current += delta;
    if (timeSinceLastChangeRef.current > 3) {
      if (stateRef.current === 'idle') {
        stateRef.current = 'patrolling';
      } else {
        stateRef.current = 'idle';
      }
      timeSinceLastChangeRef.current = 0;
    }


    if (stateRef.current === 'patrolling') {
      // Move the NPC
      ref.current.position.x += Math.cos(directionRef.current) * speedRef.current;
      ref.current.position.z += Math.sin(directionRef.current) * speedRef.current;

      // Keep the NPC within bounds
      const bounds = viewport.width / 2; // Constrain NPC within viewport width
      if (ref.current.position.x > bounds || ref.current.position.x < -bounds) {
        directionRef.current = Math.random() * Math.PI * 2; // Change direction randomly if out of bounds
      }

      const boundsZ = viewport.height / 2; // Constrain NPC within viewport height
      if (ref.current.position.z > boundsZ || ref.current.position.z < -boundsZ) {
        directionRef.current = Math.random() * Math.PI * 2; // Change direction randomly if out of bounds
      }
    }

    // Rotation behavior
    ref.current.rotation.y += 0.01; // Rotate NPC slowly
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

export default NPC;
