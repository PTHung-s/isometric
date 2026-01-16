import { useGLTF, Decal, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { PhotoFrame } from "./PhotoFrame";

export const Room = () => {
  // Path to the downloaded model
  const { scene } = useGLTF("/models/low_poly_isometric_room.glb");
  
  const photoData = [
    {
      id: 1,
      position: [-4.24, 1.79, 1.29], 
      rotation: [0, Math.PI / 2, 0],
      url: "https://picsum.photos/id/237/800/600",
      localUrl: "/photos/photo1.jpg",
      caption: "Quân sự...✨"
    },
    {
      id: 2,
      position: [2.51, 2.49, -4.20], 
      rotation: [0, 0, 0],
      url: "https://picsum.photos/id/1011/800/600",
      localUrl: "/photos/photo2.jpg",
      caption: "Quá là ngầu luôn"
    },
    {
      id: 3,
      position: [-1.8, 3.2, -4.20], 
      rotation: [0, 0, 0],
      url: "https://picsum.photos/id/1025/800/600",
      localUrl: "/photos/photo3.jpg",
      caption: "Ờm... cái gì đây...."
    },
    {
      id: 4,
      position: [-4.24, 2.8, -1.5], 
      rotation: [0, Math.PI / 2, 0],
      url: "https://picsum.photos/id/1041/800/600",
      localUrl: "/photos/photo4.jpg",
      caption: "Wéo weo wèo, nhất bạn luôn :))))"
    },
    {
      id: 5,
      position: [0.5, 3.5, -4.20], 
      rotation: [0, 0, 0],
      url: "https://picsum.photos/id/1050/800/600",
      localUrl: "/photos/photo5.jpg",
      caption: "Chụp đẹp ghê luôn. Vivox200 ultra"
    },
    {
      id: 6,
      position: [-4.24, 1.8, -2.8], 
      rotation: [0, Math.PI / 2, 0],
      url: "https://picsum.photos/id/1062/800/600",
      localUrl: "/photos/photo6.jpg",
      caption: "Chúc hết chảy máu mũi =))"
    },
    {
      id: 7,
      position: [3.2, 2.0, -4.20], 
      rotation: [0, 0, 0],
      url: "https://picsum.photos/id/1074/800/600",
      localUrl: "/photos/photo7.jpg",
      caption: "Quá tuyệt"
    },
    {
      id: 8,
      position: [-4.24, 3.5, 0], 
      rotation: [0, Math.PI / 2, 0],
      url: "https://picsum.photos/id/1084/800/600",
      localUrl: "/photos/photo8.jpg",
      caption: "Quá ghê, kiếm hết hình rồi =))"
    }
  ];

  return (
    <group>
      <primitive object={scene} />
      
      {photoData.map((photo) => (
        <PhotoFrame key={photo.id} {...photo} url={photo.localUrl || photo.url} />
      ))}
    </group>
  );
};

// Preload the model
useGLTF.preload("/models/low_poly_isometric_room.glb");
