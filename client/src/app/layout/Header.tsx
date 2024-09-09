import {  ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";



const midlinks=[
{title:'catalog' ,path:'/catalog'},
{title:'about' ,path:'/about'},
{title:'contact' ,path:'/contact'},
]

const rightlinks=[
    {title:'login' ,path:'/login'},
    {title:'register' ,path:'/register'},
    ]
   /* Pass navstyles object in sx instead of writing everywhere*/ 
const navStyles={
    
        color:'inherit',
        textDecoration:'none',
        typography:'h6',
        '&:hover':{
            color:'grey.500'
        },
        '&.active':{
            color:'text.secondary'
        }
    
    }


interface Props{
darkMode:boolean;
handleThemeChange: () => void;

}

export default function Header({darkMode,handleThemeChange}:Props){

    return (

    <AppBar  position='static' sx={{mb:4}}>
     
     <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

     <Box display='flex' alignItems='center'>
     
<Typography variant='h6' component={NavLink} to='/'
sx={{color:'inherit',textDecoration:'none'}}
> RE-STORE</Typography>
<Switch checked={darkMode} onChange={handleThemeChange}  />    
     </Box>


        {/* navlink important property too */}
        <List sx={{display:'flex'}}>
            {midlinks.map(({title,path})=>(<ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={navStyles}
            >
            {title.toUpperCase()}

        </ListItem>))} 
        </List>
        <Box display='flex' alignItems='center'>
        <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr:2}}>
        <Badge badgeContent='4' color="secondary">
        <ShoppingCart/>
        </Badge>
        </IconButton>
        {/* navlink important property too */}
        <List sx={{display:'flex'}}>
            {rightlinks.map(({title,path})=>(<ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={navStyles}
            >
            {title.toUpperCase()}
            </ListItem>))} 
        </List>
        </Box>        
    </Toolbar>
    </AppBar>
    )
}