import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components';

import { COMPONENTS_COLUMN_ID } from 'helper/constants'

export default function ComponentPanel() {

  const components = useSelector(state => state.layout.components);

  return (
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
  )
}

