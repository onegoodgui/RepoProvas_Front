import { Bars } from "react-loading-icons";
function Loading({type, color, height, width, time, visible}){
    return(
        <Bars type={type} color={color} height={height} width={width} timeout={time} visible={visible}/>
    )
}

export default Loading;