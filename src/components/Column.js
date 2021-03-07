import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task'

export default function Column({ column, tasks }) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) =>
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, i) => (
              <Task
                key={task.id}
                task={task}
                index={i}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        }
      </Droppable>
    </Container>
  )
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px
  
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`;