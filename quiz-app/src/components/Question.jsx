import { nanoid } from "nanoid"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    pointer-events: ${props => props.isActive ? 'auto' : 'none'}
`

const List = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const LineBreak = styled.hr`
    width: 100%;
    hieght: 0px;
    border: 0.8px solid #DBDEF0;
    margin-top: 1rem;
    margin-bottom: 0;
`
const ListItem = styled.li`
    color: #293264;
    border: 1px ${(props) => props.borderColor} solid ;
    margin: .5rem;
    padding: .5rem;
    border-radius: .8em;
    cursor: pointer;
    
    display: flex;
    align-items: center;
    text-align: center;

    background-color: ${(props) => props.bgColor};
    opacity: ${(props) => props.changeOpacity ? '.8' : '1'}
`

export default function Question(props) {
    const optionsElem = props.options.map(item => {
        let bgColor = 'transparent', borderColor = '#4D5B9E'
        if(props.isOnGoing) {
            if(props.selectedOption === item) {
                bgColor = '#D6DBF5'
                borderColor = 'transparent'
            }
        }
        else {
            if(props.selectedOption === item && item !== props.correctOption) {
                bgColor = '#F8BCBC'
                borderColor = 'transparent'
            } 
            if(item === props.correctOption) {
                bgColor = '#94D7A2'
                borderColor = 'transparent'
            }
        }
        return <ListItem
            key={nanoid()}
            bgColor={bgColor} 
            borderColor={borderColor} 
            changeOpacity={!props.isOnGoing && props.correctOption !== item}
            onClick={() => props.handleClick(props.id, item)}
        >
            {item}
        </ListItem>
    })
    return (
        <Container isActive={props.isOnGoing}>
            <h3>{props.question}</h3>
            <List>
                {optionsElem}
            </List>
            <LineBreak></LineBreak>
        </Container>
    )
}