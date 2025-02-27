import React, { useState, useEffect } from 'react';

const StoreUser = ({ closeStore, onBuyItem }) => {
  const [selectedTab, setSelectedTab] = useState('store'); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [storeItems, setStoreItems] = useState([]); 
  const [marketplaceItems, setMarketplaceItems] = useState([]); 
  const [backpack, setBackpack] = useState([]); 

  // 🔹 Fetch dữ liệu từ file JSON khi component được mount
  useEffect(() => {
    fetch('/data.json') 
      .then(response => response.json())
      .then(data => {
        setBackpack(data.backpack || []);
        setStoreItems(data.chest || []); 
      })
      .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
    
    // 🔹 Lấy dữ liệu Marketplace từ localStorage
    const savedMarketplace = JSON.parse(localStorage.getItem("marketplaceItems")) || [];
    setMarketplaceItems(savedMarketplace);
  }, []);

  useEffect(() => {
    console.log("Backpack Data Loaded:", backpack);
    console.log("Store Data Loaded:", storeItems);
  }, [backpack, storeItems]);

  // 🔹 Lưu dữ liệu Marketplace vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("marketplaceItems", JSON.stringify(marketplaceItems));
  }, [marketplaceItems]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBuyItem = (item) => {
    alert(`Bạn đã mua ${item.name} thành công! 🎉`);
    if (onBuyItem) {
      onBuyItem(item);
    }
  };

  const handleSellItem = () => {
    if (selectedItem) {
      const price = prompt(`Nhập giá bán cho ${selectedItem.name}:`);
      if (price && !isNaN(price)) {
        const sellingItem = { ...selectedItem, price: parseInt(price), status: "On Sale" };
        const updatedMarketplace = [...marketplaceItems, sellingItem];

        setMarketplaceItems(updatedMarketplace); // 🔹 Thêm vào Marketplace
        localStorage.setItem("marketplaceItems", JSON.stringify(updatedMarketplace)); // 🔹 Lưu vào localStorage

        // 🔹 Ẩn item khỏi Backpack
        setBackpack(backpack.filter(item => item.name !== selectedItem.name));

        alert(`${selectedItem.name} đã được niêm yết với giá ${price} coins.`);
        setSelectedItem(null);
      }
    }
  };

  // 🔹 Xóa item khỏi Marketplace khi nhấn "Cancel Sale" và hiển thị lại trong Backpack
  const handleCancelSale = (item) => {
    const updatedMarketplace = marketplaceItems.filter((i) => i.name !== item.name);
    setMarketplaceItems(updatedMarketplace);
    localStorage.setItem("marketplaceItems", JSON.stringify(updatedMarketplace)); // 🔹 Cập nhật localStorage

    // 🔹 Hiển thị lại item trong Backpack
    setBackpack([...backpack, item]);

    alert(`${item.name} đã được gỡ khỏi Marketplace và quay lại Backpack.`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[90%] max-w-5xl h-[85vh] bg-gray-100 rounded-xl p-8 shadow-xl overflow-hidden"> 
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="font-bold text-4xl text-gray-800">Marketplace</h1>
          <button className="bg-red-500 text-white px-6 py-3 text-xl rounded-lg hover:bg-red-700 transition" onClick={closeStore}>Close</button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-xl">
          {['store', 'marketplace', 'backpack'].map((tab) => (
            <button 
              key={tab} 
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedTab === tab ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`} 
              onClick={() => setSelectedTab(tab)}
            >
              {tab === 'store' ? 'Store' : tab === 'marketplace' ? 'Marketplace' : 'Backpack'}
            </button>
          ))}
        </div>

        {/* Items List */}
        <div className="grid grid-cols-4 gap-6 max-h-[55vh] overflow-y-auto p-4 border rounded-xl bg-white shadow-lg">
          {(
            selectedTab === 'store' ? storeItems : 
            selectedTab === 'marketplace' ? marketplaceItems : 
            backpack
          )?.length > 0 ? (
            (selectedTab === 'store' ? storeItems : 
              selectedTab === 'marketplace' ? marketplaceItems : 
              backpack
            ).map((item) => (
              <div
                key={item.name} 
                onClick={() => handleSelectItem(item)}
                className={`bg-white shadow-md p-6 rounded-xl text-center cursor-pointer hover:shadow-xl transition ${
                  selectedItem?.name === item.name ? 'border-4 border-red-500' : ''
                }`}
              >
                <img className="w-28 h-28 mx-auto rounded-md" src={item.image} alt={item.name} onError={(e) => e.target.src = "/fallback-image.png"} />
                <span className="block mt-3 text-lg font-semibold">{item.name}</span>
                {selectedTab === 'store' && <p className="text-green-500 font-bold">{item.price} coins</p>}
                {selectedTab === 'marketplace' && <p className="text-blue-500 font-bold">{item.price} coins</p>}
                <p className="text-gray-500 text-md">{item.quantity ? `Quantity: ${item.quantity}` : item.details}</p>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500 text-xl">No items available</p>
          )}
        </div>

        {/* Item Details - Hiện nút Sell khi chọn vật phẩm từ Backpack */}
        {selectedItem && (
          <div className="mt-6 p-6 bg-white shadow-lg rounded-xl border border-gray-300">
            <h2 className="text-2xl font-bold text-center">{selectedItem.name}</h2>
            <p className="text-lg text-gray-600 text-center">{selectedItem.details}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {/* Buy button for store items */}
              {selectedTab === 'store' && 
                <button className="bg-green-500 px-6 py-3 text-lg rounded-lg text-white hover:bg-green-600 transition" onClick={() => handleBuyItem(selectedItem)}>Buy</button>
              }

              {/* Sell button chỉ hiển thị khi ở tab Backpack */}
              {selectedTab === 'backpack' && selectedItem && 
                <button className="bg-purple-500 px-6 py-3 text-lg rounded-lg text-white hover:bg-purple-600 transition" onClick={handleSellItem}>
                  Sell
                </button>
              }

              {/* Cancel Sale Button for Marketplace */}
              {selectedTab === 'marketplace' && selectedItem.status === "On Sale" &&
                <button className="bg-red-500 px-6 py-3 text-lg rounded-lg text-white hover:bg-red-600 transition" onClick={() => handleCancelSale(selectedItem)}>Cancel Sale</button>
              }

              {/* Cancel Button */}
              <button className="bg-gray-400 px-6 py-3 text-lg rounded-lg text-white hover:bg-gray-500 transition" onClick={() => setSelectedItem(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreUser;
