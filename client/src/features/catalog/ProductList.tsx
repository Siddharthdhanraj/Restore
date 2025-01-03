import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props{
    products:Product[];
}


export default function ProductList({products}:Props){

    return(
        <Grid container spacing={4} >
         {/* Added ProductList component */}
         {products.map((product: any) => (  
            <Grid item xs={4} key={product.id}>
          <ProductCard  key={product.id} product={product}/>
          </Grid>
         ))}
       </Grid>
      
        )

}