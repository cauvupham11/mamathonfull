import { useState } from "react";
import Backpack from "./Backpack";
import StoreUser from "./StoreUser";
import Exchange from "./Exchange";
import { FaStore, FaExchangeAlt } from "react-icons/fa";

const Menu = () => {
  const [isBackpackOpen, setBackpackOpen] = useState(false);
  const [isStoreOpen, setStoreOpen] = useState(false);
  const [isMissionOpen, setMissionOpen] = useState(false);
  const [isSpinOpen, setSpinOpen] = useState(false);

  const closeBackpack = () => setBackpackOpen(false);
  const openBackpack = () => setBackpackOpen(true);

  const openStore = () => setStoreOpen(true);
  const closeStore = () => setStoreOpen(false);

  const openMission = () => setMissionOpen(true);
  const closeMission = () => setMissionOpen(false);

  const openSpin = () => setSpinOpen(true);
  const closeSpin = () => setSpinOpen(false);

  const items = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="flex flex-col ml-4 mt-14 space-y-1">
      <div
        className="flex flex-col py-2 w-fit hover:cursor-pointer"
        onClick={openStore}
      >
        <img className="w-11 h-11" src="/src/assets/img/store.png" alt="Store" />
        <span>Store</span>
      </div>
      <div
        className="flex flex-col py-2 w-fit hover:cursor-pointer"
        onClick={openBackpack}
      >
        <img
          className="w-11 h-11"
          src="/src/assets/img/military.png"
          alt="Backpack"
        />
        <span>Backpack</span>
      </div>
      <div
        className="flex flex-col py-2 w-fit hover:cursor-pointer"
        onClick={openMission}
      >
        <img
          className="w-11 h-11"
          src="/src/assets/img/planner.png"
          alt="Missions"
        />
        <span>Missions</span>
      </div>
      <div className="flex flex-col py-2 w-fit hover:cursor-pointer" onClick={openSpin}>
        <img
          className="w-11 h-11"
          src="/src/assets/img/lottery.png"
          alt="Lucky Spin"
        />
        <span>Good luck !!!!</span>
      </div>
      {isBackpackOpen && (
        <Backpack closeBackpack={closeBackpack} items={items} />
      )}

      {/* Store Overlay */}
      {isStoreOpen && <Store closeStore={closeStore} />}

      {/* Missions Overlay */}
      {isMissionOpen && <Missions closeMission={closeMission} />}

      {/* Spin Overlay */}
      {isSpinOpen && <LuckySpin closeSpin={closeSpin} />}
    </div>
  );
};
const LuckySpin = ({ closeSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinStyle, setSpinStyle] = useState({});
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const prizes = [
    { id: 1, name: "100 Coins", color: "#db7093" },
    { id: 2, name: "1 Coin", color: "#20b2aa" },
    { id: 3, name: "50 Coins", color: "#d63e92" },
    { id: 4, name: "Try Again", color: "#daa520" },
    { id: 5, name: "1000 Coins", color: "#ff34f0" },
    { id: 6, name: "10 Coins", color: "#ff7f50" },
    { id: 7, name: "5 Coins", color: "#3cb371" },
    { id: 8, name: "20 Coins", color: "#4169e1" },
  ];

  const startSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const randomDegree = 360 * 5 + (360 / prizes.length) * randomIndex;

    setSpinStyle({
      transform: `rotate(${randomDegree}deg)`,
      transition: "transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)",
    });

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(prizes[randomIndex]);
      setPopupVisible(true);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/5 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">🎡 Lucky Spin</h1>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700" onClick={closeSpin}>
            ❌ Close
          </button>
        </div>

        {/* Spin Wheel */}
        <div className="relative w-80 h-80 mx-auto">
          <div className="absolute w-full h-full rounded-full border-4 border-gray-300 shadow-lg" style={spinStyle}>
            {prizes.map((item, index) => (
              <div
                key={item.id}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${(360 / prizes.length) * index}deg)`,
                  clipPath: "polygon(50% 50%, 100% 0, 0 0)",
                  backgroundColor: item.color,
                }}
              >
                <div
                  className="absolute w-full h-full flex justify-center items-center text-center"
                  style={{
                    transform: `rotate(-${(360 / prizes.length) * index}deg)`,
                  }}
                >
                  <span className="text-xs font-bold text-white">{item.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Spin Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 shadow-lg rounded-full"></div>
        </div>

        {/* Spin Button */}
        <button
          className={`mt-6 px-6 py-3 text-lg text-white rounded-lg ${isSpinning ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"}`}
          onClick={startSpin}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Start Spin"}
        </button>
      </div>

      {/* Popup Message */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800">🎉 Congratulations!</h2>
            <p className="mt-2 text-lg">{selectedPrize.name}</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setPopupVisible(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
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
                <p className="text-gray-600">Reward: {mission.reward} Coins</p>
              </div>
              <button
                className={`px-4 py-2 text-white rounded-lg ${
                  mission.completed
                    ? "bg-gray-500"
                    : "bg-blue-500 hover:bg-blue-700"
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
  const [isStoreUserOpen, setStoreUserOpen] = useState(false);
  const [isExchangeOpen, setExchangeOpen] = useState(false); // State to open Exchange

  const itemsForUsers = [
    { id: 1, name: "Goat Feed", price: 5, image: "/src/assets/img/goat_feed.png", status: "Available" },
    { id: 2, name: "Chew Toy", price: 10, image: "/src/assets/img/chew_toy.jpg", status: "Available" },
    { id: 3, name: "Collar", price: 8, image: "/src/assets/img/collar.jpg", status: "Available" },
  ];

  const marketplaceItems = [
    { id: 4, name: "Dog Food", price: 15, image: "/src/assets/img/dog_food.png", status: "Sold Successfully" },
    { id: 5, name: "Cat Toy", price: 12, image: "/src/assets/img/cat_toy.jpg", status: "On Sale" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/5 h-auto bg-white rounded-xl shadow-lg p-6 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🐐 Pet Store</h1>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition" onClick={closeStore}>
            ❌ Close
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {itemsForUsers.map((item) => (
            <div key={item.id} className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded-lg" />
              <h3 className="text-2xl font-semibold mt-3">{item.name}</h3>
              <p className="text-gray-700 text-lg">{item.price} Coins</p>
              <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 text-lg transition">
                Buy
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          
          {/* Store User Button */}
          <button
            className="w-full md:w-1/2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2 hover:scale-105 transition"
            onClick={() => setStoreUserOpen(true)}
          >
            <FaStore className="text-xl" />
            Open Store User
          </button>

          {/* Exchange Button */}
          <button
            className="w-full md:w-1/2 px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2 hover:scale-105 transition"
            onClick={() => setExchangeOpen(true)}
          >
            <FaExchangeAlt className="text-xl" />
            Open Exchange
          </button>
        </div>
      </div>

      {/* Show StoreUser when button clicked */}
      {isStoreUserOpen && (
        <StoreUser closeStore={() => setStoreUserOpen(false)} itemsForUsers={itemsForUsers} marketplaceItems={marketplaceItems} />
      )}

      {/* Show Exchange when button clicked */}
      {isExchangeOpen && <Exchange closeExchange={() => setExchangeOpen(false)} />}
    </div>
  );
};
export default Menu;
