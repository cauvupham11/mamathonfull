import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

import throttle from "lodash.throttle";
import { createCity } from "../features/city.js";
import { createCamera } from "../features/camera.js";
import { createGame } from "../features/game.js";
import { setUpLights } from "../features/setLights.js";
import MainBoundary from "../components/MainBoundary.jsx";

const HomePage = () => {
  const mountRef = useRef(null);

  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const frameIdRef = useRef(null);
  const cityRef = useRef(null);
  const gameRef = useRef(null);

  const handleResize = useCallback(
    throttle(() => {
      if (rendererRef.current && cameraRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    }, 100),
    []
  );

  const preventContextMenu = useCallback((event) => event.preventDefault(), []);

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const { camera, handleMouseDown, handleMouseUp, handleMouseMove } =
      createCamera();
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const city = createCity(16);
    city.initialize(scene);
    console.log("City initialized:", city);
    cityRef.current = city;

    setUpLights(scene);

    const game = createGame(scene);
    console.log("Game initialized:", game);
    gameRef.current = game.game;

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      if (gameRef.current) {
        gameRef.current.update();
      } else {
        console.warn("gameRef.current is undefined");
      }
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleMouseDown, false);
    window.addEventListener("mouseup", handleMouseUp, false);
    window.addEventListener("mousemove", handleMouseMove, false);
    window.addEventListener("contextmenu", preventContextMenu, false);

    return () => {
      cancelAnimationFrame(frameIdRef.current);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleMouseDown, false);
      window.removeEventListener("mouseup", handleMouseUp, false);
      window.removeEventListener("mousemove", handleMouseMove, false);
      window.removeEventListener("contextmenu", preventContextMenu, false);

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (!object.isMesh) return;

          if (object.geometry) {
            object.geometry.dispose();
          }

          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => {
                disposeMaterial(material);
              });
            } else {
              disposeMaterial(object.material);
            }
          }
        });
      }

      if (cityRef.current) {
        cityRef.current = null;
      }

      if (gameRef.current) {
        gameRef.current = null;
      }
    };
  }, [handleResize, preventContextMenu]);

  const disposeMaterial = (material) => {
    material.dispose();

    for (const key in material) {
      const value = material[key];
      if (value && typeof value.dispose === "function") {
        value.dispose();
      }
    }
  };

  return <div ref={mountRef}></div>;
};

export default HomePage;