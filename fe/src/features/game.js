// import * as THREE from 'three';

import { createCity } from "./city";

export const createGame = (scene) => {
    const city = createCity(16);
    city.initialize(scene);

    const game = {
        update (scene) {
            city.update(scene);
        }
    }
    
    setInterval(() => {
        game.update();
    }, 1000);

    return {
        game
    }
}