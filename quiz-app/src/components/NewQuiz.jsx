import styled from "styled-components"
import Main from "./Main"

const Wrapper = styled.main`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`
export default function NewQuiz(props) {
    return (
        <Wrapper>
            <h1>Quizzical</h1>
            <p>A fun little trivia quiz game, where you can check how many brain cells you have.</p>
            <button onClick={props.handleClick}>Start Quiz</button>
        </Wrapper>
    )
}