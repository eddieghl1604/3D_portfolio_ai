import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Text3D } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CryptoSphere({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color="#00D9FF"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function CryptoRing({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 16, 100]} />
        <meshStandardMaterial color="#C026D3" metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}

function CryptoSymbol({ position, symbol }: { position: [number, number, number]; symbol: string }) {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh position={position}>
        <ringGeometry args={[0.3, 0.4, 32]} />
        <meshStandardMaterial color="#FF0080" metalness={0.8} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function CyberpunkBuilding({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 2, 0.5]} />
      <meshStandardMaterial
        color="#00D9FF"
        emissive="#00D9FF"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function FloatingDrone({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[0.2, 0.05, 0.2]} />
        <meshStandardMaterial color="#C026D3" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.15, 0, 0.15]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial color="#00FF64" emissive="#00FF64" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function BlockchainGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[25, 25, 25, 25]} />
      <meshStandardMaterial
        color="#00D9FF"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C026D3" />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#FF0080" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#00FF64" angle={0.3} />
        
        {/* Crypto elements */}
        <CryptoSphere position={[-2.5, 1, -2]} />
        <CryptoSphere position={[2.5, 0.5, -1]} />
        <CryptoRing position={[0, -0.5, -3]} />
        <CryptoRing position={[3, 1.5, 0]} />
        
        {/* Crypto symbols */}
        <CryptoSymbol position={[-3, 2, 1]} symbol="BTC" />
        <CryptoSymbol position={[3, 1, 2]} symbol="ETH" />
        <CryptoSymbol position={[0, 2.5, 0]} symbol="SOL" />
        
        {/* Cyberpunk city */}
        <CyberpunkBuilding position={[-4, -1, -5]} />
        <CyberpunkBuilding position={[-3, -1, -6]} />
        <CyberpunkBuilding position={[3, -1, -5]} />
        <CyberpunkBuilding position={[4, -1, -6]} />
        <CyberpunkBuilding position={[0, -1, -7]} />
        
        {/* Flying drones */}
        <FloatingDrone position={[-2, 2, 2]} />
        <FloatingDrone position={[2, 3, 1]} />
        <FloatingDrone position={[0, 2.5, 3]} />
        
        <BlockchainGrid />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
