import { ExitIcon } from "./icons"
import { ExitButtonStyle } from "./style"


export default function ExitButton({height, onClick}){
    return(
        <ExitButtonStyle height={height} onClick={onClick}>
            <ExitIcon color={'white'} height={'20px'} width={'20px'}/>
            <p >Logout</p>
        </ExitButtonStyle>
    )
}