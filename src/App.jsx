import React, { useState } from 'react'
import './App.css'
import './index.css'

//Turnos.
const TURNS = { X: 'x', O: 'o' }

//Elemento cuadrado en el que se contienen los numeros del array, el indice y un método para actualizar.
const Square = ({ children, isSelected ,updateBoard, index }) => {
//Constante clase que cambia dependiendo de isSelected
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children} 
    </div>

  )
}

const WINNER_COMBOS = 
[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


function App() {
  //Estado del tablero y metodo para actualizar.
  const [board, setBoard] = useState(Array(9).fill(null))
  //Estado turno y actualizar turno.
  const [turn, setTurn] = useState(TURNS.X)
  //Estado ganador, null = no ganador, false = empate
  const[winner, setWinner] = useState(null) 

  const checkWinner = (boardToCheck) => {

    for(const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
      
      {
      return boardToCheck[a]
      }
  }
  //Si no hay ganador.
  return null
}

  
  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

  } 
  
  //Metodo actualizar el valor del tablero(Compartido por todos los cuadros).
  const updateBoard = (index) => {
    //Si la posicion marcada del tablero tiene ya una X o O, no actualizo.
    if(board[index]|| winner) return 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    const newBoard = [...board]
    //Establece X o O en el índice del tablero.
    newBoard[index] = newTurn
    //Muestra el nuevo tablero, actualizado con la última jugada.
    setBoard(newBoard)
    //Ternaria, si el turno es el de X pasa al de O y vicebersa
    setTurn(newTurn)
    //Revisar ganadores.
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      console.log(`El ganador es ${newWinner}`)
    } 

    

  }

  return (

    <main className='board'>
      <h1>Tic Tac Toe</h1>


      <section className='game'>
        {
          //Recorre el tablero y crea un cuadrado por cada uno
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>


      <section className='turn'>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.X}>
          {TURNS.O}
        </Square>

      </section>
      {
        winner !== null &&(
          <section className="winner">
            <div className="text">
          <h2>
          {
            winner === false 
            ? 'Empate'
            : 'Ganó:'
          }
          </h2>

        <header className="win">
          {winner && <Square>{winner}</Square>}

        </header>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>

          
        </div>
        </section>
        )
      }

    </main>


  )
}



export default App
