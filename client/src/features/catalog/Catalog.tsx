import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";


// instead of props:any we give type to it so Props type and passing elements



export default function Catalog(){
  
  const [products,setProducts]=useState<Product[]>([]);

 
useEffect (() =>{

  fetch('https://localhost:5000/api/Products')
  .then(response =>response.json())
  .then(data => setProducts(data))
},[])


    return(

        <>
    
        <ProductList products={products} />
      
        
      </>

   )



}