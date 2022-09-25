import { useState } from "react"
import styled from "styled-components"
// import data from "../assets/data"
import Question from "./Question"

const Container = styled.main`
    display: flex,
    justify-content: center;
    align-items: center;
    max-width: 800px;
    text-align: center;
`

const Button = styled.button`
    margin: 1.5rem 0;
`

export default function Main(props) {
    const {data} = props
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array
    }

    const allQuestions = []
    data.forEach(item => {
        const obj = {
            id: item.id,
            options: shuffle([...item.incorrectAnswers, item.correctAnswer]),
            correctOption: item.correctAnswer,
            question: item.question,
            selectedOption: ""
        }
        allQuestions.push(obj)
    })

    const [questions, setQuestions] = useState(allQuestions)
    const [onGoing, setOnGoing] = useState(true)

    function changeSelectedOption(id, newSelectedOption) {
        setQuestions(prevQuestions => {
            const newQuestions = prevQuestions.map(question => (
                question.id === id ? ({...question, selectedOption: newSelectedOption}) : question
            ))   
            return newQuestions
        })
    }


    const renderQuestions = questions.map(item => 
        <Question {...item} key={item.id} handleClick={changeSelectedOption} isOnGoing={onGoing}/>
    )

    function calculateScore() {
        let count = 0
        questions.forEach(question => {
            if(question.correctOption === question.selectedOption) count++
        })
        return count
    }

    return (
        <Container>
            <div>
                {renderQuestions}
            </div>
            {
                onGoing ? 
                <Button onClick={() => setOnGoing(false)}>Check answers</Button> :
                <div>
                    <h2>You scored {calculateScore()}/{questions.length} correct answers</h2>
                    <Button onClick={props.handleClick}>Play again</Button>
                </div>
            }
        </Container>
    )
}