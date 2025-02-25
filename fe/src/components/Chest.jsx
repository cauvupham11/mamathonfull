import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Chest = ({ closeChest }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/data.json") // Không cần `src/`
      .then((response) => response.json())
      .then((data) => {
        if (data.chest) {
          setItems(data.chest);
        }
      })
      .catch((error) => console.error("Error loading chest data:", error));
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 sm:w-3/4 lg:w-1/2 bg-white rounded-xl p-6 shadow-lg">
        <h1 className="flex justify-center text-3xl font-bold py-5 font-mono text-gray-800">
          Chest
        </h1>
        <ul className="flex justify-center pb-4">
          <li className="absolute top-2 right-2 hover:opacity-80 cursor-pointer">
            <img
              className="w-8 h-8"
              src="/src/assets/img/eyebrow.png"
              onClick={closeChest}
              alt="Close"
            />
          </li>
        </ul>

        {/* Items Grid (Giữ layout ngay cả khi không có items) */}
        <div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-2">
            {items.length > 0 ? (
              items.map((item, index) => (
                <li
                  key={index}
                  className="w-24 h-24 bg-gray-100 flex flex-col items-center justify-center rounded-lg shadow-md transform transition-transform duration-200 hover:scale-110 hover:bg-gray-200 p-2 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img src={item.image} alt={item.name} className="w-12 h-12 mb-1" />
                  <p className="text-gray-800 text-sm font-semibold text-center">{item.name}</p>
                  <p className="text-gray-600 text-xs">x{item.quantity}</p>
                </li>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No items available</p>
            )}
          </ul>
        </div>

        {/* Display selected item details */}
        {selectedItem && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
              <h2 className="text-lg font-bold mb-2">{selectedItem.name}</h2>
              <img src={selectedItem.image} alt={selectedItem.name} className="w-16 h-16 mx-auto mb-2" />
              <p className="text-gray-700 mb-2">{selectedItem.details}</p>
              <p className="text-gray-600 text-sm">Quantity: {selectedItem.quantity}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Define PropTypes
Chest.propTypes = {
  closeChest: PropTypes.func.isRequired,
};

export default Chest;
