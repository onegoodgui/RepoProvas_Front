import styled from 'styled-components'

const HeaderContainer = styled.header`

height: 140px;
width: 100%;

display: ${props => props.display};

padding: 0 60px;

position:fixed;

border-bottom: solid #F1F1F1 1px;
`

const SearchContainer = styled.div`

display: flex;
flex-direction: column;

width: 100%;
`
const SearchbarSegment = styled.div`
height: 50%;
width: inherit;

display:flex;
align-items: center;
`

const FilterSegment = styled.div`
height: 50%;
width: inherit;

display:flex;
align-items: end;
`

const SearchBar = styled.input`

all: unset;

background-color: white;

width:80%;
height: ${props => props.height}px;

border-radius: ${props => props.height/2}px;
box-shadow: 0px 4px 11px -3px #D6D6D6;
padding: 0 20px;
`

const LogoContainer = styled.div`

width: 200px;
height:100%;

display: flex;

margin-top:25px;
padding-right: 20px;
`

const HeaderLogo=  styled.img`

height: 20%;
width: auto;

`

const Button = styled.button`

all: unset;

width:fit-content;
height:50px;

display: flex;
align-items: center;
padding-right: 20px;

color: ${props => props.textColor};

span{
    padding-left:10px;
}
`
const ExitButtonStyle = styled.button`

all: unset;
position: relative;

width: ${props => props.height}px;
height: ${props => props.height}px;


text-align: center;
margin-left: 50px;

background-color: #4584F4;

border-radius: ${props => (props.height/2)}px;

p{
    position: absolute;
    z-index:-1;

    top: 35%;
    color: white;
    left: 0px;

    transition: all 2s ease-out;
}
:hover{
    p{
        left: 45px;
        color: black;
    }
}

`

export {HeaderContainer, HeaderLogo, LogoContainer, SearchContainer, SearchbarSegment, SearchBar, FilterSegment, Button, ExitButtonStyle}