import * as THREE from 'three';


export const createCity = (size) => {
    // tạo mảng 2 chiều
    const data = [];

    let terrain = [];
    let buildings = [];
    // duyệt qua các thành phần
    const initialize = (scene) => {
        scene.clear();
        for (let x = 0; x < size; x++) {
            const col = [];
            data[x] = [];
            for (let y = 0; y < size; y++) {
                const tileBase = {
                    x,
                    y,
                    buildings : undefined,
                    update () {
                        const x = Math.random();
                        if ( x < 0.01) {
                            if (this.buildings === undefined) {
                                this.buildings = 'buildings-1';
                            } else if (this.buildings === 'buildings-1') {
                                this.buildings = 'buildings-2';
                            } else if (this.buildings === 'buildings-2') {
                                this.buildings = 'buildings-3';
                            }
                        }
                    }
                }

                if (Math.random() > 0.7) {
                    tileBase.buildings = 'buildings';
                }
                col.push(tileBase);
                data[x][y] = tileBase;

                // 1. dùng lưới ( mesh ) / đối tượng 3D tương ứng với ô tại vị trí {x , y} trong city
                const geometry = new THREE.BoxGeometry();
                const material = new THREE.MeshLambertMaterial({ color: "#78abf3" });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, -0.5, y);
                // 2. thêm đối tượng đó vào scene
                scene.add(mesh);
            }
            data.push(col);
            terrain.push(col);
            buildings.push([...Array(size)]);
        }
    }
    
    const update = (scene) => {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            // col.push(tileBase);
            const tileBase = data[x][y];

            if (tileBase) {
                    // 1. dùng lưới ( mesh ) / đối tượng 3D tương ứng với ô tại vị trí {x , y} trong city             
                if (tileBase.buildings && tileBase.buildings.startsWith('buidlings')){
                    const height = Number(tileBase.buildings.slice(-1));
                    const buildingGeometry = new THREE.BoxGeometry(1, height, 1);
                    const buildingMaterial = new THREE.MeshLambertMaterial({ color: "#F6D19D" });
                    const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
                    buildingMesh.position.set(x, height / 2, y);

                    if (buildings[x][y]) {
                        scene.remove(buildings[x][y]);
                    }
                    // 2. thêm đối tượng đó vào scene
                    scene.add(buildingMesh);
                    buildings[x][y]  = buildingMesh;
                    }
                }
            }
        // data.push(col);
        }
    }
    return {
        size,
        data,
        initialize,
        update
    }
}