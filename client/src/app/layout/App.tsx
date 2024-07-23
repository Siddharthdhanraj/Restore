
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";


function App() {
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

  return (
  
      <ThemeProvider theme={theme}>
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
