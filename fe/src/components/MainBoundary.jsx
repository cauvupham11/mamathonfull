import React, { useState } from 'react';
import Backpack from './Backpack';

const MainBoundary = () => {
  const [isBackpackOpen, setBackpackOpen] = useState(false);

  const openStore = () => {
    window.alert("hihi");
  };

  const closeBackpack = () => {
    setBackpackOpen(false);
  };

  const openBackpack = () => {
    console.log("status change!!");
    setBackpackOpen(true);
  };

  const items = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <div>
      <div className='flex justify-between'>
        {/* avatar + status */}
        <div className='flex'>
          {/* avatar */}
          <div className="w-24 h-24 bg-emerald-200 rounded-full mx-4 my-2"></div>

          {/* status + name ... */}
          <div className='flex-col my-3 pt-1'>
            <div className='w-fit h-8 bg-teal-200 rounded-xl pr-2'>
              <p className='ml-2 pt-1'>kangourou</p>
            </div>
            <div className='w-fit h-8 bg-teal-200 rounded-xl mt-2 pr-2'>
              <p className='ml-2 pt-1'>Laughed / Tired / Away / Starving</p>
            </div>
          </div>

          {/* settings */}
          <div>
            <img className='w-6 h-6 mt-10 mx-2' src="/src/assets/img/settings.png" alt="This is settings zone" />
          </div>
        </div>

        {/* Coin */}
        <div className='flex mr-60 mt-4'>
          <img className='w-10 h-10' src="/src/assets/img/coin_1.png" alt="Coin icon" />
          <span className=' flextext-l bg-yellow-100 w-32 h-7 mx-2 mt-1 rounded-full pl-4'>1</span>
        </div>
      </div>

      <div className='flex flex-col ml-4 mt-14 space-y-1'>
        <div className='flex flex-col py-2 w-fit hover:cursor-pointer' onClick={openStore}>
          <img className='w-11 h-11' src="/src/assets/img/store.png" alt="Store" />
          <span>Store</span>
        </div>

        <div onClick={openBackpack} className='flex flex-col py-2 w-fit hover:cursor-pointer'>
          <img className='w-11 h-11' src="/src/assets/img/military.png" alt="Backpack" />
          <span>Backpack</span>
        </div>

        <div className='flex flex-col py-2 w-fit'>
          <img className='w-11 h-11' src="/src/assets/img/planner.png" alt="Missions" />
          <span>Missions</span>
        </div>

        <div className='flex flex-col py-2 w-fit'>
          <img className='w-11 h-11' src="/src/assets/img/lottery.png" alt="Lucky Spin" />
          <span>Good luck !!!!</span>
        </div>
      </div>

      {isBackpackOpen && <Backpack closeBackpack={closeBackpack} items={items} />}
    </div>
  );
};

export default MainBoundary;