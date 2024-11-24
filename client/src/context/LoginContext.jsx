import { createContext, useState } from "react";

export const LoginContext=createContext(null);

export const LoginProvider=(props)=>{
    const [isActive,setIsActive]=useState(false);

    return(
        <LoginContext.Provider value={{isActive,setIsActive}}>
            {props.children}
        </LoginContext.Provider>
    )
}