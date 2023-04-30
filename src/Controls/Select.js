import { FormControl, FormHelperText, InputLabel,MenuItem,Select as MuiSelect } from '@mui/material';
import React from 'react';

function Select(props) {
    const{name,label,value,varient,onChange,options,error=null}=props;
    return (
        <FormControl fullWidth
         variant={varient||"outlined"}
         {...(error&&{error:true})}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect 
           label={label}
           name={name}
           value={value}
           onChange={onChange}>
            {
            options.map(
                item=>(<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
            )
            }
            </MuiSelect>
            {error &&<FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default Select;