export function getMergeSortAnimations(array) {
  const animations = [];
  const arr = [...array];
  const auxArr = [...array];

  mergeSortHelper(arr, 0, arr.length - 1, auxArr, animations);
  return animations;
}

function mergeSortHelper(arr, start, end, auxArr, animations) {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  // Recursively sort left and right halves
  mergeSortHelper(auxArr, start, mid, arr, animations);
  mergeSortHelper(auxArr, mid + 1, end, arr, animations);

  // Merge the two halves
  merge(arr, start, mid, end, auxArr, animations);
}

function merge(arr, start, mid, end, auxArr, animations) {
  let k = start;
  let i = start;
  let j = mid + 1;

  while (i <= mid && j <= end) {
    // Compare elements
    animations.push({
      type: 'compare',
      indices: [i, j],
    });

    if (auxArr[i] <= auxArr[j]) {
      // Overwrite arr[k] with auxArr[i]
      animations.push({
        type: 'overwrite',
        index: k,
        value: auxArr[i],
      });
      arr[k++] = auxArr[i++];
    } else {
      // Overwrite arr[k] with auxArr[j]
      animations.push({
        type: 'overwrite',
        index: k,
        value: auxArr[j],
      });
      arr[k++] = auxArr[j++];
    }
  }

  while (i <= mid) {
    animations.push({
      type: 'compare',
      indices: [i, i],
    });
    animations.push({
      type: 'overwrite',
      index: k,
      value: auxArr[i],
    });
    arr[k++] = auxArr[i++];
  }

  while (j <= end) {
    animations.push({
      type: 'compare',
      indices: [j, j],
    });
    animations.push({
      type: 'overwrite',
      index: k,
      value: auxArr[j],
    });
    arr[k++] = auxArr[j++];
  }
}