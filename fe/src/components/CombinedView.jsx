import React from 'react';
import MainBoundary from './MainBoundary'; // Import giao diện overlay
import Room from '../pages/Room';

const CombinedView = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Giao diện 3D */}
      <Room />

      {/* Giao diện MainBoundary nằm trên */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10, // Đảm bảo nằm trên canvas
          pointerEvents: 'none', // Cho phép click xuyên qua MainBoundary nếu cần
        }}
      >
        <MainBoundary />
      </div>
    </div>
  );
};

export default CombinedView;
