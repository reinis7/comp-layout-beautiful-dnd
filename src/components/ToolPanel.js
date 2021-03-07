import React, { useMemo } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import _ from 'lodash'

import {
  LINK_LABEL, TEXT_LABEL, IMAGE_LABEL, VIDEO_LABEL, CUSTOM_HTML_LABEL, TOOLS_COLUMN_ID,
} from 'helper/constants'

export default function ToolPanel() {
  const compTypes = useMemo(() => {
    return [
      { id: LINK_LABEL, content: LINK_LABEL },
      { id: TEXT_LABEL, content: TEXT_LABEL },
      { id: IMAGE_LABEL, content: IMAGE_LABEL },
      { id: VIDEO_LABEL, content: VIDEO_LABEL },
      { id: CUSTOM_HTML_LABEL, content: CUSTOM_HTML_LABEL }
    ]
  }, []);

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
