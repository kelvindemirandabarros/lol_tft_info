import React from 'react';

const ContainerForGrid = () => {
  return (
    <div className='container-for-grid'>
      <style jsx>{`
        .container-for-grid {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 1200px;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

export default ContainerForGrid;
