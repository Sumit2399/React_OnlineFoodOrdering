
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import {Table as MuiTable} from '@mui/material';



const useStyles=makeStyles()(theme=>({
    table:{
        '& tbody td':{
            fontWeight:'300'
        },
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2'
            ,cursor:'pointer'
        },
        '& .MuiTableCell-root':{
            border:'none'
        }
    }
}))
function Table(props) {
    const {classes}=useStyles();
    return (
       <MuiTable className={classes.table}>
        {props.children}
       </MuiTable>
    );
}

export default Table;