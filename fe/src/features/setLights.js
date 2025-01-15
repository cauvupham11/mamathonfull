import * as THREE from "three";

export const setUpLights = (scene) => {
  // Directional Light (ánh sáng mặt trời)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Tăng cường độ để chiếu sáng mạnh hơn
  directionalLight.position.set(10, 20, 10); // Đặt vị trí nguồn sáng
  directionalLight.castShadow = true; // Kích hoạt bóng đổ

  // Tối ưu hóa bóng đổ
  directionalLight.shadow.mapSize.width = 1024; // Giảm kích thước để tối ưu hiệu suất
  directionalLight.shadow.mapSize.height = 1024;

  directionalLight.shadow.camera.left = -75; // Mở rộng vùng hiển thị bóng
  directionalLight.shadow.camera.right = 75;
  directionalLight.shadow.camera.top = 75;
  directionalLight.shadow.camera.bottom = -75;
  directionalLight.shadow.camera.near = 0.5; // Tăng độ chính xác gần
  directionalLight.shadow.camera.far = 150; // Đảm bảo bao phủ đối tượng xa hơn

  scene.add(directionalLight);

  // Helper để debug vùng bóng đổ (tùy chọn)
  // const shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  // scene.add(shadowHelper);

  // Ambient Light (ánh sáng mềm)
  const ambientLight = new THREE.AmbientLight(0x404040, 1); // Tăng cường độ để tránh vùng tối
  scene.add(ambientLight);

  // Hemisphere Light (ánh sáng toàn cảnh bổ sung - tùy chọn)
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); // Ánh sáng trên và dưới
  hemisphereLight.position.set(0, 50, 0); // Đặt vị trí
  scene.add(hemisphereLight);
};
