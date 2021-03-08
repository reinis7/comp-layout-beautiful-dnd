import React from 'react'
import * as utils from 'helper/utils'

export default function useCopyItem() {
  // a little function to help us with reordering the result
  return React.useCallback((source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, utils.genItem(item.type));
    return destClone;
  }, []);
}

