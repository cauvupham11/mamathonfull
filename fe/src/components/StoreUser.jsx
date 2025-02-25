import React, { useState } from 'react';

const StoreUser = ({ 
  closeStore, 
  itemsForUsers = [], 
  marketplaceItems = [], 
  userItemsForSale = [], 
  backpackItems = [], 
  onSellItem, 
  onBuyItem, 
  onCancelSale,
  onReceiveMoney,
  onRetrieveItem
}) => {
  const [selectedTab, setSelectedTab] = useState('store'); // 'store' | 'marketplace' | 'myItems' | 'backpack'
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleSellItem = () => {
    if (selectedItem) {
      const price = prompt(`Enter selling price for ${selectedItem.name}:`);
      if (price && !isNaN(price)) {
        onSellItem(selectedItem, parseInt(price));
        alert(`${selectedItem.name} has been listed for sale at ${price} coins.`);
        setSelectedItem(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[80%] max-w-4xl h-[75vh] bg-gray-100 rounded-xl p-6 shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h1 className="font-bold text-3xl text-gray-800">Marketplace</h1>
          <button className="bg-red-500 text-white px-4 py-2 text-lg rounded-lg hover:bg-red-700 transition" onClick={closeStore}>Close</button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-4 gap-3 mb-4 text-lg">
          {['store', 'marketplace', 'myItems', 'backpack'].map((tab) => (
            <button 
              key={tab} 
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                selectedTab === tab ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`} 
              onClick={() => setSelectedTab(tab)}
            >
              {tab === 'store' ? 'Store' : tab === 'marketplace' ? 'Marketplace' : tab === 'myItems' ? 'My Listings' : 'Backpack'}
            </button>
          ))}
        </div>

        {/* Items List */}
        <div className="grid grid-cols-3 gap-4 max-h-[45vh] overflow-y-auto p-3 border rounded-xl bg-white shadow-lg">
          {(selectedTab === 'store' ? itemsForUsers : 
            selectedTab === 'marketplace' ? marketplaceItems : 
            selectedTab === 'myItems' ? userItemsForSale : 
            backpackItems
          )?.length > 0 ? (
            (selectedTab === 'store' ? itemsForUsers : 
              selectedTab === 'marketplace' ? marketplaceItems : 
              selectedTab === 'myItems' ? userItemsForSale : 
              backpackItems
            ).map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`bg-white shadow-md p-4 rounded-xl text-center cursor-pointer hover:shadow-lg transition ${
                  selectedItem?.id === item.id ? 'border-4 border-red-400' : ''
                }`}
              >
                <img className="w-24 h-24 mx-auto rounded-md" src={item.image} alt={item.name} />
                <span className="block mt-2 text-md font-semibold">{item.name}</span>
                {selectedTab !== 'store' && <p className="text-gray-500 text-sm">{item.status || 'Not Listed'}</p>}
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500 text-lg">No items available</p>
          )}
        </div>

        {/* Item Details */}
        {selectedItem && (
          <div className="mt-5 p-5 bg-white shadow-lg rounded-xl border border-gray-300">
            <h2 className="text-xl font-bold text-center">{selectedItem.name}</h2>
            <p className="text-md text-gray-600 text-center">{selectedItem.description}</p>
            <p className="text-orange-500 text-center font-semibold text-lg">{selectedItem.status || "Not listed"}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {/* Buy button for store items */}
              {selectedTab === 'store' && 
                <button className="bg-green-500 px-5 py-2 text-md rounded-lg text-white hover:bg-green-600 transition" onClick={() => onBuyItem(selectedItem)}>Buy</button>
              }
              
              {/* Buttons for items in the marketplace */}
              {selectedTab === 'marketplace' && (
                selectedItem.status === 'On Sale' ? (
                  <button className="bg-red-500 px-5 py-2 text-md rounded-lg text-white hover:bg-red-600 transition" onClick={() => onCancelSale(selectedItem)}>Cancel Sale</button>
                ) : selectedItem.status === 'Sold Successfully' ? (
                  <button className="bg-blue-500 px-5 py-2 text-md rounded-lg text-white hover:bg-blue-600 transition" onClick={() => onReceiveMoney(selectedItem)}>Receive Money</button>
                ) : selectedItem.status === 'Expired Sale' ? (
                  <button className="bg-yellow-500 px-5 py-2 text-md rounded-lg text-white hover:bg-yellow-600 transition" onClick={() => onRetrieveItem(selectedItem)}>Retrieve Item</button>
                ) : null
              )}

              {/* Sell button for backpack items */}
              {selectedTab === 'backpack' && 
                <button className="bg-purple-500 px-5 py-2 text-md rounded-lg text-white hover:bg-purple-600 transition" onClick={handleSellItem}>List for Sale</button>
              }

              {/* Cancel Button */}
              <button className="bg-gray-400 px-5 py-2 text-md rounded-lg text-white hover:bg-gray-500 transition" onClick={() => setSelectedItem(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreUser;
