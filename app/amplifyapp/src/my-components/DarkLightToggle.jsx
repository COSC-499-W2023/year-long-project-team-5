import {ToggleButton} from "@aws-amplify/ui-react";
import * as React from "react";
import { MdOutlineNightlight, MdOutlineLightMode } from "react-icons/md";

export default function DarkLightToggle(props){
    const [isPressed, setIsPressed] = React.useState(false);
    return(
        <ToggleButton 
            isPressed={isPressed}
            onChange ={()=> setIsPressed(!isPressed)} 
            onClick={() => {props.colorMode === 'light' ? props.setColorMode('dark') : props.setColorMode('light')}}
            borderRadius={"20px"}
            aria-label={props.colorMode === "light" ? "Switch to dark mode" : "Switch to light mode"} // for screen readers
            role="button">
            {isPressed ? <MdOutlineLightMode/> : <MdOutlineNightlight/>}
        </ToggleButton>
    )
}

