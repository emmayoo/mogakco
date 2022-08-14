import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IDates } from './index';

interface IDatesBoardProps {
  dates: IDates[][];
  today: string;
  toDos: { [key: string]: { id: number; job: string }[] };
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Weeks = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`;

const Dates = styled.div<{ bgColor: string; isWeek?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  background-color: ${(props) => props.bgColor};
  justify-content: space-evenly;
  align-items: stretch;
  ${(props) => props.isWeek && 'flex: 1;'}
`;

const Date = styled.div<{ color?: string }>`
  flex: 1;
  text-align: center;
  ${(props) => props.color && `color: ${props.color}`};
  outline: 1px solid black;
  height: 100%;
`;

const Title = styled.p`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => (props.isDragging ? '#e4f2ff' : 'white')};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.05)' : 'none'};
`;

const DatesBoard = ({ dates, today, toDos }: IDatesBoardProps) => {
  return (
    <Weeks>
      {dates.map((week, i) => (
        <Dates key={i} bgColor="yellow" isWeek={true}>
          {week.map((d) => (
            <Date key={d.id} color={d.color}>
              <Title>
                {d.date} {d.fullDate === today && '(오늘!)'}
              </Title>
              <Droppable droppableId={'dr-' + d.month + '-' + d.date}>
                {(magic, snapshot) => (
                  <Area
                    isDraggingOver={snapshot.isDraggingOver}
                    isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                  >
                    {toDos[d.month + '-' + d.date] &&
                      toDos[d.month + '-' + d.date].map((toDo, index) => (
                        <Draggable
                          draggableId={'j-' + toDo.id}
                          index={index}
                          key={toDo.id}
                        >
                          {(magic, snapshot) => (
                            <Card
                              ref={magic.innerRef}
                              isDragging={snapshot.isDragging}
                              {...magic.dragHandleProps}
                              {...magic.draggableProps}
                            >
                              {toDo.job}
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {magic.placeholder}
                  </Area>
                )}
              </Droppable>
            </Date>
          ))}
        </Dates>
      ))}
    </Weeks>
  );
};

export default DatesBoard;
