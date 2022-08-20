import styled from 'styled-components';
import { usePopper } from 'react-popper';
import { useRef, useState } from 'react';

const PopperContainer = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  text-align: center;
`;

interface IScheduleEditorProps {
  target: HTMLElement | null;
  isVisible: boolean;
}

const ScheduleEditor = ({ target, isVisible }: IScheduleEditorProps) => {
  const popperRef = useRef(null);
  const [arrowRef, setArrowRed] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(target, popperRef.current, {
    placement: 'left',
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowRef,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  if (!isVisible) return null;

  return (
    <PopperContainer
      ref={popperRef}
      style={styles.popper}
      {...attributes.popper}
    >
      <div ref={setArrowRed} style={styles.arrow} />
      <p>I'm a popper</p>
    </PopperContainer>
  );
};

export default ScheduleEditor;
