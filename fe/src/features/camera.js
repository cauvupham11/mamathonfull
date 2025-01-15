import * as THREE from 'three';

export const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 20); // Đặt camera xa hơn
    camera.lookAt(0, 0, 0);

    let isLeftMouseDown = false;

    const handleMouseDown = (event) => {
        if (event.button === 0) {
            isLeftMouseDown = true;
        }
    };

    const handleMouseUp = (event) => {
        if (event.button === 0) {
            isLeftMouseDown = false;
        }
    };

    const handleMouseMove = (event) => {
        if (isLeftMouseDown) {
            camera.rotation.y += event.movementX * 0.005;
            camera.rotation.x += event.movementY * 0.005;
        }
    };

    return {
        camera,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    };
};
