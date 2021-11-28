export function arrayMove<T>(
  arr: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  const buffer = [...arr];

  if (
    fromIndex < 0 ||
    fromIndex >= arr.length ||
    toIndex < 0 ||
    toIndex >= arr.length
  ) {
    // throw new Error("Array index out of range.");
    return arr;
  }

  if (fromIndex > toIndex) {
    const tempVal = arr[fromIndex];
    // 前移
    for (let index = fromIndex; index > toIndex; index--) {
      buffer[index] = buffer[index - 1];
    }
    buffer[toIndex] = tempVal;
  } else {
    // 后移
    const tempVal = arr[fromIndex];
    // 前移
    for (let index = fromIndex; index < toIndex; index++) {
      buffer[index] = buffer[index + 1];
    }
    buffer[toIndex] = tempVal;
  }

  return buffer;
}
