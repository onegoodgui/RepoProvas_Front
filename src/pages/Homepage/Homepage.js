import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useFilter from "../../hooks/useFilter"
import { api } from "../../services/api";
import { HomepageContainer } from "./style/style";
import { CategoriesTeachers, Category, Discipline, DisciplinesCategories, TeacherTest, Term, TermsDisciplines} from "./style/disciplineFilter";
import { Categories, CategoriesTests, Disciplines, Teacher, TeachersCategories, TestsDisciplines,  } from "./style/teachersFilter";

export default function Homepage(){

    const {filter} = useFilter();
    const {auth} = useAuth();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(filter);

    useEffect(() => {
        
        async function loadFilters(){
            try{
                if(filter !==''){
                    const result = await api.searchFilter(auth, filter);
                    console.log(result.data);
                    setResults(result.data);
                }
                else{
                    setResults([]);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        loadFilters()
        
    },[filter])
    console.log(results)

    return(
        <HomepageContainer>
            <FilterResults filter={filter} results={results}/>
        </HomepageContainer>
    )
}

function FilterResults({filter, results}){

    const [selectedTerms, setSelectedTerms] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    

    // useEffect(() => {
    //     const disciplineLengthArray = results.map((term) => (term.discipline.length === 0? '80px' : `${term.discipline.length * 80}px`));
    //     const isListedDisciplines = results.map(() => false);
    //     let isListedCategories = 
    //     setTermsDisciplinesLength([...disciplineLengthArray]);
    //     setIsListedDisciplines([...isListedDisciplines]);
    // },[results])


    function selectTerm(index){
        if(selectedTerms.includes(index)){
            selectedTerms.pop(index);
            setSelectedTerms([...selectedTerms])
        }
        else{
            selectedTerms.push(index);
            setSelectedTerms([...selectedTerms])
        }
    }


    function selectDiscipline(index){
        if(selectedDisciplines.includes(index)){
            selectedDisciplines.pop(index);
            setSelectedDisciplines([...selectedDisciplines])
        }
        else{
            selectedDisciplines.push(index);
            setSelectedDisciplines([...selectedDisciplines])
        }
    }

    function selectTest(key){
        if(selectedTests.includes(key)){
            selectedTests.pop(key);
            setSelectedTests([...selectedTests])
        }
        else{
            selectedTests.push(key);
            setSelectedTests([...selectedTests])
        }
    }

    function selectTeacher(key){
        if(selectedTeachers.includes(key)){
            selectedTeachers.pop(key);
            setSelectedTeachers([...selectedTeachers])
        }
        else{
            selectedTeachers.push(key);
            setSelectedTeachers([...selectedTeachers])
        }
    }

    function selectCategory(key){
        if(selectedCategories.includes(key)){
            selectedCategories.pop(key);
            setSelectedCategories([...selectedCategories])
        }
        else{
            selectedCategories.push(key);
            setSelectedCategories([...selectedCategories])
        }
    }
    // const disciplines = results.map(term => term.discipline);
    // const teachers = disciplines.map(discipline => discipline.map(a => a.teachers[0].tests.map(test => test.category.name)))
    // console.log( results, disciplines, teachers);


    if(filter === 'disciplines' && results.length > 0){
        return(
            <>
            {results.map((term,i) => {
                return(
                    <>
                        <TermsDisciplines>
                            <Term onClick={() => selectTerm(term.number)}>
                                {`${term.number}o Período`}
                            </Term>
                                <DisciplinesCategories>

                                {term.discipline.length !== 0 ? 

                                    term.discipline.map((discipline, j) => {
                                        
                                        return(
                                            <> 
                                                <Discipline onClick={() => selectDiscipline(discipline.name)} display={selectedTerms.includes(term.number) ? 'flex' : 'none'}>{discipline.name}</Discipline>
                                                
                                                {   discipline.teachersDisciplines.length === 0 ?
                                                        <Category display={selectedDisciplines.includes(discipline.name) ? 'flex' : 'none'} >{'nao disponivel'}</Category>
                                                    :
                                                    discipline.teachersDisciplines.map(teacherDiscipline => {
                                                            
                                                        if(teacherDiscipline.tests.length === 0 || teacherDiscipline === undefined){
                                                           return(<Category display={selectedDisciplines.includes(discipline.name) ? 'flex' : 'none'} >{'nao disponivel'}</Category>) 
                                                        }
                                                        return(
                                                            
                                                            teacherDiscipline.tests.map(test => {

                                                                return(
                                                                    <CategoriesTeachers>
                                                                        <Category onClick={() => selectTest(`${test.category.name}${discipline.name}`)} display={selectedDisciplines.includes(discipline.name) ? 'flex' : 'none'} >{test.category.name}</Category>
                                                                        {test.category.tests.map(t => 
                                                                            {return(
                                                                                <TeacherTest display={selectedTests.includes(`${test.category.name}${discipline.name}`) ? 'flex' : 'none'} >{t.name} {t.teacherDiscipline.teacher.name}</TeacherTest>
                                                                            )}
                                                                        )}
                                                                    </CategoriesTeachers>

                                                                    
                                                                )
                                                                
                                                            })  
                                                        )
                                                        
                                                    })
                        
                                                }
                                            </>
                                        )
                                    })

                                    :

                                    <Discipline display={selectedTerms.includes(term.number) ? 'flex' : 'none'}>{'nao disponível'}</Discipline>
                                }
                                </DisciplinesCategories>
                        </TermsDisciplines>

                    </>
                )
            })}
            </>
        )
    }
    else if (filter === 'teachers'){
        return(

            <TeachersCategories>
                {results.map(teacher => {
                    return(
                        <>
                            <Teacher onClick={() => selectTeacher(teacher.name)}>
                                {teacher.name}
                            </Teacher>
                            <CategoriesTests>

                                {teacher.teachersDisciplines.map(td => {

                                    return(
                                        
                                        td.tests.length > 0 ?
                                        td.tests.map(test => {return(
                                           <>
                                                <Categories onClick={() => selectCategory(test.category.name)} display={selectedTeachers.includes(teacher.name) ? 'flex' : 'none'} > 
                                                    {test.category.name}
                                                </Categories>

                                                <TestsDisciplines>
                                                    <Disciplines display={selectedCategories.includes(test.category.name) ? 'flex' : 'none'} >{test.name} {td.discipline.name}</Disciplines>
                                                </TestsDisciplines>
                                           </>

                                        )})
                                        
                                        :
                                        <Categories display={selectedTeachers.includes(teacher.name) ? 'flex' : 'none'} > 
                                        {'indisponivel'}
                                    </Categories>

                                    )
                                })}
                            </CategoriesTests>
                        </>
                    ) 
                })}
            </TeachersCategories>

        )
    }
    else{
        return
    }
}