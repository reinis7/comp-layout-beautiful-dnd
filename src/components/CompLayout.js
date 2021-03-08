import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
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
  }, [components, dispatch, reorderItem]);
  console.log(components);
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
