import React from 'react';
import { History } from '../interface';

interface MovesProps {
  history: History[];
  jumpTo: (turn: number) => void;
}

const Moves: React.FC<MovesProps> = ({ history, jumpTo }) => {
  return (
    <ol>
      {history.map((step, turn) => {
        const desc = turn ? `col: ${step.col}, row: ${step.row}` : 'Go to game start';
        return (
          <li key={turn}>
            <button onClick={() => jumpTo(turn)}>{desc}</button>
          </li>
        );
      })}
    </ol>
  );
};

export default Moves;
