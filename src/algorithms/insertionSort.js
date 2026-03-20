export function getInsertionSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  // Mark first element as sorted
  animations.push({
    type: 'sorted',
    index: 0,
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Highlight current element
    animations.push({
      type: 'current',
      index: i,
    });

    while (j >= 0 && arr[j] > key) {
      // Compare
      animations.push({
        type: 'compare',
        indices: [j, j + 1],
      });

      // Overwrite
      animations.push({
        type: 'overwrite',
        index: j + 1,
        value: arr[j],
      });

      arr[j + 1] = arr[j];
      j--;
    }

    // Place key in correct position
    animations.push({
      type: 'overwrite',
      index: j + 1,
      value: key,
    });
    arr[j + 1] = key;

    // Mark all elements up to i as sorted
    animations.push({
      type: 'sorted',
      index: i,
    });
  }

  return animations;
}