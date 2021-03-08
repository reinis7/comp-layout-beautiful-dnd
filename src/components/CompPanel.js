import React, { useCallback } from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components';

import PreviewSource from 'components/PreviewSource'
import RenderComp from 'components/RenderComp'

import { COMPONENTS_COLUMN_ID, CODE_NAME, CONTENT_NAME } from 'helper/constants'
import { chooseComponent, removeItemFromLayouts } from 'store/actions'

export default function ComponentPanel() {

  const components = useSelector(state => state.layout.components);
  const dispatch = useDispatch();

  const handleItemClick = useCallback((item) => {
    dispatch(chooseComponent(item))
  }, [dispatch])

  const [tabStatus, setTabStatus] = React.useState(CONTENT_NAME);

  const handleRemoveItem = React.useCallback((item) => {
    dispatch(removeItemFromLayouts(item.id))
  }, [dispatch]);

  return (
    <div>
      <div>
        <SwitchButton
          onClick={() => setTabStatus(CONTENT_NAME)}
          disabled={tabStatus === CONTENT_NAME}
        >
          Layout
        </SwitchButton>
        <SwitchButton
          onClick={() => setTabStatus(CODE_NAME)}
          disabled={tabStatus === CODE_NAME}
        >
          CodeLines
        </SwitchButton>
      </div>
      <div>
        {tabStatus === CONTENT_NAME ?
          (<Droppable droppableId={COMPONENTS_COLUMN_ID}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {_.isArray(components) && components.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <RenderCompWrapper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        onClick={() => handleItemClick(item)}
                      >
                        <RenderComp {...item} />
                        <CloseButton
                          key={item.id}
                          onClick={() => handleRemoveItem(item)}
                        >
                          x
							        </CloseButton>
                      </RenderCompWrapper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>) : (
            <PreviewSource />
          )}
      </div>
    </div>
  )
}

const RenderCompWrapper = styled.div`
  border: 1px solid rgb(136, 136, 136);
  position: relative;
  userSelect: "none";  
  margin: 0 0 10px 0;  
  background: ${props => props.isDragging ? "lightgreen" : "grey"};
  p {
    margin-block-start: 0.25rem;
    margin-block-end: 0.25rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-left: 0.25rem;
  }

`
const SwitchButton = styled.button`

`
const CloseButton = styled.div`
    position: absolute;
    right: 5px;
    top: -5px;
    font-weight: bold;
    cursor: pointer;
		z-index: 100
`

