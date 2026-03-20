export function getBubbleSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Record comparison
      animations.push({
        type: 'compare',
        indices: [j, j + 1],
      });

      if (arr[j] > arr[j + 1]) {
        // Record swap
        animations.push({
          type: 'swap',
          indices: [j, j + 1],
          values: [arr[j + 1], arr[j]],
        });
        // Actually swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      } else {
        // No swap, just mark as compared
        animations.push({
          type: 'noSwap',
          indices: [j, j + 1],
        });
      }
    }

    // Mark last element as sorted
    animations.push({
      type: 'sorted',
      index: n - i - 1,
    });
  }

  // Mark first element as sorted too
  animations.push({
    type: 'sorted',
    index: 0,
  });

  return animations;
}