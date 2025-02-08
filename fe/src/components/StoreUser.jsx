import React, { useState } from 'react'

const StoreUser = ({closeStore, itemsForUsers}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusText, setStatusText] = useState("")

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setStatusText("");
  }

  const handleShowStatus = () => {
    if(selectedItem)
      setStatusText(selectedItem.status);
    else
      setStatusText("Please choose one item");
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-98 h-fit bg-slate-200 rounded-xl p-6'>
        <div>
          <div className='flex justify-between'>
              {/* Title */}
              <h1 className='font-bold text-2xl text-red-300 ml-96 pl-16'>Store for Users</h1>
              {/* Body */}
              <div className='mr-10'>
                <img
                  className="w-6 h-6 hover:cursor-pointer opacity-70 hover:opacity-50 -rotate-45 hover:rotate-90 duration-700"
                  src="/src/assets/img/close.png"
                  onClick={closeStore}
                  alt="Close"
                />
              </div>
            </div> 
          <div>
            <ul className="flex flex-wrap justify-around mt-3">
              {itemsForUsers.map((item) => (
                <li
                key={item.id} 
                onClick={() => handleSelectItem(item)} // Khi click vào item, nó sẽ được chọn
                className={`bg-pink-100 shadow-md p-3 rounded-xl text-center hover:scale-105 transition cursor-pointer ${
                  selectedItem?.id === item.id ? 'border-4 border-red-400' : ''
                }`}
                >
                  <div className='flex-wrap'>
                    <img className='w-6 h-6' src={item.image} alt="" />
                    <span className='text-sm'>{item.name}</span>                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Status items */}
          <div>
            <button className='w-24 h-10 rounded-2xl bg-slate-500 opacity-70 mt-4 ml-8 font-semibold' onClick={handleShowStatus}>Status</button>
            <span className='ml-2 font-semibold text-orange-400'>
              {statusText}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreUser