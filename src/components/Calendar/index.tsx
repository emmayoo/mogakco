import styled from 'styled-components';
import moment from 'moment';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import DatesBoard from './DatesBoard';

export interface IDates {
  id: number;
  month: string;
  date: number;
  color?: string;
  fullDate: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  background-color: rgb(224, 215, 202);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: rgb(127, 184, 127);
  display: flex;
  flex-flow: column nowrap;
`;

const ArrowButton = styled.div`
  width: 30px;
  height: 30px;
  font-weight: bold;
  position: relative;

  line-height: 26px;
  padding: 0px 8px;

  div {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff3;
    opacity: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
  div:hover {
    opacity: 1;
  }
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

const Weeks = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`;

const getColor = (v: number) => {
  if (v === 0) return 'red';
  else if (v === 6) return 'blue';
};

const makeDateList = (month: moment.Moment) => {
  const list = [];
  const firstDayOfMonth = moment(month).startOf('month');
  const firstDateOfMonth = firstDayOfMonth.get('d');
  const firstDayOfWeek = firstDayOfMonth.clone().add(-firstDateOfMonth, 'd');
  const tempDate = firstDayOfWeek.clone();

  let isNewMonth = false;
  let id = 0;
  while (!isNewMonth) {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      const date = tempDate.date();
      if (list.length > 0 && date === 1) isNewMonth = true;
      arr.push({
        id,
        date,
        month: tempDate.format('M'),
        color: getColor(tempDate.day()),
        fullDate: tempDate.format('YYYY-MM-DD'),
      });
      tempDate.add(1, 'd');
      id++;
    }
    list.push(arr);
  }
  return list;
};

const today = moment();

const days: { id: number; ko: string; en: string; color?: string }[] = [
  { id: 0, ko: '일', en: 'Sun', color: getColor(0) },
  { id: 1, ko: '월', en: 'Mon' },
  { id: 2, ko: '화', en: 'Tus' },
  { id: 3, ko: '수', en: 'Wed' },
  { id: 4, ko: '목', en: 'Thu' },
  { id: 5, ko: '금', en: 'Fri' },
  { id: 6, ko: '토', en: 'Sat', color: getColor(6) },
];

const initTodos = {
  '8-2': [
    { id: 1, job: '1' },
    { id: 2, job: '2' },
  ],
  '8-3': [{ id: 3, job: '3' }],
};

const Calendar = () => {
  const [dates, setDates] = useState<IDates[][]>([]);
  const [month, setMonth] = useState(moment());
  const [move, setMove] = useState(0);
  const [toDos, setToDos] = useState(initTodos);

  const onChangeMonth = (v: number) => {
    setMove(move + v);
  };

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    // 제자리에 두는 경우
    if (!destination) return;

    setToDos((oldToDos) => {
      const copied = JSON.parse(JSON.stringify(oldToDos));
      // 같은 droppableId
      if (source.droppableId === destination.droppableId) {
        const board = copied[destination.droppableId.replace('dr-', '')];
        const task = board.splice(source.index, 1);
        board.splice(destination?.index, 0, task[0]);
      }
      // 다른 droppableId
      else {
        const sourceBoard = copied[source.droppableId.replace('dr-', '')];
        const destinationBoard =
          copied[destination.droppableId.replace('dr-', '')];
        const task = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, task[0]);
      }
      return copied;
    });
  };

  useEffect(() => {
    const newMonth = moment();
    setMonth(newMonth.add(move, 'M'));
    setDates(makeDateList(newMonth));
  }, [move]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Header>
          <ArrowButton onClick={() => onChangeMonth(-1)}>
            &lt;
            <div />
          </ArrowButton>
          <ArrowButton onClick={() => onChangeMonth(1)}>
            &gt;
            <div />
          </ArrowButton>
          {month.format('YYYY년 MM월')}
          &nbsp; (오늘: {today.format('YYYY년 MM월 DD일')})
        </Header>
        <Content>
          <Dates bgColor="gray">
            {days.map((d) => (
              <Date key={d.id} color={d.color}>
                {d.ko}
              </Date>
            ))}
          </Dates>
          <DatesBoard
            dates={dates}
            today={today.format('YYYY-MM-DD')}
            toDos={toDos}
          />
        </Content>
      </Container>
    </DragDropContext>
  );
};

export default Calendar;
