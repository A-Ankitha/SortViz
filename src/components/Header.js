import React from 'react';

function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <span className="logo-sort">Sort</span>
        <span className="logo-viz">Viz</span>
      </h1>
      <p className="tagline">
        Sorting Algorithm Visualizer
      </p>
    </header>
  );
}

export default Header;