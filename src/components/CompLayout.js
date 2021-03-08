import React, { useCallback, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'


import ToolPanel from 'components/ToolPanel'
import CompProperty from 'components/CompProperty'
import CompPanel from 'components/CompPanel'

import useReorderItem from 'hooks/useReorderItem'
import useCopyItem from 'hooks/useCopyItem'
import useToolPaneItems from 'hooks/useToolPaneItems'
import * as actions from 'store/actions'
import { TOOLS_COLUMN_ID } from 'helper/constants'


export default function ComponentLayout() {

  const components = useSelector(state => state.layout.components);
  const chooseItem = useSelector(state => state.layout.chooseItem);
  const compTypes = useToolPaneItems();


  const reorderItem = useReorderItem();
  const copyItem = useCopyItem();

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
    let newComponents = [];
    switch (source.droppableId) {
      case destination.droppableId:
        newComponents = reorderItem(
          components,
          source.index,
          destination.index
        );
        break;
      case TOOLS_COLUMN_ID: {
        newComponents = copyItem(
          compTypes,
          components,
          source,
          destination
        )
        break;
      }
      default: {
        break;
      }
    }
    dispatch(actions.saveLayouts(newComponents));
  }, [components, dispatch, reorderItem, compTypes, copyItem]);
  console.log('chooseItem --', chooseItem)

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
    max-width: 80%;
    height: 100%;
    padding: 10px;
    background-color: #eeeeee;
    min-height: 20rem;
`
