"use client";
import { useState } from "react";
import { GrPowerReset, GrUndo } from "react-icons/gr";

const winning_moves = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

export default function Home() {
  const [values, setValues] = useState<string[]>([
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);

  const [xOrO, setXOrO] = useState("X");
  const [lastIndex, setLastIndex] = useState<number>(-1);
  const [activeWinner, setActiveWinner] = useState("");

  const switchXO = () => {
    if (xOrO == "X") setXOrO("O");
    else setXOrO("X");
  };

  const setVal = (index: number) => {
    if (values[index] != " ") return;
    values[index] = xOrO;
    setLastIndex(index);
    switchXO();
    setTimeout(() => checkWinner(), 100);
  };

  const clearAll = () => {
    setValues([" ", " ", " ", " ", " ", " ", " ", " ", " "]);
    setLastIndex(-1);
    setXOrO("X");
  };

  const undoMove = () => {
    if (lastIndex != -1) {
      values[lastIndex] = " ";
      setLastIndex(-1);
      switchXO();
    }
    switchXO();
  };

  const resetWinner = () => {
    setActiveWinner("");
  }

  const checkWinner = () => {
    winning_moves.forEach((item) => {
      if (
        values[item[0]] === values[item[1]] &&
        values[item[1]] === values[item[2]] &&
        values[item[0]] != " "
      ) {
        switchXO();
        setActiveWinner(xOrO);
        // alert(xOrO + " has won!!");
        clearAll();
      }
    });

    let num_x = 0,
      num_0 = 0;
    values.map((item) => {
      if (item == "X") {
        num_x++;
      }
      if (item == "O") {
        num_0++;
      }
    });
    if (num_0 + num_x == 9) {
      setActiveWinner("draw");
      clearAll();
    }
  };

  return (
    <div className="max-w-lg sm:px-10  py-8 p-4 flex flex-col gap-4 mx-auto">
      <h2 className="text-center text-4xl my-4 font-bold">The X-O Game!</h2>

      {activeWinner == "" && (
        <>
          <div className="grid grid-cols-2 text-center border-2  rounded-md">
            {xOrO == "X" ? (
              <>
                <div className="bg-sky-400 text-white font-semibold py-4">
                  Player 1 ( X )
                </div>
                <div className="py-4">Player 2 ( 0 )</div>
              </>
            ) : (
              <>
                <div className="py-4">Player 1 ( X )</div>
                <div className="bg-teal-400 text-white font-semibold py-4">
                  Player 2 ( 0 )
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {values.map((val, index) => (
              <span
                key={index}
                onClick={(e) => setVal(index)}
                className={
                  " p-4 py-8 text-center cursor-pointer rounded bg-gray-100 text-white font-black" +
                  (val == "X" ? " bg-sky-400  " : " bg-gray-100") +
                  (val == "O" ? " bg-teal-400" : " bg-gray-100")
                }
              >
                {val == " " ? (
                  <span className="text-gray-100">Z</span>
                ) : (
                  <>{val}</>
                )}
              </span>
            ))}
          </div>

          <div className="flex gap-4 ">
            <button
              className="bg-red-500 hover:bg-red-600 shadow hover:shadow-lg  px-4 py-2 rounded text-white flex gap-3 items-center"
              onClick={(e) => clearAll()}
            >
              <GrPowerReset />
              Clear All
            </button>

            <button
              disabled={lastIndex == -1}
              onClick={(e) => undoMove()}
              className="disabled:bg-neutral-200 disabled:hover:cursor-not-allowed bg-slate-400 hover:bg-slate-600 shadow hover:shadow-lg  px-4 py-2 rounded text-white flex gap-3 items-center"
            >
              <GrUndo />
              Undo
            </button>
          </div>
        </>
      )}

      {(activeWinner == "X" || activeWinner == "O") && (
        <div className="bg-yellow-400  py-10 px-10 cursor-pointer rounded-lg shadow-md shadow-yellow-200 text-center hover:shadow-xl hover:shadow-yellow-200 " onClick={resetWinner}>
          <div className="mb-4 text-4xl">🎉🎉</div>
          <h2 className="text-4xl font-semibold mb-4">
          &rdquo;{activeWinner}&rdquo; has won the round.
          </h2>
          <small>Click to continue....</small>
        </div>
      )}

      {activeWinner == "draw" && (
        <div className="bg-gray-200  py-10 px-10 cursor-pointer rounded-lg shadow-md  text-center hover:shadow-lg hover:shadow-gray-200 " onClick={resetWinner}>
          <div className="mb-4 text-4xl">🤝</div>
          <h2 className="text-4xl font-semibold mb-4">Match is draw.</h2>
          <small>Click to continue....</small>
        </div>
      )}
    </div>
  );
}
