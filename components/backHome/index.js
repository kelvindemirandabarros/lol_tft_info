import React from 'react';

const BackHome = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
      }}
    >
      <a
        href='/'
        style={{
          fontSize: '30px',
          color: 'white',
        }}
      >&lt;- HOME</a>
    </div>
  );
}

export default BackHome;
