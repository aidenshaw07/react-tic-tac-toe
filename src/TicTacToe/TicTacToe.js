import React from "react";
import "./TicTacToe.css";
import { useState } from "react";

const TicTacToe = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  const handleClick = (num) => {
    let squares = [...cells];

    if (cells[num] !== "") {
      return;
    }

    if (turn === "x") {
      squares[num] = "x";
      setTurn("o");
    } else {
      squares[num] = "o";
      setTurn("x");
    }
    setCells(squares);
    checkForWinner(squares);
  };

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((click) => {
        if (
          squares[click[0]] === "" ||
          squares[click[1]] === "" ||
          squares[click[2]] === ""
        ) {
        } else if (
          squares[click[0]] === squares[click[1]] &&
          squares[click[0]] === squares[click[2]]
        ) {
          setWinner(squares[click[0]]);
          
        }
      });
    }
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = (props) => {
    return (
      <td onClick={() => handleClick(props.num)}>
        <h3>{cells[props.num]}</h3>
      </td>
    );
  };

  return (
    <div className="container">
      <table>
        <h1>Turn: {turn}</h1>
        <tr>
          <Cell num={0} />
          <Cell num={1} />
          <Cell num={2} />
        </tr>
        <tr>
          <Cell num={3} />
          <Cell num={4} />
          <Cell num={5} />
        </tr>
        <tr>
          <Cell num={6} />
          <Cell num={7} />
          <Cell num={8} />
        </tr>
      </table>
      {winner && (
        <>
          <h3>{winner} is the winner!</h3>
        </>
      )}


      <button onClick={() => handleRestart()}>Play Again</button>
    </div>
  );
};

export default TicTacToe;
