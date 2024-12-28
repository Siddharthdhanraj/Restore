
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productsSelectors } from "./catalogSlice";
import ProductList from "./ProductList";
import { Grid } from "@mui/system";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";




// instead of props:any we give type to it so Props type and passing elements

const sortOptions=[
{value:'name',label:'Alphabetical'},
{value:'priceDesc',label:'Price-High to Low'},
{value:'price',label:'{Price-Low to High}'},

]

export default function Catalog(){
  
  // const [products,setProducts]=useState<Product[]>([]); 
  const products=useAppSelector(productsSelectors.selectAll);
  const {productsLoaded,status,filtersLoaded,brands,types}=useAppSelector(state=>state.catalog);
  const dispatch=useAppDispatch();

  
  useEffect (() =>{
     if(!productsLoaded)
      dispatch(fetchProductsAsync())
  },[productsLoaded,dispatch])

  //Created another useeffect for filters coz it makes two request to catalog if added im above useEffect
  useEffect (() =>{
    if(!filtersLoaded)
     dispatch(fetchFilters())
 },[filtersLoaded, dispatch,])

    
   if (status.includes('pending')) return <LoadingComponent message='Loading products...' />

    return(

        <Grid container spacing={4}>
         <Grid size={3} >
          <Paper sx={{mb:2}}>
            <TextField 
              label='Search products'
              variant='outlined'
              fullWidth
              /> 
            </Paper>
            <Paper sx={{mb:2 ,p:2}}>
              <FormControl component="fieldset">
                <RadioGroup>
                  {sortOptions.map(({value,label})=>(<FormControlLabel value={value} control={<Radio />} label={label} key={value} />))}
                </RadioGroup>
              </FormControl>
            </Paper>
            <Paper sx={{mb:2 ,p:2}}>
              <FormGroup >
              {brands.map(brand=>(<FormControlLabel  control={<Checkbox />} label={brand}  key={brand}/>))}
              </FormGroup>
              </Paper>
            <Paper sx={{mb:2 ,p:2}}>
              <FormGroup >
              {types.map(type=>(<FormControlLabel  control={<Checkbox />} label={type}  key={type}/>))}
              </FormGroup>
            </Paper>
          </Grid>
          <Grid size={9} >
            <ProductList products={products} />
          </Grid>
          <Grid  size={3}>
            
          </Grid>
          <Grid  size={9}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography>
                Display 1-6 of 20 items
              </Typography>
              <Pagination color='secondary' size='large' count={10} page={2}/>
            </Box>
          </Grid>
         
        </Grid>
    

   )



}

