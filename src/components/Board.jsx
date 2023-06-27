import { useState } from "react"


function checkWinner(squares) {
    const condition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < condition.length; i++) {
        const [a, b, c] = condition[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a]
        }
    }
    return null


}
function Square({ value, handleClick }) {

    return <button onClick={handleClick}>{value}</button>
}

function Restart({ handleClick }) {
    return <button className="restart" onClick={handleClick}>Restart</button>
}

export default function Board() {
    const [xIsNext, setxIsNext] = useState(true)
    const [squares, setSquare] = useState(Array(9).fill(null))

    const winner = checkWinner(squares)
    let status;
    if (winner) {
        status = `The winner of the round is ${winner}`
    } else {
        status = `The next turn is ${xIsNext ? 'X' : 'O'}`
    }

    function handleSquareClick(i) {
        if (winner) return
        if (squares[i]) return
        const nextSquares = squares.slice()
        if (xIsNext) {
            nextSquares[i] = 'X'

        } else {
            nextSquares[i] = 'O'
        }
        setSquare(nextSquares)
        setxIsNext(!xIsNext)
    }
    function handleRestart() {
        setxIsNext(true)
        setSquare(Array(9).fill(null))
    }
    return (
        <>
        <div className="game">

            <p className="status">{status}</p>
            <div className="game-board">
                <Square value={squares[0]} handleClick={() => handleSquareClick(0)} />
                <Square value={squares[1]} handleClick={() => handleSquareClick(1)} />
                <Square value={squares[2]} handleClick={() => handleSquareClick(2)} />
                <Square value={squares[3]} handleClick={() => handleSquareClick(3)} />
                <Square value={squares[4]} handleClick={() => handleSquareClick(4)} />
                <Square value={squares[5]} handleClick={() => handleSquareClick(5)} />
                <Square value={squares[6]} handleClick={() => handleSquareClick(6)} />
                <Square value={squares[7]} handleClick={() => handleSquareClick(7)} />
                <Square value={squares[8]} handleClick={() => handleSquareClick(8)} />
            </div>
            <Restart handleClick={() => handleRestart()} />
        </div>
        </>
    )
}