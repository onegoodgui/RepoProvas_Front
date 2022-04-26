import { Button, FilterSegment, HeaderContainer, HeaderLogo, LogoContainer, SearchBar, SearchbarSegment, SearchContainer } from "./style";
import repoProvas from "../../images/repoProvas.png"
import { AddIcon, SchoolOutlineIcon, SubjectIcon } from "./icons";
import ExitButton from "./ExitButton";
import useAuth from "../../hooks/useAuth";
import useFilter from "../../hooks/useFilter";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header(){
    
    const {logout} = useAuth();
    const navigate = useNavigate();

    const {pathname} = useLocation()

    function Logout(){
        logout();
        navigate('/');
    }

    return(
        <HeaderContainer display={(pathname === '/sign-up' || pathname === '/') ? 'none': 'flex'}>

            <LogoContainer>
               <HeaderLogo src={repoProvas}/>
            </LogoContainer>

            <SearchContainer>

                <SearchbarSegment>
                    <SearchBar placeholder="Filtre os professores..." height={40}/>
                    <ExitButton height={40} onClick={() => Logout()}/>
                </SearchbarSegment>

                <FilterSegment>
                    <ButtonsList/>
                </FilterSegment>

            </SearchContainer>

        </HeaderContainer>
    )
}

function ButtonsList(){

    const Buttons = [
        {title: 'Por disciplina', icon:SubjectIcon, type:'filter', filterType: 'disciplines'},
        {title: 'Por professor', icon:SchoolOutlineIcon, type:'filter', filterType: 'teachers'},
        {title: 'Adicionar Prova', icon: AddIcon, type: 'add', filterType: ''}
    ]
    
    const [color, setColor] = useState(Array.from({length: Buttons.length}, () => '#868686'))
    const [isActive, setIsActive] = useState(Array.from({length: Buttons.length}, () => false))
    const {filter, setFilter} = useFilter();
    const navigate = useNavigate();

    function activateCondition(state, index, filter){
        
        const newActivityArray = isActive;
        const newColorArray = color;

        if(isActive[index] === true){

            newColorArray[index] = '#868686';
            newActivityArray[index] = false;
            setFilter('');
            navigate('/homepage')
        }
        else{

            newColorArray.fill('#868686');
            newColorArray[index] = '#2372E7';

            newActivityArray.fill(false);
            newActivityArray[index] = true;
            setFilter(filter);
            navigate(`/homepage/${filter}`)
        }

        state([...newActivityArray]);
        setColor([...newColorArray]);
    }

    return(
        <>
        {Buttons.map((button, index) => 
            <Button textColor={color[index]} key={index} onClick={() => activateCondition(setIsActive, index, button.filterType)}>
                {button.icon({color:color[index], height: '20px', width:'20px'})}
                <span>{button.title}</span>
            </Button>)
        }
        </>
    )
}