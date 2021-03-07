import React, { useCallback, useEffect } from 'react'
import _ from 'lodash'
import { DragDropContext } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'


import ToolPanel from 'components/ToolPanel'
import CompPanel from 'components/CompPanel'

import useReorderItem from 'hooks/useReorderItem'
import * as actions from 'store/actions'
import * as utils from 'helper/utils'

import { TOOLS_COLUMN_ID, COMPONENTS_COLUMN_ID } from 'helper/constants'


export default function ComponentLayout() {

  const components = useSelector(state => state.layout.components);

  const reorderItem = useReorderItem();
  const dispatch = useDispatch();
  useEffect(() => {
    utils.getItems(10).map(item => {
      dispatch(actions.addItemToLayouts(item))
    })
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
        const newItems = reorderItem(
          components,
          result.source.index,
          result.destination.index
        );
        dispatch(actions.saveLayouts(newItems));
      } else if (source.droppableId === TOOLS_COLUMN_ID) {
        const addedItem = utils.genItem()
        components.splice(destination.index, 0, addedItem);
        console.log(components);
        dispatch(actions.saveLayouts(components));
      }
    }


    // action
  }, [components, dispatch, reorderItem]);
  console.log(components);
  return (
    <MultiLayout>
      <DragDropContext onDragEnd={onDragEnd}>
        <ToolPanel ></ToolPanel>
        <CompPanel></CompPanel>
      </DragDropContext>
    </MultiLayout >
  )
}

const MultiLayout = styled.div`    
  display: flex;
  justify-content: space-around;
`