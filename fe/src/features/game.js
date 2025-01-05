import { createCity } from "./city.js";

export const createGame = (scene) => {
  const city = createCity(16);
  city.initialize(scene);

  const game = {
    update: () => {
      city.update(scene);
    },
  };

  return {
    game,
  };
};
