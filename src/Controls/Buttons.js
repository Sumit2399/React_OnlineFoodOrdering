

import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles=makeStyles()(theme=>({
    root:{
        margin:theme.spacing(1),
        '& .MuiButton-label':{
            textTransform:'none'
        }
        
        
    }
}))


function Buttons(props) {
    const{children,onClick,variant,color,className,...other}=props;
    const {classes}=useStyles();

    return (
        <MuiButton
         className={classes.root+' '+(className||'')}
        variant={variant||"contained"}
        color={color}
         onClick={onClick}
         {...other}>
         {children}
         </MuiButton>
    )
}

export default Buttons;