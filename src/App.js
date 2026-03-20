import React from 'react';
import Header from './components/Header';
import SortingVisualizer from './components/SortingVisualizer';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <SortingVisualizer />
    </div>
  );
}

export default App;