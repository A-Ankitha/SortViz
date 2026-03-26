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
  const [arraySize, setArraySize] = useState(20); // Lowered default size to see numbers clearly
  const [speed, setSpeed] = useState(3);
  const [isSorting, setIsSorting] = useState(false);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const [customInput, setCustomInput] = useState('');

  const stopRef = useRef(false);
  
  const generateArray = useCallback(() => {
    const newArray = [];
    const newColors = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 400) + 20);
      newColors.push(DEFAULT_COLOR);
    }
    setArray(newArray);
    setColors(newColors);
    setStats({ comparisons: 0, swaps: 0 });
  }, [arraySize]);

  useEffect(() => {
    if (!isSorting) {
      generateArray();
    }
  }, [arraySize, generateArray]);

  const handleApplyCustom = () => {
    if (!customInput.trim()) return;
    const newArray = customInput
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num) && num > 0);

    if (newArray.length > 0) {
      setArray(newArray);
      setColors(newArray.map(() => DEFAULT_COLOR));
      setArraySize(newArray.length);
      setStats({ comparisons: 0, swaps: 0 });
    }
  };

  const getDelay = () => {
    const delays = [200, 100, 50, 10, 2];
    return delays[speed - 1];
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    stopRef.current = false;

    setColors(array.map(() => DEFAULT_COLOR));

    let animations = [];
    switch (algorithm) {
      case 'bubble': animations = getBubbleSortAnimations(array); break;
      case 'selection': animations = getSelectionSortAnimations(array); break;
      case 'insertion': animations = getInsertionSortAnimations(array); break;
      case 'merge': animations = getMergeSortAnimations(array); break;
      case 'quick': animations = getQuickSortAnimations(array); break;
      case 'heap': animations = getHeapSortAnimations(array); break;
      default: animations = getBubbleSortAnimations(array);
    }

    await playAnimations(animations);

    if (!stopRef.current) {
      const finalSortedColors = array.map(() => SORTED_COLOR);
      setColors(finalSortedColors);
    }

    setIsSorting(false);
  };

  const playAnimations = async (animations) => {
    let comparisons = 0;
    let swaps = 0;
    const delay = getDelay();
    
    let colorArr = array.map(() => DEFAULT_COLOR);

    for (let i = 0; i < animations.length; i++) {
      if (stopRef.current) break;
      const anim = animations[i];

      switch (anim.type) {
        case 'compare': {
          const [idx1, idx2] = anim.indices;
          colorArr[idx1] = COMPARE_COLOR;
          colorArr[idx2] = COMPARE_COLOR;
          comparisons++;
          setColors([...colorArr]);
          await sleep(delay);
          if (colorArr[idx1] !== SORTED_COLOR) colorArr[idx1] = DEFAULT_COLOR;
          if (colorArr[idx2] !== SORTED_COLOR) colorArr[idx2] = DEFAULT_COLOR;
          setColors([...colorArr]);
          break;
        }
        case 'swap': {
          const [idx1, idx2] = anim.indices;
          const [val1, val2] = anim.values;
          colorArr[idx1] = SWAP_COLOR;
          colorArr[idx2] = SWAP_COLOR;
          swaps++;
          
          setArray(prev => {
            const newArr = [...prev];
            newArr[idx1] = val1;
            newArr[idx2] = val2;
            return newArr;
          });
          
          setColors([...colorArr]);
          await sleep(delay);
          if (colorArr[idx1] !== SORTED_COLOR) colorArr[idx1] = DEFAULT_COLOR;
          if (colorArr[idx2] !== SORTED_COLOR) colorArr[idx2] = DEFAULT_COLOR;
          setColors([...colorArr]);
          break;
        }
        case 'overwrite': {
          const { index, value } = anim;
          colorArr[index] = SWAP_COLOR;
          
          setArray(prev => {
            const newArr = [...prev];
            newArr[index] = value;
            return newArr;
          });
          
          setColors([...colorArr]);
          await sleep(delay);
          colorArr[index] = DEFAULT_COLOR;
          setColors([...colorArr]);
          break;
        }
        default: break;
      }
      setStats({ comparisons, swaps });
    }
  };

  const handleReset = () => {
    stopRef.current = true;
    setIsSorting(false);
    setStats({ comparisons: 0, swaps: 0 });
    generateArray();
  };

  const getBarWidth = () => {
    const containerWidth = 800;
    const gap = 5;
    return Math.max(20, Math.floor((containerWidth - arraySize * gap) / arraySize));
  };

  return (
    <div className="visualizer">
      <Controls
        algorithm={algorithm} setAlgorithm={setAlgorithm}
        arraySize={arraySize} setArraySize={setArraySize}
        speed={speed} setSpeed={setSpeed}
        onGenerate={generateArray} onSort={handleSort}
        onReset={handleReset} isSorting={isSorting}
        setCustomInput={setCustomInput} onApplyCustom={handleApplyCustom}
      />
      <div className="stats-bar">
        <span>Comparisons: {stats.comparisons}</span>
        <span>Swaps: {stats.swaps}</span>
      </div>
      <div className="bars-container">
        {array.map((value, idx) => (
          <Bar key={idx} height={value} color={colors[idx]} width={getBarWidth()} />
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;