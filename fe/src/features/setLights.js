export const setUpLights = (scene) => {
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