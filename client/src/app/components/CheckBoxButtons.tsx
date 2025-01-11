import { FormControlLabel, Checkbox, FormGroup,  } from "@mui/material";
import { useState } from "react";

interface Props{
 items:string[];
 checked?:string[];
 OnChange:(items:string[])=>void;

}

export default function CheckBoxButtons ({items,checked,OnChange}:Props){
const[checkedItems,setCheckedItems]=useState(checked|| [] );

function handleChecked(value:string){
//If product is already checked
const currentIndex=checkedItems.findIndex(item=>item===value);
let newChecked: string[]=[];
if(currentIndex===-1)
    newChecked=[...checkedItems,value];
else
newChecked=checkedItems.filter(item=>item!==value);
setCheckedItems(newChecked);
OnChange(newChecked);
}
    return(
        <FormGroup >
        {items.map(item=>(<FormControlLabel  
        control={<Checkbox 
        checked={checkedItems.indexOf(item)!==-1}
        onClick={()=>handleChecked(item)}
        />} 
        label={item}  
        key={item}/>))}
        </FormGroup>
    )
        

}