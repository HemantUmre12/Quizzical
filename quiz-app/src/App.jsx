import { useState, useEffect } from "react"
import NewQuiz from "./components/NewQuiz"
import Main from "./components/Main"

export default function App() {
  const [quizzical, setQuizzical] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('https://the-trivia-api.com/api/questions?limit=5')
      .then(res => res.json())
      .then(upcomingData => setData(upcomingData))
  }, [quizzical])
  return (
    <>
      {
        quizzical ? 
          <Main handleClick={() => setQuizzical(false)} data={data}/> : 
          <NewQuiz handleClick={() => setQuizzical(true)}/>
      }
    </>
  )
}