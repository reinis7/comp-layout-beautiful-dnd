import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import _ from 'lodash'

import useToolPaneItems from 'hooks/useToolPaneItems'
import { TOOLS_COLUMN_ID } from 'helper/constants'
import { deleteAllComponents } from 'store/actions';

export default function ToolPanel() {
  const compTypes = useToolPaneItems();
  const dispatch = useDispatch();

  const onRemoveAllItem = useCallback(() => {
    dispatch(deleteAllComponents())
  }, [dispatch])
  return (
    <div>
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
      <div>
        <RemoveButton onClick={onRemoveAllItem}> Remove All </RemoveButton>
      </div>
    </div>
  )
}

const RemoveButton = styled.button`
`;