import { useEffect, useState } from "react"
import { Product } from "../models/product"
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";



function App() {

const [products,setProducts]=useState<Product[]>([]);

 
useEffect (() =>{

  fetch('https://localhost:5000/api/Products')
  .then(response =>response.json())
  .then(data => setProducts(data))
},[])

function addProduct(){

  setProducts(prevState => [...prevState,
      {
    id: prevState.length+101,
    name: 'product'+(prevState.length+1),
    price: (prevState.length*100)+100,
    brand: 'some brand',
    pictureUrl: 'http://picsum.potos/200',
    description: 'some description',
    
    }])
}

  return (
    
      <>
      <CssBaseline />
     <Header />
     <Container>
     { /* Created Catalog child component and passed product and function needed for adding products*/}
     <Catalog  products={products} addProduct={addProduct} />  
     
    

     </Container>
   
    </>
  )
}

export default App
