import React from 'react';

function Bar({ height, color, width }) {
  return (
    <div
      className="bar"
      style={{
        height: `${height}px`,
        backgroundColor: color,
        width: `${width}px`,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '4px 4px 0 0',
        transition: 'background-color 0.2s ease, height 0.2s ease'
      }}
    >
      
      <span style={{
        position: 'absolute',
        top: '-25px', 
        color: 'white',
        fontSize: width > 25 ? '12px' : '10px', 
        pointerEvents: 'none'
      }}>
        {height}
      </span>
    </div>
  );
}

export default Bar;