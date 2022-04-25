import styled from 'styled-components'

const Teacher = styled.ul`

width: 100%;
height: fit-content;
background-color: lightblue;

display: flex;
flex-direction: column;
justify-content: center;
align-self: center;


padding: 20px 10px;

`

const Categories = styled.li`

width: 80%;
height: 40px;
background-color: lightyellow;

display: ${props => props.display};
align-items: center;
justify-content: center;


`

const TeachersCategories = styled.div`

display: flex;
flex-direction: column;
align-items: center;
width: 75%;
gap: 15px;
`

const Disciplines = styled.li`

width: 80%;
height: 40px;
background-color: lightcoral;

display: ${props => props.display};
align-items: center;
justify-content: center;
`
const CategoriesTests = styled.div`

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
align-items: center;
justify-content: center;
`

const TestsDisciplines = styled.div`

display: flex;
flex-direction: column;
align-items: center;
width: 75%;
`

export {Teacher, TeachersCategories, Categories, CategoriesTests, TestsDisciplines, Disciplines}