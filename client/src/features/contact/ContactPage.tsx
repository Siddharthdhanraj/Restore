import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/store/configureStore";
import { decrement,increment } from "./counterSlice";

export default function ContactPage(){
    const dispatch=useDispatch();
    const {data,title}=useAppSelector(state=>state.counter);
    return(
        <>
        <Typography variant="h2"> {title}</Typography>
        <Typography variant="h5"> The data is:{data}</Typography>
        <ButtonGroup >
           <Button variant='contained' color='error'  onClick={()=>dispatch(decrement(1))}>DECREMENt</Button>
           <Button variant='contained' color='primary'  onClick={()=>dispatch(increment(1))}>INCREMENT</Button>
           <Button variant='contained' color='secondary'  onClick={()=>dispatch(increment(5))}>Increment by 5</Button>
        </ButtonGroup>
        </>

    )
}