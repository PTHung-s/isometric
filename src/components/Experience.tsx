import { OrbitControls, OrthographicCamera, PerspectiveCamera, PointerLockControls, Sky, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Room } from "./Room";
import gsap from "gsap";
import * as THREE from "three";

// Component cho một lá cỏ đơn (có hình dạng thật)
const GrassBlade = ({ height, bend, rotation, color }: any) => {
  const points = [];
  const segments = 8;
  
  // Tạo hình dạng lá cỏ cong từ gốc đến ngọn (hẹp dần và cong)
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const width = 0.02 * (1 - t * 0.8); // Hẹp dần về ngọn
    const x = Math.sin(t * Math.PI * bend) * t * 0.1; // Độ cong
    const y = t * height;
    
    points.push(new THREE.Vector3(x - width, y, 0));
    points.push(new THREE.Vector3(x + width, y, 0));
  }
  
  return (
    <mesh rotation={[0, rotation, 0]}>
      <planeGeometry args={[0.04, height, 1, segments]} />
      <meshStandardMaterial 
        color={color}
        side={THREE.DoubleSide}
        roughness={0.8}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
};

// Bụi cỏ gồm nhiều lá cỏ
const GrassPatch = ({ position, density = 12 }: any) => {
  const blades = [];
  
  for (let i = 0; i < density; i++) {
    const angle = (i / density) * Math.PI * 2 + Math.random() * 0.5;
    const distance = Math.random() * 0.15;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    const height = 0.3 + Math.random() * 0.25;
    const bend = 0.3 + Math.random() * 0.4;
    const rotation = Math.random() * Math.PI * 2;
    const greenShade = ["#4caf50", "#66bb6a", "#2e7d32", "#43a047"][Math.floor(Math.random() * 4)];
    
    blades.push(
      <group key={i} position={[x, 0, z]} rotation={[Math.random() * 0.2, 0, Math.random() * 0.2]}>
        <GrassBlade height={height} bend={bend} rotation={rotation} color={greenShade} />
      </group>
    );
  }
  
  return <group position={position}>{blades}</group>;
};

const Garden = () => {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Nền đất nâu dưới cỏ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[102, 102]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>

      {/* Cỏ xanh rộng lớn với màu sắc tự nhiên hơn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2e5a27" roughness={0.9} />
      </mesh>
      
      {/* Vườn hoa (Thiết kế lại thành từng cụm hoa nghệ thuật) */}
      {Array.from({ length: 40 }).map((_, i) => {
        const clusterX = (Math.random() - 0.5) * 60;
        const clusterZ = (Math.random() - 0.5) * 60;
        if (Math.abs(clusterX) < 6 && Math.abs(clusterZ) < 6) return null;
        
        const color = ["#ff4081", "#ffeb3b", "#7c4dff", "#00e5ff", "#ffffff"][Math.floor(Math.random() * 5)];
        
        return (
          <group key={`cluster-${i}`} position={[clusterX, 0, clusterZ]}>
            {/* Mỗi cụm gồm nhiều bông hoa chụm lại */}
            {Array.from({ length: 5 }).map((_, j) => (
              <group key={j} position={[(Math.random()-0.5)*0.5, 0, (Math.random()-0.5)*0.5]} rotation={[0, Math.random()*Math.PI, 0]}>
                <mesh position={[0, 0.2, 0]}>
                  <cylinderGeometry args={[0.005, 0.01, 0.4]} />
                  <meshStandardMaterial color="#1b5e20" />
                </mesh>
                <mesh position={[0, 0.45, 0]} rotation={[Math.PI/4, 0, 0]}>
                  <sphereGeometry args={[0.08, 4, 12]} />
                  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
                </mesh>
              </group>
            ))}
          </group>
        );
      })}

      {/* Bụi cỏ thật với từng lá cỏ chi tiết */}
      {Array.from({ length: 200 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 70;
        const z = (Math.random() - 0.5) * 70;
        if (Math.abs(x) < 5 && Math.abs(z) < 5) return null;

        return (
          <GrassPatch 
            key={`patch-${i}`} 
            position={[x, 0, z]} 
            density={8 + Math.floor(Math.random() * 6)}
          />
        );
      })}
    </group>
  );
};

export const Experience = () => {
  const { camera, controls } = useThree();
  const [isWalking, setIsWalking] = useState(true);
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    // Kích hoạt Walk Mode ngay khi load
    const timer = setTimeout(() => {
      camera.position.set(0, 1.6, 5);
      camera.lookAt(0, 1.6, 0);
    }, 100);

    const handleReset = () => {
      setIsWalking(false);
      gsap.to(camera, {
        zoom: 120,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix()
      });

      if (controls) {
        // @ts-ignore
        gsap.to(controls.target, {
          x: 0, y: 0, z: 0,
          duration: 1.5,
          ease: "power2.inOut"
        });
      }

      gsap.to(camera.position, {
        x: 10, y: 10, z: 10,
        duration: 1.5,
        ease: "power2.inOut"
      });
    };

    const handleToggleWalk = (e: any) => {
      setIsWalking(e.detail);
      if (e.detail) {
        // Đứng ở lối vào phòng
        camera.position.set(0, 1.6, 5);
        camera.lookAt(0, 1.6, 0);
      }
    };

    window.addEventListener("reset-camera", handleReset);
    window.addEventListener("toggle-walk", handleToggleWalk);

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": setMovement(prev => ({ ...prev, forward: true })); break;
        case "KeyS": setMovement(prev => ({ ...prev, backward: true })); break;
        case "KeyA": setMovement(prev => ({ ...prev, left: true })); break;
        case "KeyD": setMovement(prev => ({ ...prev, right: true })); break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyW": setMovement(prev => ({ ...prev, forward: false })); break;
        case "KeyS": setMovement(prev => ({ ...prev, backward: false })); break;
        case "KeyA": setMovement(prev => ({ ...prev, left: false })); break;
        case "KeyD": setMovement(prev => ({ ...prev, right: false })); break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("reset-camera", handleReset);
      window.removeEventListener("toggle-walk", handleToggleWalk);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [camera, controls]);

  useFrame((state, delta) => {
    if (!isWalking) return;

    const speed = 5; 
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, (movement.backward ? 1 : 0) - (movement.forward ? 1 : 0));
    const sideVector = new THREE.Vector3((movement.left ? 1 : 0) - (movement.right ? 1 : 0), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed * delta)
      .applyQuaternion(camera.quaternion);

    camera.position.add(new THREE.Vector3(direction.x, 0, direction.z));
  });

  return (
    <>
      <Sky sunPosition={[100, 10, 100]} distance={450000} sunPosition={[1, 0.1, 1]} inclination={0} azimuth={0.25} />
      <Environment preset="park" />
      
      <group>
        <Suspense fallback={null}>
          <Room />
          <Garden />
        </Suspense>
      </group>

      {isWalking ? (
        <>
          <PerspectiveCamera makeDefault position={[0, 1.6, 5]} fov={75} />
          <PointerLockControls />
        </>
      ) : (
        <>
          <OrthographicCamera
            makeDefault
            position={[10, 10, 10]}
            zoom={120}
            near={0.1}
            far={1000}
          />
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05}
            minZoom={50}
            maxZoom={400}
            makeDefault
          />
        </>
      )}
      
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#fffcf0" />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />
    </>
  );
};
