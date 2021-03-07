import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import useReorderItem from 'hooks/useReorderItem'
import * as actions from 'store/actions'

import * as utils from 'helper/utils'
import { LINK_LABEL, TEXT_LABEL, IMAGE_LABEL, VIDEO_LABEL, CUSTOM_HTML_LABEL } from 'helper/constants'

import styled from 'styled-components';

const TOOLS_COLUMN_ID = 'TOOL_COLUMN_ID'
const COMPONENTS_COLUMN_ID = 'COMPONENTS_COLUMN_ID'

export default function ComponentLayout() {

  const components = useSelector(state => state.layout.components);

  const compTypes = useMemo(() => {
    return [
      { id: LINK_LABEL, content: LINK_LABEL },
      { id: TEXT_LABEL, content: TEXT_LABEL },
      { id: IMAGE_LABEL, content: IMAGE_LABEL },
      { id: VIDEO_LABEL, content: VIDEO_LABEL },
      { id: CUSTOM_HTML_LABEL, content: CUSTOM_HTML_LABEL }
    ]
  }, []);

  const reorderItem = useReorderItem();
  const dispatch = useDispatch();
  useEffect(() => {
    utils.getItems(10).map(item => {
      dispatch(actions.addItemToLayouts(item))
    })
  }, [dispatch])

  const onDragEnd = useCallback((result) => {
    // dropped outside the list
    const { source, destination } = result;
    console.log(source, destination);
    if (!result.destination) {
      return;
    }
    if (destination.droppableId === COMPONENTS_COLUMN_ID) {
      if (destination.droppableId === source.droppableId) {
        if (destination.index === source.index) {
          return;
        }
        const newItems = reorderItem(
          components,
          result.source.index,
          result.destination.index
        );
        dispatch(actions.saveLayouts(newItems));
      } else if (source.droppableId === TOOLS_COLUMN_ID) {
        const addedItem = utils.genItem()
        components.splice(destination.index, 0, addedItem);
        console.log(components);
        dispatch(actions.saveLayouts(components));
      }
    }


    // action
  }, [components, dispatch, reorderItem]);
  console.log(components);
  return (
    <MultiLayout>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={TOOLS_COLUMN_ID}
          isDropDisabled={true}
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {_.isArray(compTypes) && compTypes.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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

        <Droppable droppableId={COMPONENTS_COLUMN_ID}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {_.isArray(components) && components.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
    </MultiLayout >
  )
}

const MultiLayout = styled.div`    
  display: flex;
  justify-content: space-around;
`