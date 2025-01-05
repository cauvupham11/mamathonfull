import * as THREE from 'three';

export const createCamera = () => {
    const DEG_DIVIED_RAD = Math.PI / 180;

    const MIN_CAMERA_RADIUS = 10;
    const MAX_CAMERA_RADIUS = 20;

    const MIN_CAMERA_ELEVATION = 30;
    const MAX_CAMERA_ELEVATION = 90;

    const ROTATION_SENS = 0.5;
    const ZOOM_SENS = 0.02;
    const PAN_SENS = -0.01;

    const Y_AXIS = new THREE.Vector3(0, 1, 0);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const LEFT_MOUSE_BUTTON = 0;
    const RIGHT_MOUSE_BUTTON = 2;
    const MIDDLE_MOUSE_BUTTON = 1;

    let isLeftMouseDown = false;
    let isRightMouseDown = false;
    let isMiddleMouseDown = false;

    let prevMouseX = 0;
    let prevMouseY = 0;

    let cameraOg = new THREE.Vector3();
    let cameraAzimuth = 135;
    let cameraElevation = 45; // đơn vị : độ
    let cameraRadius = (MIN_CAMERA_RADIUS + MAX_CAMERA_RADIUS) / 2;
    
    const handleMouseDown = (event) => {
        if (event.button === LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = true;
        }
        if (event.button === MIDDLE_MOUSE_BUTTON) {
            isMiddleMouseDown = true;
        }
        if (event.button === RIGHT_MOUSE_BUTTON) {
            isRightMouseDown = true;
        }
    };

    const handleMouseUp = (event) => {
        if (event.button === LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = false;
        }
        if (event.button === MIDDLE_MOUSE_BUTTON) {
            isMiddleMouseDown = false;
        }
        if (event.button === RIGHT_MOUSE_BUTTON) {
            isRightMouseDown = false;
        }
    };

    const handleMouseMove = (event) => {
        const deltaX = event.clientX - prevMouseX;
        const deltaY = event.clientY - prevMouseY;

        // xử lý di chuyển camera
        if (isLeftMouseDown) {
        cameraAzimuth += -(deltaX * ROTATION_SENS);
        cameraElevation += (deltaY * ROTATION_SENS);
        cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
        updateCameraPosition();
        }
        
        // xử lý panning camera
        if (isMiddleMouseDown) {
            const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG_DIVIED_RAD);
            const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG_DIVIED_RAD);
            cameraOg.add(forward.multiplyScalar(PAN_SENS * deltaY));
            cameraOg.add(left.multiplyScalar(PAN_SENS * deltaX));
            updateCameraPosition();
        }

        // xử lý zoom camera
        if (isRightMouseDown) {
            cameraRadius += deltaY * ZOOM_SENS;
            cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));
            updateCameraPosition();
        }

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    };

    const updateCameraPosition = () => {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG_DIVIED_RAD) * Math.cos(cameraElevation * DEG_DIVIED_RAD);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG_DIVIED_RAD);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG_DIVIED_RAD) * Math.cos(cameraElevation * DEG_DIVIED_RAD);
        camera.position.add(cameraOg);
        camera.lookAt(cameraOg);
        camera.updateMatrix();
    };      

    return {
        camera,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove
    };
};

