
import {  Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";


export default function  BasketPage(){

  const {basket,setBasket,removeItem}=useStoreContext();
  const[loading,setLoading]=useState(false);

  function handleAddItem(productId:number){
    setLoading(true);
    agent.Basket.addItem(productId)
    .then(basket=>setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))

  }

  function handleRemoveItem(productId:number,quantity=1)
  {
    setLoading(true);
    agent.Basket.removeItem(productId,quantity)
    .then(()=>removeItem(productId,quantity))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))

  }
    if(!basket)
        return <Typography variant='h3'>Your Basket is Empty </Typography>

    return(

        <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">SubTotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                  <img src={item.pictureUrl} alt={item.name} style={{height:50,marginRight:20}}></img>
                  </Box>
                </TableCell>
                <TableCell align="right">${((item.price)/100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <LoadingButton onClick={()=>handleRemoveItem(item.productId)} loading={loading}color='error'>
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton  loading={loading}
                  onClick={()=>handleAddItem(item.productId)} color='secondary'>
                    <Add />
                  </LoadingButton>
                    </TableCell>
                <TableCell align="right">
                  {(item.price*item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                <LoadingButton  loading={loading}
                  onClick={()=>handleRemoveItem(item.productId,item.quantity)} color='error'>
                 <Delete />
                </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
           <Grid item xs={6} alignItems={'right'}>
             <BasketSummary/>
                <Button
                  component={Link}
                  to='/checkout'
                  variant='contained'
                  size='large'
                  fullWidth
                >
                 CheckOut
                </Button>
           </Grid>
      </Grid>
      </>

    )

}