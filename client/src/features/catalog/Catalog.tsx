import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";


// instead of props:any we give type to it so Props type and passing elements

export default function Catalog(){
  
  const [products,setProducts]=useState<Product[]>([]); 
useEffect (() =>{
 agent.Catalog.list().then(products=>setProducts(products))
},[])

    return(

        <>
        <ProductList products={products} />
      </>

   )



}