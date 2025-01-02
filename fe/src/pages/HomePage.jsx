import * as THREE from 'three';
import {useEffect} from 'react';
import { createCamera } from '../features/camera.js';
import { createGame } from '../features/game.js';

const HomePage = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const { camera, handleMouseDown, handleMouseUp, handleMouseMove } = createCamera();
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createGame(scene);
    const setUpLights = (scene) => {
        let lights = [
            new THREE.AmbientLight(0xffffff, 4.2),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3)
        ];
    
        // ánh sáng từ trên xuống theo trục y 
        lights[1].position.set(0, 1, 0);
        // ánh sáng từ góc trên - phải
        lights[2].position.set(1, 1, 0);
        // ánh sáng từ góc trên - trước
        lights[3].position.set(0, 1, 1);
    
        // dùng phương thức addLightsToScene để thêm tất cả ánh sáng cùng lúc
        scene.add(...lights);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('mousedown', handleMouseDown, false);
    window.addEventListener('mouseup', handleMouseUp, false);
    window.addEventListener('mousemove', handleMouseMove, false);
    window.addEventListener('contextmenu', (event) => event.preventDefault(), false);
  }, []);

  return null;
};

export default HomePage;