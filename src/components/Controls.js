import React from 'react';

function Controls({
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  onGenerate,
  onSort,
  onReset,
  isSorting,
  setCustomInput, 
  onApplyCustom,
}) {
  const algorithms = [
    { value: 'bubble', label: 'Bubble Sort', complexity: 'O(n²)' },
    { value: 'selection', label: 'Selection Sort', complexity: 'O(n²)' },
    { value: 'insertion', label: 'Insertion Sort', complexity: 'O(n²)' },
    { value: 'merge', label: 'Merge Sort', complexity: 'O(n log n)' },
    { value: 'quick', label: 'Quick Sort', complexity: 'O(n log n)' },
    { value: 'heap', label: 'Heap Sort', complexity: 'O(n log n)' },
  ];

  const currentAlgo = algorithms.find((a) => a.value === algorithm);

  return (
    <div className="controls">
      {/* Algorithm Selector */}
      <div className="control-group">
        <label>Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
        >
          {algorithms.map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label} ({algo.complexity})
            </option>
          ))}
        </select>
      </div>

      {/* Manual Input Section */}
      <div className="control-group">
        <label>Manual Input (comma separated)</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="e.g. 10, 50, 30" 
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={isSorting}
            className="custom-input"
          />
          <button 
            onClick={onApplyCustom} 
            disabled={isSorting} 
            className="btn-apply"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Speed Control */}
      <div className="control-group">
        <label>Speed: {speed}x</label>
        <input
          type="range"
          min="1"
          max="5"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      {/* Complexity Info */}
      <div className="complexity-info">
        <span>Time: {currentAlgo?.complexity}</span>
      </div>

      {/* Action Buttons */}
      <div className="buttons">
        <button
          className="btn btn-generate"
          onClick={onGenerate}
          disabled={isSorting}
        >
          🔄 Generate New Array
        </button>
        <button 
          className="btn btn-sort"
          onClick={onSort}
          disabled={isSorting}
        >
          ▶️ Start Sorting
        </button>
        <button
          className="btn btn-reset"
          onClick={onReset}
          disabled={isSorting}
        >
          ⏹️ Reset
        </button>
      </div>
    </div>
  );
}

export default Controls;