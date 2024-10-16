
import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";


function App() {
  const{setBasket}=useStoreContext();
  const[loading,setLoading]=useState(true);
  useEffect(()=>{
   const buyerId=getCookie('buyerId');
    if(buyerId)
    {
      agent.Basket.get()
    .then(basket=>setBasket(basket))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
    }
    else{
   setLoading(false);

    }


  },[setBasket])

const [darkMode,setdarkmode] =useState(false);
const paletteType=darkMode? 'dark':'light';
const theme=createTheme({
palette:
{
   mode:paletteType,
   background:{
    default:paletteType==='light'?'#eaeaea':'#121212'

   }
}
 
})

function handleThemeChange()
{

  setdarkmode(!darkMode);

}
if(loading) 
  <LoadingComponent message='Initialising app..' />

  return (
  
    <ThemeProvider theme={theme}>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <CssBaseline />
     <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
     <Container>
     { /* Created Catalog child component and passed product and function needed for adding products*/}
     <Outlet/>
     </Container>
   
    </ThemeProvider>
  );
}

export default App
