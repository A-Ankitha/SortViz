export function getQuickSortAnimations(array) {
  const animations = [];
  const arr = [...array];

  quickSortHelper(arr, 0, arr.length - 1, animations);

  // Mark all as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    animations.push({ type: 'sorted', index: i });
  }

  return animations;
}

function quickSortHelper(arr, low, high, animations) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pivotIdx - 1, animations);
    quickSortHelper(arr, pivotIdx + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  const pivot = arr[high];
  let i = low - 1;

  // Highlight pivot
  animations.push({
    type: 'pivot',
    index: high,
  });

  for (let j = low; j < high; j++) {
    // Compare with pivot
    animations.push({
      type: 'compare',
      indices: [j, high],
    });

    if (arr[j] < pivot) {
      i++;
      if (i !== j) {
        // Swap
        animations.push({
          type: 'swap',
          indices: [i, j],
          values: [arr[j], arr[i]],
        });
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  // Place pivot in correct position
  if (i + 1 !== high) {
    animations.push({
      type: 'swap',
      indices: [i + 1, high],
      values: [arr[high], arr[i + 1]],
    });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  }

  // Mark pivot as sorted
  animations.push({
    type: 'sorted',
    index: i + 1,
  });

  return i + 1;
}