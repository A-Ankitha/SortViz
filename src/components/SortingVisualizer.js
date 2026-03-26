import React, { useState, useEffect, useRef, useCallback } from 'react';
import Bar from './Bar';
import Controls from './Controls';

import { getBubbleSortAnimations } from '../algorithms/bubbleSort';
import { getSelectionSortAnimations } from '../algorithms/selectionSort';
import { getInsertionSortAnimations } from '../algorithms/insertionSort';
import { getMergeSortAnimations } from '../algorithms/mergeSort';
import { getQuickSortAnimations } from '../algorithms/quickSort';
import { getHeapSortAnimations } from '../algorithms/heapSort';

const DEFAULT_COLOR = '#6c63ff'; 
const COMPARE_COLOR = '#ff6b6b'; 
const SWAP_COLOR = '#ffd93d';    
const SORTED_COLOR = '#6bcb77';  

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [colors, setColors] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [arraySize, setArraySize] = useState(10); // Start small to see numbers
  const [speed, setSpeed] = useState(3);
  const [isSorting, setIsSorting] = useState(false);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const [customInput, setCustomInput] = useState('');

  const stopRef = useRef(false);

  const generateArray = useCallback(() => {
    const newArray = Array.from(
      { length: arraySize }, 
      () => Math.floor(Math.random() * 350) + 20
    );
    setArray(newArray);
    setColors(newArray.map(() => '#6c63ff'));
    setStats({ comparisons: 0, swaps: 0 });
  }, [arraySize]);

  useEffect(() => {
    if (!isSorting) {
      generateArray();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]); 

  const handleApplyCustom = () => {
    if (!customInput.trim()) return;

    const newArray = customInput
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n > 0);

    if (newArray.length > 0) {
      setStats({ comparisons: 0, swaps: 0 });
      setArray(newArray);
      setColors(newArray.map(() => '#6c63ff'));
      setArraySize(newArray.length); 
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const playAnimations = async (animations) => {
    let comps = 0;
    let swps = 0;
    const delay = [200, 100, 50, 10, 2][speed - 1];
    let colorArr = array.map(() => '#6c63ff');

    for (const anim of animations) {
      if (stopRef.current) break;

      if (anim.type === 'compare') {
        const [i, j] = anim.indices;
        colorArr[i] = colorArr[j] = '#ff6b6b';
        setColors([...colorArr]);
        await sleep(delay);
        colorArr[i] = colorArr[j] = '#6c63ff';
        setColors([...colorArr]);
        comps++;
      } 
      else if (anim.type === 'swap' || anim.type === 'overwrite') {
        const indices = anim.type === 'swap' ? anim.indices : [anim.index];
        const values = anim.type === 'swap' ? anim.values : [anim.value];

        indices.forEach(idx => colorArr[idx] = '#ffd93d');
        setColors([...colorArr]);
        
        setArray(prev => {
          const next = [...prev];
          indices.forEach((idx, i) => next[idx] = values[i]);
          return next;
        });

        await sleep(delay);
        indices.forEach(idx => colorArr[idx] = '#6c63ff');
        setColors([...colorArr]);
        swps++;
      }
      setStats({ comparisons: comps, swaps: swps });
    }
  };

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    stopRef.current = false;
    
    let animations = [];
    if (algorithm === 'bubble') animations = getBubbleSortAnimations(array);
    if (algorithm === 'selection') animations = getSelectionSortAnimations(array);
    if (algorithm === 'insertion') animations = getInsertionSortAnimations(array);
    if (algorithm === 'merge') animations = getMergeSortAnimations(array);
    if (algorithm === 'quick') animations = getQuickSortAnimations(array);
    if (algorithm === 'heap') animations = getHeapSortAnimations(array);

    await playAnimations(animations);

    if (!stopRef.current) setColors(array.map(() => '#6bcb77'));
    setIsSorting(false);
  };

  const handleReset = () => {
    stopRef.current = true;
    setIsSorting(false);
    generateArray();
  };

  return (
    <div className="app">
      <Controls 
        algorithm={algorithm} 
        setAlgorithm={setAlgorithm}
        speed={speed} 
        setSpeed={setSpeed}
        onGenerate={handleReset} 
        onSort={handleSort}
        onReset={handleReset} 
        isSorting={isSorting}
        setCustomInput={setCustomInput} 
        onApplyCustom={handleApplyCustom}
        arraySize={arraySize}
        setArraySize={setArraySize}
      />
      <div className="stats-bar">
        <span>Comparisons: {stats.comparisons}</span>
        <span>Swaps: {stats.swaps}</span>
      </div>
      <div className="bars-container" style={{ overflow: 'visible', paddingTop: '40px' }}>
        {array.map((val, i) => {
          const dynamicWidth = Math.floor((800 - (array.length * 4)) / array.length);
          const finalWidth = Math.max(25, Math.min(60, dynamicWidth));

          return (
            <Bar 
              key={i} 
              height={val} 
              color={colors[i]} 
              width={finalWidth} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default SortingVisualizer;