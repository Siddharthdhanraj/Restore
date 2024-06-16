import { Button } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


// instead of props:any we give type to it so Props type and passing elements
interface Props {

products:Product[];

addProduct:()=> void; // function returns void

}


//instead of Props:any use props:Props
//destructure Catalog({products,addProduct}:Props) so that we dont use props.product.id and use product.id directly

export default function Catalog({products,addProduct}:Props){

    return(

        <>
       
        <ProductList products={products} />
        <Button variant="contained" onClick={addProduct}>Add Product</Button>
        
      </>

   )



}