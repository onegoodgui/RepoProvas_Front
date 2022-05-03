import styled from 'styled-components'

const Term = styled.ul`

width: 100%;
height: fit-content;
background-color: lightblue;

display: flex;
flex-direction: column;
justify-content: center;
align-self: center;


padding: 20px 10px;

`

const Discipline = styled.li`

width: 80%;
height: 40px;
background-color: lightyellow;

display: ${props => props.display};
align-items: center;
justify-content: center;


`

const TermsDisciplines = styled.div`

display: flex;
flex-direction: column;
align-items: center;
width: 75%;
`

const Category = styled.li`

width: 80%;
height: 40px;
background-color: lightcoral;

display: ${props => props.display};
align-items: center;
justify-content: center;
`
const DisciplinesCategories = styled.div`

display: flex;
flex-direction: column;
align-items: center;
width: 75%;
`

const TeacherTest = styled.li`

width: 80%;
height: 40px;
background-color: lightgreen;

display: ${props => props.display};
flex-direction: column;
align-items: center;
justify-content: center;

padding: 10px 0px;
`

const CategoriesTeachers = styled.div`

display: flex;
flex-direction: column;
align-items: center;
width: 75%;
`

const Test = styled.div`

display: flex;
align-items: center;
justify-content: center;
`

export {Term, Discipline, TermsDisciplines, Category, CategoriesTeachers, DisciplinesCategories, TeacherTest, Test}