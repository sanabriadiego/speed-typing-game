import {React, useState, useEffect, useRef} from "react";
import "./App.css"

function App(){
  const TIME_FOR_GAME = 10
  const [text, setText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(TIME_FOR_GAME)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const textRef = useRef(null)

  function saveText(event){
    const words = event.target.value
    setText(words)
  }

  function countWords(str){
    //We use trim to eliminate the spaces that exist before and after the string
    const wordsArray = str.trim().split(" ")
    //To eliminate the spaces in between the words we use filter. Just filter all the words that are not white spaces
    const noSpaceArray = wordsArray.filter(word => word !== "")
    const lengthArray = noSpaceArray.length
    return lengthArray
  }

  function startGame(){
    setIsTimeRunning(true)
    setTimeRemaining(TIME_FOR_GAME)
    setWordCount(0)
    setText("")
    //Due to some conflicts with useEffect we have to specify that the text are should not be disabled and then it should focus that element.
    textRef.current.disabled = false
    textRef.current.focus()
  }

  function endGame(){
    setIsTimeRunning(false)
    setWordCount(countWords(text))
  }

  useEffect(()=>{
    if(isTimeRunning && timeRemaining > 0){
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    }
    else if(timeRemaining === 0){
      endGame()
    }
  },[timeRemaining, isTimeRunning])

  return(
    <div>
      <h1>How fast do you type?</h1>
      <textarea ref={textRef} disabled={!isTimeRunning} onChange={saveText} value={text}/>
      <h4>Time remaining: {timeRemaining}</h4>
      <button disabled={isTimeRunning} onClick={startGame}>START</button>
      <h1>Word count: {wordCount}</h1>
    </div>
  )
}

export default App