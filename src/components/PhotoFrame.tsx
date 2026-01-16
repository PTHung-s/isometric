import { useRef, useState, useEffect } from "react";
import { useTexture, Text, Decal } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

interface PhotoFrameProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
  url: string;
  caption: string;
}

export const PhotoFrame = ({ position, rotation, scale = [0.8, 0.6, 0.05], url, caption }: PhotoFrameProps) => {
  const [hovered, setHovered] = useState(false);
  const { camera, controls } = useThree();
  
  const texture = useTexture(url, (tex) => {
    // @ts-ignore
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    
    // Dispatch event to show photo in a full-screen modal instead of moving camera
    window.dispatchEvent(new CustomEvent("open-photo", { 
      detail: { 
        url, 
        caption 
      } 
    }));
  };

  return (
    <group 
      position={position} 
      rotation={rotation} 
      onClick={handleClick} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      {/* Khung tranh (Phần gỗ/vàng) */}
      <mesh>
        <boxGeometry args={[scale[0] + 0.1, scale[1] + 0.1, 0.02]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      
      {/* Bức ảnh (Nằm hơi nhô ra khỏi khung) */}
      <mesh position={[0, 0, 0.015]}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      
      {/* Indicator Text */}
      {hovered && (
        <Text
          position={[0, -0.5, 0.1]}
          fontSize={0.08}
          color="white"
        >
          Click to Zoom
        </Text>
      )}
    </group>
  );
};
