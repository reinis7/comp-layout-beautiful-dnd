import React, { useState, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import useReorderItem from 'hooks/useReorderItem'
import * as actions from 'store/actions'

import * as utils from 'helper/utils'


export default function ComponentLayout() {

  const components = useSelector(state => state.layout.components);
  console.log(components);

  const reorderItem = useReorderItem();
  const dispatch = useDispatch();
  useEffect(() => {
    utils.getItems(10).map(item => {
      dispatch(actions.addItemToLayouts(item))
    })
  }, [dispatch])

  const onDragEnd = useCallback((result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorderItem(
      components,
      result.source.index,
      result.destination.index
    );
    dispatch(actions.saveLayouts(newItems));
    // action
  }, [components, dispatch, reorderItem]);
  console.log(components);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          // style={getListStyle(snapshot.isDraggingOver)}
          >
            {_.isArray(components) && components.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  // style={getItemStyle(
                  //   snapshot.isDragging,
                  //   provided.draggableProps.style
                  // )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}

      </Droppable>
    </DragDropContext>
  )
}
