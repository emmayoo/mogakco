import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import Board from './Board';

interface IList {
  [key: string]: { id: number; text: string }[];
}

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const tempData: IList = {
  board1: [
    { id: 0, text: 'test0' },
    { id: 1, text: 'test1' },
  ],
  board2: [
    { id: 2, text: 'test2' },
    { id: 3, text: 'test3' },
  ],
};

const Home = () => {
  const [list, setList] = useState<IList>(tempData);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    // 제자리에 두는 경우
    if (!destination) return;
    setList((oldToDos) => {
      // 같은 droppableId
      if (source.droppableId === destination.droppableId) {
        const board = [...oldToDos[source.droppableId]];
        const task = board.splice(source.index, 1);
        board.splice(destination?.index, 0, task[0]);
        return {
          ...oldToDos,
          [source.droppableId]: board,
        };
      }
      // 다른 droppableId
      else {
        const sourceBoard = [...oldToDos[source.droppableId]];
        const destinationBoard = [...oldToDos[destination.droppableId]];
        const task = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, task[0]);
        return {
          ...oldToDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(list).map((boardId) => (
            <Board list={list[boardId]} boardId={boardId} key={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};
export default Home;
