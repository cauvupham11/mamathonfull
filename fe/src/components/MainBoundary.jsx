import { useState } from "react";
import { FaSmile, FaBed, FaUtensils, FaMoon } from "react-icons/fa";
import Backpack from "./Backpack"; 

const MainBoundary = () => {
  const [isBackpackOpen, setBackpackOpen] = useState(false);
  const [isStoreOpen, setStoreOpen] = useState(false);
  const [isMissionOpen, setMissionOpen] = useState(false);
  const [petStatus, setPetStatus] = useState("Happy");

  const closeBackpack = () => setBackpackOpen(false);
  const openBackpack = () => setBackpackOpen(true);

  const openStore = () => setStoreOpen(true);
  const closeStore = () => setStoreOpen(false);

  const openMission = () => setMissionOpen(true);
  const closeMission = () => setMissionOpen(false);

  const items = Array.from({ length: 10 }, (_, index) => index + 1);

  // Status update handler
  const updateStatus = (status) => setPetStatus(status);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-24 h-24 bg-emerald-200 rounded-full mx-4 my-2">
            <img
              src="/src/assets/img/goat.png"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-col my-3 pt-1">
            <div className="w-fit h-8 bg-teal-200 rounded-xl pr-2">
              <p className="ml-2 pt-1">kangourou</p>
            </div>
            <div className="w-fit h-8 bg-teal-200 rounded-xl mt-2 pr-2">
              <p className="ml-2 pt-1">{petStatus}</p>
            </div>
          </div>
        </div>

        <div className="flex mr-60 mt-4">
          <img
            className="w-10 h-10"
            src="/src/assets/img/coin_1.png"
            alt="Coin icon"
          />
          <span className="flex text-l bg-yellow-100 w-32 h-7 mx-2 mt-1 rounded-full pl-4">
            1 Coins
          </span>
        </div>
      </div>

      <div className="flex flex-col ml-4 mt-14 space-y-1">
        <div className="flex flex-col py-2 w-fit hover:cursor-pointer" onClick={openStore}>
          <img className="w-11 h-11" src="/src/assets/img/store.png" alt="Store" />
          <span>Store</span>
        </div>

        <div onClick={openBackpack} className="flex flex-col py-2 w-fit hover:cursor-pointer">
          <img className="w-11 h-11" src="/src/assets/img/military.png" alt="Backpack" />
          <span>Backpack</span>
        </div>

        <div onClick={openMission} className="flex flex-col py-2 w-fit hover:cursor-pointer">
          <img className="w-11 h-11" src="/src/assets/img/planner.png" alt="Missions" />
          <span>Missions</span>
        </div>
        <div className="flex flex-col py-2 w-fit">
          <img
            className="w-11 h-11"
            src="/src/assets/img/lottery.png"
            alt="Lucky Spin"
          />
          <span>Good luck !!!!</span>
        </div>
      </div>

      {isBackpackOpen && <Backpack closeBackpack={closeBackpack} items={items} />}
      {isStoreOpen && <Store closeStore={closeStore} />}
      {isMissionOpen && <Missions closeMission={closeMission} />}

      {/* Bottom Status Bar with react-icons */}
      <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-70 py-4 flex justify-around items-center">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => updateStatus("Happy")}
        >
          <FaSmile className="text-3xl text-yellow-400" />
          <span className="text-white text-xs">Happy</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => updateStatus("Hungry")}
        >
          <FaUtensils className="text-3xl text-green-400" />
          <span className="text-white text-xs">Hungry</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => updateStatus("Tired")}
        >
          <FaBed className="text-3xl text-blue-400" />
          <span className="text-white text-xs">Tired</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => updateStatus("Resting")}
        >
          <FaMoon className="text-3xl text-purple-400" />
          <span className="text-white text-xs">Resting</span>
        </div>
      </div>
    </div>
  );
};

const Missions = ({ closeMission }) => {
  const [missions, setMissions] = useState([
    { id: 1, title: "Feed Your Goat", reward: 10, completed: false },
    { id: 2, title: "Play with Goat", reward: 15, completed: false },
    { id: 3, title: "Give Goat a Bath", reward: 20, completed: false },
  ]);

  const completeMission = (id) => {
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === id ? { ...mission, completed: true } : mission
      )
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-2/5 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">📜 Missions</h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            onClick={closeMission}
          >
            ❌ Close
          </button>
        </div>

        <div className="space-y-4">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`p-4 border rounded-lg shadow-md flex justify-between items-center ${
                mission.completed ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {mission.title} {mission.completed ? "✔" : ""}
                </h3>
                <p className="text-gray-600">
                  Reward: {mission.reward} Coins
                </p>
              </div>
              <button
                className={`px-4 py-2 text-white rounded-lg ${
                  mission.completed ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                }`}
                onClick={() => completeMission(mission.id)}
                disabled={mission.completed}
              >
                {mission.completed ? "Completed" : "Not Completed"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Store = ({ closeStore }) => {
  const items = [
    { id: 1, name: "Goat Feed", price: 5, img: "/src/assets/img/goat_feed.png" },
    { id: 2, name: "Chew Toy", price: 10, img: "/src/assets/img/chew_toy.jpg" },
    { id: 3, name: "Collar", price: 8, img: "/src/assets/img/collar.jpg" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/5 h-3/5 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🐐 Pet Store</h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            onClick={closeStore}
          >
            ❌ Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {items.map((item) => (
            <div key={item.id} className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center">
              <img src={item.img} alt={item.name} className="w-40 h-40 object-cover rounded-lg" />
              <h3 className="text-2xl font-semibold mt-3">{item.name}</h3>
              <p className="text-gray-700 text-lg">{item.price} Coins</p>
              <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 text-lg">
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainBoundary;
