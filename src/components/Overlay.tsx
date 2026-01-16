import { useEffect, useState } from "react";

export const Overlay = () => {
  const [caption, setCaption] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [activePhoto, setActivePhoto] = useState<null | {url: string, caption: string}>(null);

  useEffect(() => {
    const handleCaption = (e: any) => {
      setCaption(e.detail.caption);
    };
    const handleOpenPhoto = (e: any) => {
      setActivePhoto(e.detail);
    };

    window.addEventListener("show-caption", handleCaption);
    window.addEventListener("open-photo", handleOpenPhoto);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhoto(null);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("show-caption", handleCaption);
      window.removeEventListener("open-photo", handleOpenPhoto);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const resetCamera = () => {
    window.dispatchEvent(new CustomEvent("reset-camera"));
    setCaption("");
    setIsWalking(false);
  };

  const toggleWalk = () => {
    const nextState = !isWalking;
    setIsWalking(nextState);
    window.dispatchEvent(new CustomEvent("toggle-walk", { detail: nextState }));
  };

  return (
    <div className="ui-overlay">
      <div className="header">
        <h1>My Memory Room</h1>
        <p>{isWalking ? "WASD to Move" : "Welcome to the world of memories ✨"}</p>
      </div>

      {caption && (
        <div className="caption-card">
          <p>{caption}</p>
          <button onClick={() => setCaption("")}>Close</button>
        </div>
      )}

      {activePhoto && (
        <div className="photo-modal" onClick={() => setActivePhoto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img src={activePhoto.url} alt="Memory" />
            <div className="modal-caption">{activePhoto.caption}</div>
            <button className="close-btn" onClick={() => setActivePhoto(null)}>ESC</button>
          </div>
        </div>
      )}

      <div className="controls-panel">
        <button onClick={resetCamera}>Reset View</button>
        <button onClick={toggleWalk} style={{ background: isWalking ? "#ffeb3b" : "rgba(255,255,255,0.1)", color: isWalking ? "black" : "white" }}>
          {isWalking ? "Exit Walk Mode" : "🚶 Walk Mode"}
        </button>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "🔇 Mute" : "🔊 Music"}
        </button>
      </div>

      <style>{`
        .ui-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
          box-sizing: border-box;
          z-index: 10;
        }
        .ui-overlay > * { pointer-events: auto; }
        .header { text-align: center; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
        .header h1 { margin: 0; font-size: 2rem; color: #ffeb3b; }
        .caption-card {
          position: absolute;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #ffeb3b;
          text-align: center;
          min-width: 200px;
          animation: fadeIn 0.5s ease-out;
        }
        .controls-panel {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid white;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          backdrop-filter: blur(5px);
          transition: 0.3s;
        }
        button:hover { background: white; color: black; }
        .photo-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
          animation: fadeIn 0.3s ease-out;
        }
        .modal-content {
          position: relative;
          max-width: 80%;
          max-height: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
          padding: 10px;
          border-radius: 4px;
          box-shadow: 0 0 30px rgba(255, 235, 59, 0.3);
        }
        .modal-content img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border: 2px solid #333;
        }
        .modal-caption {
          color: #333;
          margin-top: 15px;
          font-size: 1.2rem;
          font-weight: bold;
          text-align: center;
        }
        .close-btn {
          position: absolute;
          top: -20px;
          right: -20px;
          padding: 5px 15px;
          border-radius: 20px;
          background: #ffeb3b;
          color: black;
          font-size: 14px;
          font-weight: bold;
          border: 2px solid #000;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Courier New', Courier, monospace;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, 20px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
    </div>
  );
};
