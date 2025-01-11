import { createSlice } from "@reduxjs/toolkit"

export interface CounterState{
    data:number,
    title:string
}    
const initialState:CounterState={
    data:42,
     title:'YARC(yet another redux counter)'
}
 
export const  counterSlice=createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state,action)=>{

            state.data+=action.payload
        },
        decrement:(state,action)=>{

            state.data-=action.payload
        }
    }

})

//Action types redux tookit is creating for us
export const {increment,decrement}=counterSlice.actions;