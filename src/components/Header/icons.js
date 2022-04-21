import { SchoolOutline } from 'react-ionicons'
import { FlaskOutline } from 'react-ionicons'
import { AddCircleOutline } from 'react-ionicons'

export function SchoolOutlineIcon({color, height, width}){

    return(

        <SchoolOutline
            color={color} 
            height={height}
            width={width}
        />
    )
}

export function SubjectIcon({color, height, width}){

    return(

        <FlaskOutline
            color={color} 
            height={height}
            width={width}
        />
    )
}


export function AddIcon({color, height, width}){

    return(
        <AddCircleOutline
            color={color} 
            height={height}
            width={width}
        />

    )
}