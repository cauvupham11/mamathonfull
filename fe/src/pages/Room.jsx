import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Component RoomModel
const RoomModel = () => {
  const { scene } = useGLTF('/interface/room.glb');

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set('#FFB6C1'); // Màu hồng nhạt
      }
    });

    // Điều chỉnh scale và position để phủ toàn màn hình
    scene.scale.set(50, 100, 50); // Tăng kích thước đáng kể
    scene.position.set(0, 40, 0); // Đặt vị trí trung tâm
  }, [scene]);

  return <primitive object={scene} />;
};
// Component ChestModel
const ChestModel = () => {
  const { scene } = useGLTF('/interface/chest.glb');

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); // Clone material
        child.material.emissive = new THREE.Color(0x000000); // Ban đầu không phát sáng
        child.material.emissiveIntensity = 0;
      }
    });
  }, [scene]);

  const handlePointerOver = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0xffff00); // Sáng viền khi hover
        child.material.emissiveIntensity = 0.05; // Đặt độ sáng thấp hơn
      }
    });
  };

  const handlePointerOut = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0x000000); // Tắt sáng khi rời chuột
        child.material.emissiveIntensity = 0;
      }
    });
  };
  return (
    <group onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <primitive object={scene} position={[-38, -10, -35]} scale={[8, 8, 8]} />
    </group>
  );
};
const SleepModel = () => {
  const { scene } = useGLTF('/interface/Sleep.glb');

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); // Clone material
        child.material.emissive = new THREE.Color(0x000000); // Ban đầu không phát sáng
        child.material.emissiveIntensity = 0;
      }
    });
    scene.rotation.y = Math.PI / 2; // Xoay 90 độ quanh trục Y
  }, [scene]);

  const handlePointerOver = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0xffff00); // Sáng viền khi hover
        child.material.emissiveIntensity = 0.05;
      }
    });
  };
  const handlePointerOut = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0x000000); // Tắt sáng khi rời chuột
        child.material.emissiveIntensity = 0;
      }
    });
  };
  return (
    <group onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <primitive object={scene} scale={[10, 10, 10]} position={[-38, -8, 3]} />
    </group>
  );
};
const BathModel = () => {
  const { scene } = useGLTF('/interface/bath.glb');
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); // Clone material
        child.material.emissive = new THREE.Color(0x000000); // Ban đầu không phát sáng
        child.material.emissiveIntensity = 0;
      }
    });
  }, [scene]);
  const handlePointerOver = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0xffff00); // Sáng viền khi hover
        child.material.emissiveIntensity = 0.05;
      }
    });
  };
  const handlePointerOut = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0x000000); // Tắt sáng khi rời chuột
        child.material.emissiveIntensity = 0;
      }
    });
  };

  return (
    <group onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <primitive object={scene} scale={[10, 10, 10]} position={[-5, -13, -33]} />
    </group>
  );
};
const PetModel = ({ targetPosition, isVisible, setShowPet }) => {
  const { scene, animations } = useGLTF('/interface/mousepet.glb');
  const { actions } = useAnimations(animations, scene);

  const position = useRef(new THREE.Vector3(-4, -13, 4)); // Vị trí ban đầu của pet
  const intermediateTarget = useRef(null); // Lưu vị trí mục tiêu trung gian
  const isMoving = useRef(false); // Trạng thái di chuyển
  const threshold = 2; // Ngưỡng để dừng chính xác
  const maxSpeed = 0.1; // Tốc độ tối đa

  useMemo(() => {
    scene.rotation.y = Math.PI; // Quay đúng hướng pet
  }, [scene]);

  useFrame(() => {
    if (!isVisible) return;

    // Nếu có vị trí mục tiêu, cập nhật intermediateTarget
    if (targetPosition && !intermediateTarget.current) {
      intermediateTarget.current = targetPosition.clone();
    }

    // Nếu không có intermediateTarget, không làm gì
    if (!intermediateTarget.current) return;

    const distance = position.current.distanceTo(intermediateTarget.current);

    if (distance > threshold) {
      // Tính toán bước di chuyển
      const step = Math.min(distance, maxSpeed);
      const direction = new THREE.Vector3()
        .subVectors(intermediateTarget.current, position.current)
        .normalize();

      position.current.add(direction.multiplyScalar(step));

      // Cập nhật góc quay
      const angle = Math.atan2(direction.x, direction.z);
      scene.rotation.y = angle;

      // Bắt đầu animation di chuyển
      if (!isMoving.current) {
        actions[Object.keys(actions)[0]]?.fadeIn(0.2).play();
        isMoving.current = true;
      }
    } else {
      // Đến intermediateTarget -> Dừng tại đó và cập nhật vị trí mới
      position.current.copy(intermediateTarget.current);
      intermediateTarget.current = targetPosition; // Cập nhật mục tiêu cuối cùng

      if (isMoving.current) {
        actions[Object.keys(actions)[0]]?.fadeOut(0.2).stop();
        isMoving.current = false;
      }
    }

    // Kiểm tra tọa độ gần (-38, -8, 3) để ẩn pet
    const targetToHide = new THREE.Vector3(-38, -13, 3); // Chỉnh Y = -13
    const hideThreshold = 3; // Ngưỡng 3 đơn vị
    if (position.current.distanceTo(targetToHide) < hideThreshold) {
      setShowPet(false); // Ẩn pet nếu đến gần tọa độ (-38, -13, 3) trong phạm vi 3 đơn vị
    }

    scene.position.copy(position.current); // Cập nhật vị trí của pet trên scene
  });

  return isVisible ? <primitive object={scene} scale={[10, 10, 10]} /> : null;
};
const Plane = ({ onClick }) => {
  const handleClick = (event) => {
    onClick(event.point, true); // Nhận tọa độ click
  };

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]} // Đặt mặt phẳng nằm ngang
      position={[0, -13, 0]} // Đặt mặt phẳng tại Y = -13
      onClick={handleClick}
    >
      <planeGeometry args={[100, 100]} /> {/* Tăng kích thước để bao phủ toàn bộ bản đồ */}
      <meshBasicMaterial visible={false} />
    </mesh>
  );
};

// Component Room
const Room = () => {
  const [targetPosition, setTargetPosition] = useState(null);
  const [showPet, setShowPet] = useState(true);

  const handlePlaneClick = (position) => {
    setShowPet(true); // Hiển thị lại pet khi click
    setTargetPosition(position); // Cập nhật vị trí mục tiêu
  };

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <PerspectiveCamera makeDefault position={[24, 12, 24]} fov={60} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 10]} intensity={1} />
      <directionalLight position={[-10, -20, -10]} intensity={0.4} />
      <OrbitControls
        enableRotate={false} // Không cho phép xoay camera
        enablePan={false}    // Không cho phép di chuyển ngang/dọc
        enableZoom={true}    // Cho phép phóng to/thu nhỏ
        maxDistance={50}     // Giới hạn khoảng cách tối đa khi thu nhỏ
        minDistance={10}     // Giới hạn khoảng cách tối thiểu khi phóng to
      />
      <RoomModel />
      <ChestModel />
      {showPet && (
        <PetModel
          targetPosition={targetPosition}
          isVisible={showPet}
          setShowPet={setShowPet}
        />
      )}
      <Plane onClick={handlePlaneClick} />
      <SleepModel />
      <BathModel />
    </Canvas>
  );
};  
export default Room;
