import React from "react";
import { createContext, useState } from "react";

export const McqContext = createContext();

export const McqContextProvider =(props)=> {


    const [McqCount , setMcqCount] =useState(5)

    const value ={
        McqCount,setMcqCount
    }

    return(
        <McqContext.Provider value={value}>
          {props.children}
        </McqContext.Provider>
    )




}
