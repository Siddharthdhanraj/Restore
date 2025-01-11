
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productsSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import { Grid } from "@mui/system";
import {  Paper  } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";
import AppPagination from "../../app/components/AppPagination";


// instead of props:any we give type to it so Props type and passing elements

const sortOptions=[
{value:'name',label:'Alphabetical'},
{value:'priceDesc',label:'Price-High to Low'},
{value:'price',label:'{Price-Low to High}'},
]

export default function Catalog(){
  
  const products=useAppSelector(productsSelectors.selectAll);
  //use useAppSelector() to get the data from the redux store
  const {productsLoaded,filtersLoaded,brands,types,productParams,metadata}=useAppSelector(state=>state.catalog);
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

   if (status.includes(!filtersLoaded)) return <LoadingComponent message='Loading products...' />

    return(
        <Grid container columnSpacing={4}>
         <Grid size={3} >
          <Paper sx={{mb:2}} >
             <ProductSearch/>
            </Paper>
            <Paper sx={{mb:2 ,p:2}}>
             <RadioButtonGroup options={sortOptions} 
              OnChange={
              (e)=>dispatch(setProductParams({orderBy:e.target.value}))} selectedValue={productParams.orderBy} />
            </Paper>
            <Paper sx={{mb:2 ,p:2}}>
             <CheckBoxButtons 
              items={brands}
              checked={productParams.brands} 
              OnChange={(items:string[])=>dispatch(setProductParams({brands:items}))} />
            </Paper>
            <Paper sx={{mb:2 ,p:2}}>
            <CheckBoxButtons 
              items={types}
              checked={productParams.types} 
              OnChange={(items:string[])=>dispatch(setProductParams({types:items}))} />  
            </Paper>
          </Grid>
          <Grid size={9}  >
            <ProductList products={products} />
          </Grid>
          <Grid  size={3}/>
          <Grid  size={9} sx={{mb:2}} >
            {metadata && 
            <AppPagination metadata={metadata} OnPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page})) }/>}
          </Grid>
        </Grid>
   )



}

