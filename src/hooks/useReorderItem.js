import React from 'react'

export default function useReorderItem() {
  // a little function to help us with reordering the result
  return React.useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }, []);

}

