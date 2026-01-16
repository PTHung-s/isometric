import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { Loader } from "@react-three/drei";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#87ceeb", overflow: "hidden" }}>
      <Canvas
        shadows
        orthographic
        gl={{ antialias: true, alpha: true }}
      >
        <Experience />
      </Canvas>
      <Overlay />
      <Loader />
    </div>
  );
}

export default App;
