import styled from "styled-components";

const Input = styled.input`

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

const Button = styled.button`

all: unset;

width: 80%;
height: 60px;

display: flex;
justify-content: center;
align-items: center;

border-radius: 5px;
background-color: #FF8888;
color: #FFFBBF;

font-size: 35px;
font-family: 'Dancing Script', cursive;

cursor: pointer;

`

const Content = styled.div`

min-height: 100vh;
height: 100%;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;


background-color:#B9E9FF;

`

const Form = styled.form`

display: flex;
flex-direction: column;
align-items: center;

gap: 15px;
padding-top: 60px;

width: 100%;
max-width: 600px;

`
const Title = styled.img`

height: 100px;
`

const SignInLink = styled.span`
margin-top: 30px;

font-size: 20px;
color: #5DA040;

cursor: pointer;
`

export {Input, Button, Content, Form, Title, SignInLink}