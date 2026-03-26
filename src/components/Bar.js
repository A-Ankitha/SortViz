import React from 'react';

function Bar({ height, color, width }) {
  return (
    <div
      className="bar"
      style={{
        height: `${height}px`,
        backgroundColor: color,
        width: `${width}px`,
        position: 'relative', // Vital for the label
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <span style={{
        position: 'absolute',
        top: '-25px',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {height}
      </span>
    </div>
  );
}

export default Bar;