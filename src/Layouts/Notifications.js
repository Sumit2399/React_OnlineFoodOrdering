import { Snackbar } from '@mui/base';
import { Alert } from '@mui/material';
import React from 'react';
import { makeStyles } from 'tss-react/mui';


const useStyles=makeStyles()(theme=>({
    root:{
        top:theme.spacing(1),
        '& .MuiAlert-root':{
            backgroundColor:'#f3b33d',
            color:'#000'
        },
        '& .MuiAlert-icon':{
            color:'#000'
        }
    }
}))

function Notifications(props) {

    const{notify,setNotify}=props;
    const {classes}=useStyles();

    const handleClose=(event,reason)=>{
        if(reason==='clickaway'){
            return;
        }
        setNotify({
            ...notify,
            isOpen:false
        })
    }

    return (
        <Snackbar className={classes.root}
           autoHideDuration={3000}
           
           open={notify.isOpen}
           anchorOrigin={{
            horizontal: 'right',
            vertical: 'top'
            
          }}
           onClose={handleClose}>
           <Alert
             onClose={handleClose}>
                {notify.message}
             </Alert>
             </Snackbar>
    );
}

export default Notifications;