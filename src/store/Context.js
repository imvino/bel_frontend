import React, {createContext, useEffect, useState} from 'react';
import Validation from "./Validation";
export const UserContext = createContext(false)



export const UserProvider = (props) => {
    let val = Validation()
    let login = val?.id ? true : false;
    console.log({val, login})
    const [isLogin,setLogin] = useState(login)

    useEffect(()=>{
        setLogin(login)
    },[login])
    return (
        <UserContext.Provider value={{isLogin,setLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}






