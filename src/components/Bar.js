import React from 'react';

function Bar({ height, color, width }) {
  return (
    <div
      className="bar"
      style={{
        height: `${height}px`,
        backgroundColor: color,
        width: `${width}px`,
      }}
    />
  );
}

export default Bar;