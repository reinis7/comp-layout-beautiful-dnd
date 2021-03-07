import React, { useCallback } from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components';

import PreviewSource from 'components/PreviewSource'
import RenderComp from 'components/RenderComp'

import { COMPONENTS_COLUMN_ID, CODE_NAME, CONTENT_NAME } from 'helper/constants'
import { chooseComponent } from 'store/actions'

export default function ComponentPanel() {

  const components = useSelector(state => state.layout.components);
  const dispatch = useDispatch();

  const handleItemClick = useCallback((item) => {
    dispatch(chooseComponent(item))
  }, [dispatch])

  const [tabStatus, setTabStatus] = React.useState(CONTENT_NAME);

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
                        onClick={() => handleItemClick(item)}
                      >
                        <RenderComp {...item} />
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
`
const SwitchButton = styled.button`

`