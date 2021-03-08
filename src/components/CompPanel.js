import React, { useCallback, useState, useEffect } from 'react'
import ReactDOMServer from "react-dom/server"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'
import * as pretty from 'pretty'

import RenderComp from 'components/RenderComp'

import { COMPONENTS_COLUMN_ID, CONTENT_NAME } from 'helper/constants'
import { chooseComponent, removeItemFromLayouts, submitCodes } from 'store/actions'

export default function ComponentPanel() {
  const [codeLines, setCodeLines] = useState('');

  const components = useSelector(state => state.layout.components);
  const chooseItem = useSelector(state => state.layout.chooseItem);
  const dispatch = useDispatch();

  const handleItemClick = useCallback((item) => {
    dispatch(chooseComponent(item))
  }, [dispatch])

  useEffect(() => {
    console.log(components)
    const cc = pretty(ReactDOMServer.renderToStaticMarkup(
      components.map((item) => (
        <div key={item.id}>
          <RenderComp
            output={true}
            {...item}
          />
        </div>)
      )))
    setCodeLines(cc);
  }, [components])

  const handleRemoveItem = React.useCallback((item, e) => {
    if (chooseItem && chooseItem.id === item.id) {
      dispatch(chooseComponent(null));
    }

    dispatch(removeItemFromLayouts(item.id))
    e.stopPropagation();
  }, [dispatch, chooseItem]);

  const handleSumbmitCodes = React.useCallback(() => {
    dispatch(submitCodes(codeLines))
  }, [dispatch, codeLines]);


  return (
    <Content>
      <div>
        <Button
          onClick={handleSumbmitCodes}
        >
          <ButtonText>Sumbit</ButtonText>
        </Button>
      </div>
      <Droppable droppableId={COMPONENTS_COLUMN_ID}>
        {(provided, snapshot) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {_.isArray(components) && (components.length > 0 ? components.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <RenderCompWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    onClick={(e) => handleItemClick(item, e)}
                    choosed={chooseItem && chooseItem.id === item.id}
                  >
                    <RenderComp {...item} />
                    <CloseButton
                      key={item.id}
                      onClick={(e) => handleRemoveItem(item, e)}
                    >
                      x
                    </CloseButton>
                  </RenderCompWrapper>
                )}
              </Draggable>
            )) : (
              <Notice>Drop items here</Notice>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </Content >
  )
}

const RenderCompWrapper = styled.div`
  position: relative;
  user-select: none;
  padding: 0.5rem;
  margin: 0 0  0.5rem 0;
  align-items: flex-start;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
  background-color: ${props => (props.choosed ? '#ababab' : '#fff')};
  z-index: 1;  
  p {
    margin-block-start: 0.25rem;
    margin-block-end: 0.25rem;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-left: 0.25rem;
  }

`
const CloseButton = styled.div`
    position: absolute;
    right: 5px;
    top: -5px;
    font-weight: bold;
    cursor: pointer;
		z-index: 100
`


const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const Content = styled.div`
`;
const List = styled.div`
  border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  flex: 0 0 150px;
  font-family: sans-serif;
`;

const Container = styled(List)`
  margin: 0.5rem 0.5rem 1.5rem;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: ${props => props.disabled ? '#aaa' : '#000'};
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin: 0 1rem;
`;
