export function getHeapSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Swap root with last element
    animations.push({
      type: 'swap',
      indices: [0, i],
      values: [arr[i], arr[0]],
    });
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Mark as sorted
    animations.push({
      type: 'sorted',
      index: i,
    });

    // Heapify the reduced heap
    heapify(arr, i, 0, animations);
  }

  // Mark first element as sorted
  animations.push({
    type: 'sorted',
    index: 0,
  });

  return animations;
}

function heapify(arr, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    animations.push({
      type: 'compare',
      indices: [largest, left],
    });
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    animations.push({
      type: 'compare',
      indices: [largest, right],
    });
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    animations.push({
      type: 'swap',
      indices: [i, largest],
      values: [arr[largest], arr[i]],
    });
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    heapify(arr, n, largest, animations);
  }
}