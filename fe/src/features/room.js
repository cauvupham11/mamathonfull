// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { createCamera } from './camera';

// export const loadGLBModel = (containerId) => {
//     const cameraData = createCamera();
//     if (!cameraData || !cameraData.camera) {
//         console.error('Camera is not valid!');
//         return;
//     }
//     const { camera, handleMouseDown, handleMouseUp, handleMouseMove } = cameraData;

//     const scene = new THREE.Scene();
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 1);
//     renderer.shadowMap.enabled = true;
//     document.getElementById(containerId).appendChild(renderer.domElement);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//     directionalLight.position.set(10, 20, 10);
//     directionalLight.castShadow = true;
//     scene.add(directionalLight);

//     const loader = new GLTFLoader();

//     // Tải mô hình phòng
//     loader.load(
//         '/interface/room.glb',
//         (gltf) => {
//             gltf.scene.scale.set(10, 10, 10);
//             gltf.scene.position.set(0, 0, 0);
//             gltf.scene.receiveShadow = true;
//             scene.add(gltf.scene);
//         },
//         undefined,
//         (error) => console.error('Error loading room:', error)
//     );

//     // Tải mô hình rương
//     loader.load(
//         '/interface/chest.glb',
//         (gltf) => {
//             gltf.scene.traverse((child) => {
//                 if (child.isMesh) {
//                     child.position.set(0, 0, 0); // Reset vị trí các đối tượng con
//                 }
//             });

//             gltf.scene.scale.set(1.5, 1.5, 1.5);
//             gltf.scene.position.set(2, 0.5, -3); // Đặt vị trí rương
//             console.log('Final Chest Position:', gltf.scene.position); // Log vị trí
//             scene.add(gltf.scene);
//         },
//         undefined,
//         (error) => console.error('Error loading chest:', error)
//     );

//     const animate = () => {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//         const width = window.innerWidth;
//         const height = window.innerHeight;
//         renderer.setSize(width, height);
//         camera.aspect = width / height;
//         camera.updateProjectionMatrix();
//     };
//     window.addEventListener('resize', handleResize);

//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//         window.removeEventListener('resize', handleResize);
//         window.removeEventListener('mousedown', handleMouseDown);
//         window.removeEventListener('mouseup', handleMouseUp);
//         window.removeEventListener('mousemove', handleMouseMove);
//     };
// };
