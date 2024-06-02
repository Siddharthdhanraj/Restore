import { List,ListItem, ListItemAvatar,Avatar, ListItemText, Button } from "@mui/material";
import { Product } from "../../app/models/product";


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

        {/* Added List component from material ui inplace of <ul> */ }
        <List>
         
          {products.map((product: any) => (  
          
          <ListItem key={product.id}>
              <ListItemAvatar>
                  <Avatar src={product.pictureUrl} />
              </ListItemAvatar>

              <ListItemText>{product.name}-{product.price}</ListItemText>
          </ListItem>
           
          ))}
          </List>
       
        <Button variant="contained" onClick={addProduct}>Add Product</Button>
        {/* Added Button style variant conatined*/}
      </>
      
    
    

   )



}