import styled, { keyframes } from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

const frontIssues = ["FrontEnd", "Design", "next", "ts"];
const backIssues = ["BackEnd", "java", "spring"];
const dbIssues = ["DB", "Deploy", "Redis", "MySQL"];

interface DarkModeType {
  theme: {
    bgColor: string;
    textColor: string;
  };
}

const ContextArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: purple;
  border-radius: 10px;
  color: white;
  margin: 0 200px;
  text-align: center;
  padding: 30px;
`;

const Boards = styled.div`
  display: flex;
  justify-contents: space-around;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props: DarkModeType) => props.theme.bgColor};
  color: ${(props: DarkModeType) => props.theme.textColor};
  justify-contents: space-around;
  border-radius: 10px;
  width: 400px;
  padding: 30px;
  margin-left: 30px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  padding-left: 20px;
  border-radius: 10px;
  background-color: green;
  height: 50px;
  margin: 10px 0;
  color: white;
`;

const Dnd = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  //유저가 드래그를 끝낸 시점에 불리는 함수
  const onDragEnd = (args: any) => {
    console.log(args);
  };

  useEffect(() => {
    setIsReady(true);
  }, []);
  return (
    <>
      {isReady ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <ContextArea>
            <h1>Sprint</h1>
            <Boards>
              <Droppable droppableId="one">
                {(provided) => (
                  <Board ref={provided.innerRef} {...provided.droppableProps}>
                    <h1>FrontEnd</h1>
                    {frontIssues.map((issue, index) => (
                      <Draggable draggableId={issue} index={index} key={issue}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.dragHandleProps} //드래그를 하기 위해 마우스로 선택할 수 있는 영역
                            {...provided.draggableProps} //드래그 되는 영역
                          >
                            {issue}
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Board>
                )}
              </Droppable>

              <Droppable droppableId="two">
                {(provided) => (
                  <Board ref={provided.innerRef} {...provided.droppableProps}>
                    <h1>BackEnd</h1>
                    {backIssues.map((issue, index) => (
                      <Draggable draggableId={issue} index={index} key={issue}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {issue}
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Board>
                )}
              </Droppable>

              <Droppable droppableId="three">
                {(provided) => (
                  <Board ref={provided.innerRef} {...provided.droppableProps}>
                    <h1>DB</h1>
                    {dbIssues.map((issue, index) => (
                      <Draggable draggableId={issue} index={index} key={issue}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {issue}
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Board>
                )}
              </Droppable>
            </Boards>
          </ContextArea>
        </DragDropContext>
      ) : null}
    </>
  );
};

export default Dnd;
