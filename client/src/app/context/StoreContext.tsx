import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContext{
    basket:Basket|null;
    setBasket:(basket:Basket)=>void;
    removeItem:(productId:number,quantity:number)=>void;

}

export const StoreContext =createContext<StoreContext|undefined>(undefined);
//custom react hook
// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext(){

    const context=useContext(StoreContext);
    if(context==undefined)
    throw Error('Oops-we do not seem to be inside the provider');
    return  context;

}


// we are passing children as property with react type PropsWithChildren
export function  StoreProvider({children}:PropsWithChildren<unknown>){

    const[basket,setBasket]=useState<Basket|null>(null);
    
    function removeItem(productId:number,quantity:number){
     if(!basket)
        return;
    // new copy of array and store in items
      const items=[...basket.items];
      const itemIndex=items.findIndex(i=>i.productId===productId);
      if(itemIndex>=0){
          items[itemIndex].quantity-=quantity;
          //remove item from array
          if(items[itemIndex].quantity==0)
          items.splice(itemIndex,1);  
        setBasket(prevState=>{
         return {...prevState!,items}

        })
      }
     
    }

    return(

     <StoreContext.Provider value={{basket,setBasket,removeItem}}>

        {children}
     </StoreContext.Provider>


    ) 

}