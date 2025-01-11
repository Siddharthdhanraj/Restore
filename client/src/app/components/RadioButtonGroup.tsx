import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props{
 options:any[];
 OnChange:(event:any)=>void;
 selectedValue:string;

}
export default function RadioButtonGroup({options,OnChange,selectedValue}:Props){
    return(
        <FormControl component="fieldset">
         <RadioGroup onChange={OnChange} value={selectedValue}>
           {options.map(({value,label})=>(<FormControlLabel value={value} control={<Radio />} label={label} key={value} />))}
         </RadioGroup>
        </FormControl>
    )

}