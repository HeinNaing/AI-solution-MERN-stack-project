import { createContext, useReducer, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext();


let AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            localStorage.setItem("admin-user", JSON.stringify(action.payload));
            console.log(action.payload);
            return {user: action.payload};
        case "LOGOUT":
            localStorage.removeItem("admin-user");
            return {user: null};
        default:
            return state;
    }
}

const AuthContextProvider = ({ children }) => {

    let [state, dispatch] = useReducer(AuthReducer , {
        user: null,
    })

    useEffect(() => {
        try {
            const user = localStorage.getItem("admin-user");
            if(user){
                dispatch({
                    type: "LOGIN",
                    payload: JSON.parse(user)
                })
            }else{
                dispatch({
                    type: "LOGOUT",
                })
            }
        } catch (error) {
            dispatch({
                type: "LOGOUT",
            })
        }
    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export  {AuthContext, AuthContextProvider};
