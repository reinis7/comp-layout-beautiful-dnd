import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'

import useToolPaneItems from 'hooks/useToolPaneItems'
import { TOOLS_COLUMN_ID } from 'helper/constants'

export default function ToolPanel() {
  const compTypes = useToolPaneItems();
  return (
    <Droppable
      isDropDisabled={true}
      droppableId={TOOLS_COLUMN_ID}
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
  )
}
