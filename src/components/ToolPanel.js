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
          <Kiosk
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {_.isArray(compTypes) && compTypes.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}>
                {(provided, snapshot) => (
                  <>
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {item.content}
                    </Item>
                    {snapshot.isDragging && (
                      <Clone>{item.content}</Clone>
                    )}
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Kiosk>
        )}
      </Droppable>
      <ButtonText onClick={onRemoveAllItem}> Remove All </ButtonText>
    </div>
  )
}

const ButtonText = styled.button`
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  margin: 1rem;
`;

const Item = styled.div`
  display: flex;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0  0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};

 `;

const Clone = styled(Item)`
  + div {
    display: none!important;
  }
`;

const List = styled.div`
  border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const Kiosk = styled(List)`
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
`;