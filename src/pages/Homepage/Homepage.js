import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useFilter from "../../hooks/useFilter"
import { api } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ButtonContainer, EmptyLabel, FilledLabel, FormContainer, HomepageContainer, InputContainer, Label, PageTitle, Views, Button, List, Item, SubmitButton } from "./style/style";
import { CategoriesTeachers, Category, Discipline, DisciplinesCategories, TeacherTest, Term, TermsDisciplines, Test} from "./style/disciplineFilter";
import { Categories, CategoriesTests, Disciplines, Teacher, TeachersCategories, TestsDisciplines,  } from "./style/teachersFilter";
import { useNavigate, useParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import {Input, Form} from "../AuthPages/style";


export default function Homepage(){

    const [filter, setFilter] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const {auth} = useAuth();
    const params = useParams();
    const {search} = useSearch();


    useEffect(() => {
        setFilter(params.filter);
        setResults([]);
    },[params])



    useEffect(() => {
        
        async function loadFilters(){
            try{
                if(filter !==''){
                    const result = await api.searchFilter(auth, filter, search);

                    setResults(result.data);
                }
                else{
                    setResults([]);
                }
            }
            catch(error){

            }
        }
        loadFilters()
        
    },[filter, search, loading])

    console.log(results)

    return(
        <HomepageContainer paddingTop={filter === 'add' ? '180px' : '300px'}>
            <FilterResults filter={filter} results={results} loading={loading} setLoading={setLoading} />
        </HomepageContainer>
    )
}

function FilterResults({filter, results, loading, setLoading}){

    const [selectedTerms, setSelectedTerms] = useState([]);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const {auth} = useAuth();
    



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

    async function updateViews(id, auth){
        setLoading(true);
        await api.updateViews(auth, id);
        setLoading(false);
    }

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
                                                        const repeatedCategories = [];    

                                                        if(teacherDiscipline.tests.length === 0 || teacherDiscipline === undefined){
                                                           return(<Category display={selectedDisciplines.includes(discipline.name) ? 'flex' : 'none'} >{'nao disponivel'}</Category>) 
                                                        }
                                                        if(teacherDiscipline.disciplineId !== discipline.id){
                                                            return
                                                        }
                                                        return(
                                                            
                                                            teacherDiscipline.tests.map(test => {

                                                                
                                                                if(repeatedCategories[test.category.name]){
                                                                    return
                                                                }
                                                                else{
                                                                    repeatedCategories[test.category.name] = 1;
                                                                }

                                                                return(
                                                                    <CategoriesTeachers>
                                                                        <Category onClick={() => selectTest(`${test.category.name}${discipline.name}`)} display={selectedDisciplines.includes(discipline.name) ? 'flex' : 'none'} >{test.category.name}</Category>
                                                                        {test.category.tests.map(t => 
                                                                            
                                                                            {   if(discipline.id !== t.teacherDiscipline.disciplineId){
                                                                                return
                                                                            }
                                                                                return(
                                                                                <>
                                                                                    <TeacherTest onClick={() => {updateViews(t.id, auth)}} display={selectedTests.includes(`${test.category.name}${discipline.name}`) ? 'flex' : 'none'} >
                                                                                        <Test>
                                                                                            {t.name} {t.teacherDiscipline.teacher.name}
                                                                                        </Test>
                                                                                        <Views style={{backgroundColor: 'lightgreen'}} >
                                                                                            Views: {t.views}
                                                                                        </Views>
                                                                                    </TeacherTest>

                                                                                </>
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
                    const repeatedCategories = [];
                    const repeatedTestId = [];
                    return(
                        <>
                            <Teacher onClick={() => selectTeacher(teacher.name)}>
                                {teacher.name}
                            </Teacher>
                            <CategoriesTests>

                                {teacher.teachersDisciplines.map(td => {
                                    if(teacher.id !== td.teacherId){
                                        return
                                    }
                                    return(
                                        
                                        td.tests.length > 0 ?
                                        td.tests.map(test => {
                                            if(repeatedCategories[test.category.categoryId]){
                                                return
                                            }
                                            return(
                                                test.category.tests.map(tst => {
                                                
                                                if(teacher.id !== tst.teacherDiscipline.teacherId){
                                                    return
                                                }

                                                if(repeatedTestId[tst.id]){
                                                    return
                                                } 
                                                else{
                                                    repeatedTestId[tst.id] = 1
                                                }   
                                                if(repeatedCategories[test.category.name] && teacher.id === tst.teacherDiscipline.teacherId){
                                                     return(
                                                         <TestsDisciplines onClick={() => {updateViews(tst.id, auth)}} display={selectedCategories.includes(`${test.category.name}${teacher.name}`) ? 'flex' : 'none'}>
                                                             <Disciplines >{tst.name} {td.discipline.name}</Disciplines>
                                                             <Views style={{width:'80%'}}>
                                                             Views: {tst.views}
                                                             </Views>
                                                         </TestsDisciplines>
                                                     )
                                                 }
                                                 else{

                                                        
                                                        repeatedCategories[test.category.name] = 1;

                                                    return(
                                                         <>
                                                             <Categories onClick={() => selectCategory(`${test.category.name}${teacher.name}`)} display={selectedTeachers.includes(teacher.name) ? 'flex' : 'none'} > 
                                                                 {test.category.name}
                                                             </Categories>
         
                                                             <TestsDisciplines onClick={() => {updateViews(tst.id, auth)}} display={selectedCategories.includes(`${test.category.name}${teacher.name}`) ? 'flex' : 'none'} >
                                                                 <Disciplines >{tst.name} {td.discipline.name}</Disciplines>
                                                                 <Views style={{width:'80%'}}>
                                                                    Views: {tst.views}
                                                                 </Views>
                                                             </TestsDisciplines>
                                                         </>
         
                                                    )
                                                 }
                                                 })

                                            )
                                        })
                                        
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
    else if (filter === 'add'){
        return(
            <>
                <FormContainer>
                    <PageTitle>Adicionar prova</PageTitle>
                    <AddTest/>

                </FormContainer>
            </>
        )
    }
    else{
        return
    }
}


function AddTest(){

    const [isLoading, setIsLoading] = useState(false)
    const [testUrl, setTestUrl] = useState('');
    const [testName, setTestName] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDiscipline, setSelectedDiscipline] = useState('');
    const {auth} = useAuth();
    const navigate = useNavigate();
    

    
    const testItems = [
      { placeholder: 'Nome da prova', type: 'string', state: setTestName, content: testName},
      { placeholder: 'Link da prova', type: 'url', state: setTestUrl, content: testUrl }
    
    ];
    
    async function SubmitTest(e){
        e.preventDefault();

        const test = {name: testName, url:testUrl, category: selectedCategory, discipline:selectedDiscipline, teacher: selectedTeacher}
        try{
            await api.submitTest(auth, test);
            navigate('/homepage')
        }
        catch(error){
            console.log(error);

            toast.error('Erro! Verifique os dados de entrada.',{theme: 'colored'});
            toast();
        }

    }

    return(
        <>
            <Form style={{alignItems: 'flex-start'}} onSubmit={SubmitTest}>
                {testItems.map(testItem =>
                    <>
                        <InputContainer>
                            <Input 
                                style={{border: '1px solid #868686', width: '100%'}}
                                type={testItem.type} 
                                onChange={(e) => {testItem.state(e.target.value)}}
                            >
                                
                            </Input>
                            {testItem.content === '' ? <EmptyLabel>{testItem.placeholder}</EmptyLabel> : <FilledLabel>{testItem.placeholder}</FilledLabel>}
                        </InputContainer>
                    
                        
                    </> 
                    )}
                <DropDownInputs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedDiscipline={selectedDiscipline} setSelectedDiscipline={setSelectedDiscipline} selectedTeacher={selectedTeacher} setSelectedTeacher={setSelectedTeacher}/>
                <SubmitButton type="submit">ENVIAR</SubmitButton>
            </Form>

            <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        </>
    )

}


function DropDownInputs({selectedCategory, setSelectedCategory, selectedDiscipline, setSelectedDiscipline, selectedTeacher, setSelectedTeacher}){

    const [testsData, setTestsData] = useState([]);
    const {auth} = useAuth();
    const params = useParams();


    useEffect(() => {
        async function DropDownContent(){
            try{
                const results = await api.getTests(auth);
                setTestsData(results.data);
                
            }
            catch(error){
                console.log(error)
            }
        }
        DropDownContent()

    },[])


    return(
        <>
            <CategoriesInput testsData={testsData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            <DisciplinesTeachersInput testsData={testsData} selectedDiscipline={selectedDiscipline} setSelectedDiscipline={setSelectedDiscipline} selectedTeacher={selectedTeacher} setSelectedTeacher={setSelectedTeacher}/>
        </>
    )
}

function DropDownList({type, items, setSelected, setIsActive, setId}){

    function handleClick(name, id){

        setSelected(name);
        if(setId){
            setId(id)
        }
        setIsActive(false);
        return
    }

        return(
            <>
                <List>
                    {items.map((item) => <Item onClick={() => {handleClick(item.name, item.id)}} >{item.name}</Item>)}
                </List>
            </>
        )
    
}

function CategoriesInput({testsData, selectedCategory, setSelectedCategory}){

    const [isActive, setIsActive] = useState(false);

    function ButtonClickHandler(e){
        e.preventDefault();
        if(isActive === true){
            setIsActive(false)
        }
        else{
            setIsActive(true)
        }
        return
    }
    return(
        <>
            <ButtonContainer>
                <Button style={{border: '1px solid #868686', width: '100%'}} onClick={(e) => {ButtonClickHandler(e)}} >
                    {selectedCategory === '' ? <EmptyLabel>{'Categorias'}</EmptyLabel> : <FilledLabel>{'Categorias'}</FilledLabel>}
                    {selectedCategory}
                </Button>
               
            </ButtonContainer>
                {isActive === true ? <DropDownList type={'categories'} items={testsData.categories} setSelected={setSelectedCategory} setIsActive={setIsActive} /> : ''}

        </>
    )
}

function DisciplinesTeachersInput({testsData, selectedDiscipline, setSelectedDiscipline, selectedTeacher, setSelectedTeacher}){

    const [isActiveDiscipline, setIsActiveDiscipline] = useState(false);
    const [selectedId, setSelectedId] = useState('');



    function ButtonClickHandler(e, isActive, setIsActive){
        e.preventDefault();
        if(isActive === true){
            setIsActive(false)
        }
        else{
            setIsActive(true)
        }
        return
    }

    return(
        <>

            <ButtonContainer>
                <Button style={{border: '1px solid #868686', width: '100%'}} onClick={(e) => {ButtonClickHandler(e, isActiveDiscipline ,setIsActiveDiscipline)}} >
                    {selectedDiscipline === '' ? <EmptyLabel>{'Disciplinas'}</EmptyLabel> : <FilledLabel>{'Disciplinas'}</FilledLabel>}
                    {selectedDiscipline}
                </Button>
                   
            </ButtonContainer>
            {isActiveDiscipline === true ? <DropDownList type={'disciplines'} items={testsData.disciplines} setSelected={setSelectedDiscipline} setIsActive={setIsActiveDiscipline} setId={setSelectedId}/> : ''}
            <TeachersInput disciplineId={selectedId} selectedDiscipline={selectedDiscipline} selectedTeacher={selectedTeacher} setSelectedTeacher={setSelectedTeacher}/>

        </>
    )
}

function TeachersInput({disciplineId, selectedDiscipline, selectedTeacher, setSelectedTeacher}){
    
    const {auth} = useAuth();
    const [isActiveTeacher, setIsActiveTeacher] = useState(false);
    const [teachersData, setTeachersData] = useState([]);

    useEffect(() => {

        async function getTeachersByDiscipline(){
            try{
                setSelectedTeacher('');
                const results = await api.getTeachersByDiscipline(auth, disciplineId);
                setTeachersData(results.data);
            }
            catch(error){
                console.log(error);
            }
        }
        if(!disciplineId){
            return
        }
        getTeachersByDiscipline()
    },[disciplineId])


    function ButtonClickHandler(e){
        e.preventDefault();

        if(!selectedDiscipline){
            return
        }

        if(isActiveTeacher=== true){
            setIsActiveTeacher(false)
        }
        else{
            setIsActiveTeacher(true)
        }
        return
    }


    return(
        <>
             <ButtonContainer>

                <Button style={{border: '1px solid #868686', width: '100%'}} onClick={(e) => {ButtonClickHandler(e)}} >
                    {selectedTeacher === '' ? <EmptyLabel>{'Professores'}</EmptyLabel> : <FilledLabel>{'Professores'}</FilledLabel>}
                    {selectedTeacher}
                </Button>
               
            </ButtonContainer>
            {isActiveTeacher === true ? <DropDownList type={'teachers'} items={teachersData.teachers} setSelected={setSelectedTeacher} setIsActive={setIsActiveTeacher} /> : ''}
        </>
    )
}