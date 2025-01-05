import * as THREE from "three";

export const createCity = (size) => {
  const data = [];
  let terrain = [];
  let buildings = [];

  const initialize = (scene) => {
    for (let x = 0; x < size; x++) {
      const col = [];
      data[x] = [];
      buildings[x] = [];
      for (let y = 0; y < size; y++) {
        const tileBase = {
          x,
          y,
          buildings: undefined,
          update() {
            const rand = Math.random();
            if (rand < 0.01) {
              if (this.buildings === undefined) {
                this.buildings = "buildings-1";
              } else if (this.buildings === "buildings-1") {
                this.buildings = "buildings-2";
              } else if (this.buildings === "buildings-2") {
                this.buildings = "buildings-3";
              }
            }
          },
        };
        if (Math.random() > 0.7) { 
          const randomHeight = Math.ceil(Math.random() * 3); 
          tileBase.buildings = `buildings-${randomHeight}`;
          const buildingGeometry = new THREE.BoxGeometry(1, randomHeight, 1);
          const buildingMaterial = new THREE.MeshLambertMaterial({
            color: "#00FF00",
          });
          const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
          buildingMesh.position.set(x, randomHeight / 2, y); 
          buildingMesh.castShadow = true;
          buildingMesh.receiveShadow = true;
          scene.add(buildingMesh);
      buildings[x][y] = buildingMesh; 
    } else {
      buildings[x][y] = null; 
    }

        col.push(tileBase);
        data[x][y] = tileBase;
        const groundGeometry = new THREE.BoxGeometry(1, 0.1, 1);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: "#78abf3" });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.position.set(x, -0.5, y);
        groundMesh.receiveShadow = true;
        scene.add(groundMesh);
      }
      terrain.push(col);
      buildings.push([...Array(size)]);
    }
  };

  const update = (scene) => {
    if (!scene) {
      console.error("Scene is undefined in city.update");
      return;
    }

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const tileBase = data[x][y];
        if (tileBase) {
          if (
            tileBase.buildings &&
            tileBase.buildings.startsWith("buildings")
          ) {
            const heightStr = tileBase.buildings.slice(-1);
            const height = Number(heightStr);

            if (isNaN(height)) {
              console.error(
                `Invalid height value "${heightStr}" for buildings at (${x}, ${y})`
              );
              continue;
            }
            const buildingGeometry = new THREE.BoxGeometry(1, height, 1);
            const buildingMaterial = new THREE.MeshLambertMaterial({
              color: "#00FF00",
            });
            const buildingMesh = new THREE.Mesh(
              buildingGeometry,
              buildingMaterial
            );
            buildingMesh.position.set(x, height / 2, y);
            buildingMesh.castShadow = true;
            buildingMesh.receiveShadow = true;

            if (buildings[x][y]) {
              scene.remove(buildings[x][y]);
            }
            scene.add(buildingMesh);
            buildings[x][y] = buildingMesh;
          }
        }
      }
    }
  };

  return {
    size,
    data,
    initialize,
    update,
  };
};
