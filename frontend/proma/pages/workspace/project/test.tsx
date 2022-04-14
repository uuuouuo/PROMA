import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Box = styled.div`
  background-color: red;
  width: 100px;
  height: 100px;
  color: white;
`;

const Test = () => {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    One
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
              {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    Two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Test;
