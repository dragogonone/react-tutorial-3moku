import React, { useState } from 'react';
import Board from './Board';
import Moves from './Moves';
import type { History, ISquare } from '../interface';

const Game: React.FC = () => {
  const [history, setHistory] = useState<History[]>([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepnumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  /**
   * マスがクリックされたときの挙動
   */
  const handleClick = (i: number) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      _history.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepnumber(_history.length);
    setXIsNext(!xIsNext);
  };

  /**
   * 指定した局面に戻る
   */
  const jumpTo = (step: number) => {
    setStepnumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Moves history={history} jumpTo={jumpTo}></Moves>
      </div>
    </div>
  );
};

/**
 * 勝利者を判定する。
 */
function calculateWinner(squares: Array<ISquare>) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
