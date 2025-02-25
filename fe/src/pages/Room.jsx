import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';
import Chest from '../components/Chest.jsx';
const RoomModel = () => {
  const { scene } = useGLTF('/interface/room.glb');
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set('#FFB6C1');
      }
    });
    scene.scale.set(50, 100, 50); 
    scene.position.set(0, 40, 0);
  }, [scene]);
  return <primitive object={scene} />;
};
const ChestModel = ({ onClick }) => {
  const { scene } = useGLTF('/interface/chest.glb');
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.emissive = new THREE.Color(0x000000);
        child.material.emissiveIntensity = 0;
      }
    });
  }, [scene]);
  return (
    <group
      onPointerOver={() => {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.material.emissive = new THREE.Color(0xffff00);
            child.material.emissiveIntensity = 0.05;
          }
        });
      }}
      onPointerOut={() => {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.material.emissive = new THREE.Color(0x000000);
            child.material.emissiveIntensity = 0;
          }
        });
      }}
      onClick={onClick}
    >
      <primitive object={scene} position={[-38, -10, -35]} scale={[8, 8, 8]} />
    </group>
  );
};
const SleepModel = () => {
  const { scene } = useGLTF('/interface/Sleep.glb');
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.emissive = new THREE.Color(0x000000);
        child.material.emissiveIntensity = 0;
      }
    });
    scene.rotation.y = Math.PI / 2;
  }, [scene]);
  const handlePointerOver = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0xffff00);
        child.material.emissiveIntensity = 0.05;
      }
    });
  };
  const handlePointerOut = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0x000000);
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
        child.material = child.material.clone();
        child.material.emissive = new THREE.Color(0x000000);
        child.material.emissiveIntensity = 0;
      }
    });
  }, [scene]);
  const handlePointerOver = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0xffff00);
        child.material.emissiveIntensity = 0.05;
      }
    });
  };
  const handlePointerOut = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0x000000);
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
const FoodBowl = () => {
  const foodBowlRef = useRef();
  const [showOptions, setShowOptions] = useState(false);
  const [hunger, setHunger] = useState(100);
  useEffect(() => {
    const hungerInterval = setInterval(() => {
      setHunger((prev) => Math.max(prev - 1, 0));
    }, 3000);
    return () => clearInterval(hungerInterval);
  }, []);
  const feedGoat = () => {
    setHunger((prev) => Math.min(prev + 20, 100));
  };
  const handleClick = (e) => {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  };
  return (
    <>
      <mesh
        ref={foodBowlRef}
        position={[-15, -13.8, -10]}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[2.4, 3, 1, 64]} />
        <meshStandardMaterial color="#FF8C00" />
      </mesh>
      {showOptions && (
        <Html position={[4, 1.5, 4]} center>
          <div className="bg-white p-3 rounded-lg shadow-lg flex flex-col space-y-2 items-center">
            <p className="font-bold">Hunger: {hunger}%</p>
            <div className="w-40 bg-gray-200 rounded-full overflow-hidden border border-gray-400">
              <div
                className={`h-6 transition-all duration-500 ${
                  hunger > 50
                    ? 'bg-green-400'
                    : hunger > 20
                    ? 'bg-yellow-400'
                    : 'bg-red-500'
                }`}
                style={{ width: `${hunger}%` }}
              ></div>
            </div>
            <button
              className="bg-green-500 p-2 rounded hover:bg-green-700 text-white"
              onClick={feedGoat}
            >
              🍎 Feed Goat
            </button>
            <button
              className="bg-red-500 p-2 rounded hover:bg-red-700 text-white"
              onClick={() => setShowOptions(false)}
            >
              ❌ Close
            </button>
          </div>
        </Html>
      )}
    </>
  );
};
const PetModel = ({ targetPosition, isVisible }) => {
  const { scene, animations } = useGLTF('/interface/goatpet.glb');
  const { actions } = useAnimations(animations, scene);
  const position = useRef(new THREE.Vector3(-4, -13, 4));
  const isMoving = useRef(false);
  const threshold = 1;
  const maxSpeed = 0.1;
  const currentTarget = useRef(null);
  useMemo(() => {
    scene.rotation.y = Math.PI;
  }, [scene]);
  useEffect(() => {
    if (targetPosition) {
      if (isMoving.current) {
        currentTarget.current = targetPosition.clone();
        const direction = new THREE.Vector3()
          .subVectors(currentTarget.current, position.current)
          .normalize();
        const angle = Math.atan2(direction.x, direction.z);
        scene.rotation.y = angle;
      } else {
        currentTarget.current = targetPosition.clone();
      }
    }
  }, [targetPosition]);
  useFrame(() => {
    if (!isVisible || !currentTarget.current) return;

    const distance = position.current.distanceTo(currentTarget.current);

    if (distance > threshold) {
      const step = Math.min(distance, maxSpeed);
      const direction = new THREE.Vector3()
        .subVectors(currentTarget.current, position.current)
        .normalize();
      
      position.current.add(direction.multiplyScalar(step));
      scene.rotation.y = Math.atan2(direction.x, direction.z);

      if (!isMoving.current) {
        actions[Object.keys(actions)[0]]?.fadeIn(0.2).play();
        isMoving.current = true;
      }
    } else {
      position.current.copy(currentTarget.current);
      currentTarget.current = null;
      if (isMoving.current) {
        actions[Object.keys(actions)[0]]?.fadeOut(0.2).stop();
        isMoving.current = false;
      }
    }
    scene.position.copy(position.current);
  });
  return isVisible ? <primitive object={scene} scale={[10, 10, 10]} /> : null;
};
const Plane = ({ onClick }) => {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -13, 0]}
      onClick={(event) => onClick(event.point)}
    >
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
};
const Room = () => {
  const [targetPosition, setTargetPosition] = useState(null);
  const [showPet, setShowPet] = useState(true);
  const [isChestOpen, setIsChestOpen] = useState(false);
  const handlePlaneClick = (position) => {
    setShowPet(true);
    setTargetPosition(position);
  };
  return (
    <>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <PerspectiveCamera makeDefault position={[24, 12, 24]} fov={60} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <OrbitControls 
          enableRotate={false}  
          minZoom={2}           
          maxZoom={2}           
          minDistance={10}      
          maxDistance={30}   
        />
        <RoomModel />
        <ChestModel onClick={() => setIsChestOpen(true)} />
        <SleepModel onClick={() => setShowPet(true)} />
        <BathModel />
        <FoodBowl />
        <Plane onClick={handlePlaneClick} />
        {showPet && (
          <PetModel
            targetPosition={targetPosition}
            isVisible={showPet}
            setShowPet={setShowPet}
          />
        )}
      </Canvas>
      {isChestOpen && <Chest closeChest={() => setIsChestOpen(false)} />}
    </>
  );
};
export default Room;
