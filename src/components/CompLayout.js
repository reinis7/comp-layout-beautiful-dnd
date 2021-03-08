import React, { useCallback, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'


import ToolPanel from 'components/ToolPanel'
import CompProperty from 'components/CompProperty'
import CompPanel from 'components/CompPanel'

import useReorderItem from 'hooks/useReorderItem'
import useToolPaneItems from 'hooks/useToolPaneItems'
import * as actions from 'store/actions'
import * as utils from 'helper/utils'
import { TOOLS_COLUMN_ID, COMPONENTS_COLUMN_ID } from 'helper/constants'


export default function ComponentLayout() {

  const components = useSelector(state => state.layout.components);
  const chooseItem = useSelector(state => state.layout.chooseItem);
  const compTypes = useToolPaneItems();


  const reorderItem = useReorderItem();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchLayoutItems())
  }, [dispatch])

  const onDragEnd = useCallback((result) => {
    // dropped outside the list
    const { source, destination } = result;
    if (!result.destination) {
      return;
    }
    if (destination.droppableId === COMPONENTS_COLUMN_ID) {
      if (destination.droppableId === source.droppableId) {
        if (destination.index === source.index) {
          return;
        }
        const newComponents = reorderItem(
          components,
          result.source.index,
          result.destination.index
        );
        dispatch(actions.saveLayouts(newComponents));
      } else if (source.droppableId === TOOLS_COLUMN_ID) {
        const addedItem = utils.genItem(compTypes[source.index].id)
        console.log(components);
        components.splice(destination.index, 0, addedItem);
        dispatch(actions.saveLayouts(components));
      }
    }
    // action
  }, [components, dispatch, reorderItem, compTypes]);

  return (
    <RootWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <CompPanelWrapper>
          <CompPanel></CompPanel>
        </CompPanelWrapper>
        <ToolPanelWrapper>
          {chooseItem ? (<CompProperty></CompProperty>) : (<ToolPanel></ToolPanel>)}
        </ToolPanelWrapper>
      </DragDropContext>
    </RootWrapper >
  )
}

const RootWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 20px;
    display: flex;

`

const ToolPanelWrapper = styled.div`
    flex: 1 0 20%;
    width: 20%;
    max-width: 230px;
    min-width: 230px;
    height: 100vm;
    padding: 10px;
    background-color: #4caf50;
`

const CompPanelWrapper = styled.div`
    flex: 1 0 80%;
    width: 80%;
    max-width: 450px;
    height: 100%;
    padding: 10px;
    background-color: #eeeeee;
    min-height: 20rem;
`

const Content = styled.div`
  margin-right: 200px;
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

const Handle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 200px;
`;

const Container = styled(List)`
  margin: 0.5rem 0.5rem 1.5rem;
`;

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

const Button = styled.button`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: #000;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
`;

const ButtonText = styled.div`
  margin: 0 1rem;
`;
