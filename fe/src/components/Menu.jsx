import { useState } from "react";
import Backpack from "./Backpack";
import StoreUser from "./StoreUser";
import Exchange from "./Exchange";
import { FaStore, FaExchangeAlt } from "react-icons/fa";
import { motion } from "framer-motion";
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
    <div className="flex flex-col ml-4 mt-14 space-y-4">
    <div
      className="flex flex-col py-2 w-fit hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={openStore}
    >
      <img className="w-11 h-11 object-contain transition-transform duration-300 ease-in-out" src="/src/assets/img/store.png" alt="Store" />
      <span className="transition-opacity duration-300 ease-in-out opacity-75 hover:opacity-100">Store</span>
    </div>
    <div
      className="flex flex-col py-2 w-fit hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={openBackpack}
    >
      <img className="w-11 h-11 object-contain transition-transform duration-300 ease-in-out" src="/src/assets/img/military.png" alt="Backpack" />
      <span className="transition-opacity duration-300 ease-in-out opacity-75 hover:opacity-100">Backpack</span>
    </div>
    <div
      className="flex flex-col py-2 w-fit hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={openMission}
    >
      <img className="w-11 h-11 object-contain transition-transform duration-300 ease-in-out" src="/src/assets/img/planner.png" alt="Missions" />
      <span className="transition-opacity duration-300 ease-in-out opacity-75 hover:opacity-100">Missions</span>
    </div>
    <div
      className="flex flex-col py-2 w-fit hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
      onClick={openSpin}
    >
      <img className="w-11 h-11 object-contain transition-transform duration-300 ease-in-out" src="/src/assets/img/lottery.png" alt="Lucky Spin" />
      <span className="transition-opacity duration-300 ease-in-out opacity-75 hover:opacity-100">Good luck !!!!</span>
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
const LuckySpin = ({ segments = ["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5"], closeSpin }) => {
  const [spinDegree, setSpinDegree] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return; // Prevent spinning while it's spinning
    setIsSpinning(true);
    const randomDegree = Math.floor(Math.random() * 360) + 720; // Spin at least 2 full rounds
    setSpinDegree(randomDegree);

    // Reset the spinning state after the animation is done
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000); // Match this time with the animation duration
  };

  // Create a conic gradient for background slices
  const generateGradient = () => {
    const sliceAngle = 100 / segments.length;
    let gradient = "";
    const colors = [
      "#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FF8C33",
    ];
    segments.forEach((_, index) => {
      gradient += `${colors[index % colors.length]} ${sliceAngle * index}% ${sliceAngle * (index + 1)}%, `;
    });
    return `conic-gradient(${gradient.trim().slice(0, -1)})`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-4/5 md:w-3/5 lg:w-1/2 h-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-2xl p-8 relative transform transition-transform duration-500 ease-in-out hover:scale-105">
        {/* Close button */}
        <button
          onClick={closeSpin}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
        >
          ❌ Close
        </button>

        {/* The spinning wheel */}
        <div
          className="relative w-64 h-64 border-8 border-solid border-gray-800 rounded-full flex justify-center items-center"
          style={{
            transform: `rotate(${spinDegree}deg)`,
            transition: "transform 3s ease-out",
            background: generateGradient(), // Apply conic gradient to create the slices
          }}
        >
          {/* Place labels inside each slice */}
          {segments.map((segment, index) => {
            const angle = (index * 360) / segments.length; // Calculate angle for each segment
            return (
              <div
              key={index}
              className="absolute top-0 left-0 flex justify-center items-center w-full h-full"
              style={{
                transform: `rotate(${angle}deg)`,
                transition: "transform 3s ease-out",
                transformOrigin: "50% 1000%", // Rotate from the right edge
              }}
              >
              <div
                className="absolute w-1/2 h-1/2 flex justify-center items-center text-white font-semibold"
                style={{
                transform: `rotate(${-(angle)}deg)`, // Correct label orientation
                }}
              >
                {segment}
              </div>
              </div>
            );
          })}
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          className="px-6 py-3 bg-pink-500 text-white font-bold rounded-full shadow-md hover:bg-pink-600 transition-all duration-300 mt-4"
        >
          Spin the Wheel
        </button>
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
    <div className="w-2/5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">📜 Missions</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
          onClick={closeMission}
        >
          ❌ Close
        </button>
      </div>
  
      <div className="space-y-4">
        {missions.map((mission) => (
          <motion.div
            key={mission.id}
            className={`p-4 border rounded-lg shadow-md flex justify-between items-center ${mission.completed ? "bg-green-200" : "bg-gray-100"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-xl font-semibold">
                {mission.title} {mission.completed ? "✔" : ""}
              </h3>
              <p className="text-gray-600">Reward: {mission.reward} Coins</p>
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
          </motion.div>
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="w-4/5 md:w-3/5 lg:w-1/2 h-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-2xl p-8 relative transform transition-transform duration-500 ease-in-out hover:scale-105">
    
    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-extrabold text-white animate__animated animate__fadeIn">🐐 Pet Store</h1>
      <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-300" onClick={closeStore}>
        ❌ Close
      </button>
    </div>

    {/* Items Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      {itemsForUsers.map((item) => (
        <div key={item.id} className="p-6 border border-white rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 flex flex-col items-center bg-white bg-opacity-80">
          <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded-lg mb-4 transition-all duration-300 hover:scale-110" />
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600 text-lg mb-4">{item.price} Coins</p>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:scale-105 transition-all duration-300">
            Buy
          </button>
        </div>
      ))}
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
      {/* Store User Button */}
      <button
        className="w-full md:w-1/2 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2 hover:scale-105 transform transition duration-300"
        onClick={() => setStoreUserOpen(true)}
      >
        <FaStore className="text-xl" />
        Open Store User
      </button>

      {/* Exchange Button */}
      <button
        className="w-full md:w-1/2 px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2 hover:scale-105 transform transition duration-300"
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
