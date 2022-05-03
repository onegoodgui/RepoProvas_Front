import styled from 'styled-components'

const HomepageContainer = styled.ul`

padding-top: ${props => props.paddingTop};

display: flex;
flex-direction: column;
align-items: center;

width: 100%;
height: fit-content;

gap: 15px;
`

const Views = styled.span`
width: 100%;
height: fit-content;

display: flex;
justify-content: flex-end;

padding-right: 15px;
padding-bottom: 10px;

background-color: lightcoral;
`

const Button = styled.button`

all: unset;

width: 80%;
height: 60px;

background: #FFFFFF;
border-radius: 5px;
box-sizing: border-box;

font-size: 20px;
color: #000;

padding: 0 15px;


opacity: ${props => props.opacity}
`

const ButtonContainer = styled.div`

position: relative;
width: 100%;

&:focus-within{

    label#empty{
        bottom: 52px;
        left: 5px;
        background-color: white;
        font-size: 14px;
    }


}  
`

const PageTitle = styled.h1`

font-size: 32px;
align-self: flex-start;
color: #4584F4;

`

const FormContainer = styled.div`

display: flex;
flex-direction: column;
width: 70%;
`

const InputContainer = styled.div`

position: relative;
width: 100%;

&:focus-within{

    label#empty{
        bottom: 52px;
        left: 5px;
        background-color: white;
        font-size: 14px;
    }


}  
`
const EmptyLabel = styled.label.attrs({
    id: 'empty'
})`
transition: all 0.5s;
position: absolute;
left: 10px;
bottom: 20px;
`


const FilledLabel = styled.label`

position: absolute;
z-index: 1;
left: 5px;
bottom: 52px;
background-color: white;
font-size: 14px;
`

const List = styled.ul`

width: 80%;
height: fit-content;
max-height: 100px;

overflow-y: scroll;

background-color: lightblue;

align-self: center;
gap: 10px;

`

const Item = styled.li`

width: 100%;
height: 30px;

:hover{
    background-color: #4584F4;
}

`

const SubmitButton = styled.button`

all: unset;

width: 100%;
max-width: inherit;
height: 60px;

display: flex;
align-items: center;
justify-content: center;

background-color: #4584F4;
color: #FFF;

border-radius: 5px;

cursor: pointer;


`
export {HomepageContainer, Views, PageTitle, FormContainer, EmptyLabel, FilledLabel, InputContainer, Button, ButtonContainer, List, Item, SubmitButton}