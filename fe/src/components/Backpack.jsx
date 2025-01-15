import React from 'react';

const Backpack = ({ closeBackpack, items }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative w-98 h-fit bg-red-300 rounded-xl p-6'>
        <h1 className='flex justify-center text-3xl font-bold py-5 font-mono'>Backpack</h1>
        <ul className='flex justify-evenly pb-2'>
          <li className='w-24 h-10 rounded-3xl bg-blue-200 hover:bg-blue-400 hover:cursor-pointer flex items-center justify-center'>All item</li>
          <li className='w-24 h-10 rounded-3xl bg-blue-300 hover:bg-blue-200 hover:cursor-pointer flex items-center justify-center'>Shoes</li>
          <li className='w-24 h-10 rounded-3xl bg-blue-300 hover:bg-blue-200 hover:cursor-pointer flex items-center justify-center'>Cloths</li>
          <li className='w-24 h-10 rounded-3xl bg-blue-300 hover:bg-blue-200 hover:cursor-pointer flex items-center justify-center'>Pants</li>
          <li className='hover:cursor-pointer hover:opacity-50'>
            <img className='w-8 h-8' src="/src/assets/img/eyebrow.png" onClick={closeBackpack} alt="Close" />
          </li>
        </ul>
        {/* content bp */}
        <div>
          <ul className='flex flex-wrap justify-around mt-3 px-4'>
            {items.map((item) => (
              <li key={item} className='w-20 h-20 bg-red-100 m-2 flex items-center justify-center rounded-xl transform transition-transform duration-200 hover:scale-110 hover:bg-red-50'>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className='absolute rounded-full bg-blue-50 right-2 bottom-28 p-1 hover:cursor-pointer'>
            <img className='w-5 h-5' src="/src/assets/img/next_arrow.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Backpack;