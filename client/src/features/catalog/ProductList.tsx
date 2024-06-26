import { List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "../ProductCard";

interface Props{
    products:Product[];
}


export default function ProductList({products}:Props){

    return(
        <List>
         {/* Added ProductList component */}
         {products.map((product: any) => (  
          <ProductCard  key={product.id} product={product}/>
  
         ))}
         </List>
      
        )

}