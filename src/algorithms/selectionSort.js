export function getSelectionSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      // Compare current with minimum
      animations.push({
        type: 'compare',
        indices: [minIdx, j],
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      // Record swap
      animations.push({
        type: 'swap',
        indices: [i, minIdx],
        values: [arr[minIdx], arr[i]],
      });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    // Mark as sorted
    animations.push({
      type: 'sorted',
      index: i,
    });
  }

  // Mark last element as sorted
  animations.push({
    type: 'sorted',
    index: n - 1,
  });

  return animations;
}