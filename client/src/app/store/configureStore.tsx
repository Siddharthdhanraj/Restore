
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../../features/contact/counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";


export const store  =configureStore({
//reducer is predefined object in configurestore 
    reducer:{
    counter:counterSlice.reducer,
    basket:basketSlice.reducer,
    catalog:catalogSlice.reducer
}

})


//AppDispatch is a type representing the dispatch method from your store.
//typeof store.dispatch extracts the type of the dispatch method directly from the store you created, which includes any middleware applied by configureStore.
//useAppDispatch is a custom hook that wraps useDispatch from React-Redux.
//By specifying <AppDispatch>, this custom hook provides type safety for dispatching actions, helping to catch errors if you try to dispatch actions that don’t match the expected types.


export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector;