import { useEffect, useState } from "react"
import { Product } from "../models/product"


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
    
      <div >
     
     <h1 >Restore</h1>
     <ul>
      {products.map(product =>(
        <li key={product.id} > {product.name}-{product.price}</li>

      ))}
     </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default App
