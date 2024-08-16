import Die from './components/Die'
import React from 'react';
import Confetti from 'react-confetti'
import {nanoid} from 'nanoid'
import './App.css'


function App() {
  const [dice, setDice] = React.useState(allNewDie());
  const [tenzies,setTenzies] = React.useState(false);

  React.useEffect(()=> {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You Won!!")
    }
}, [dice])

  function generateNewDie(){
    return {
        value: Math.ceil(Math.random()*6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDie() {

    const newDice = [];
    for(let i=0; i<10; i++){
      newDice.push(generateNewDie())
    }
    return newDice;
  }
  function rollDice(event) {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die : 
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDie())
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElement = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
  ))
  // const { width, height } = useWindowSize()
  
  return (
    <main>
      {/* <Confetti
      width={width}
      height={height}
    /> */}
      {tenzies && <Confetti recycle={false} numberOfPieces={2000} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button 
        className="dice-roll"
        onClick={rollDice}
      >{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
