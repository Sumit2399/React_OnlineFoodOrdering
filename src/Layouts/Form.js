import styled from '@emotion/styled';
import React from 'react';
import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()(({ theme }) => ({
  root: {
    '& .MuiFormControl-root': {
      width: "90%",
      margin: '8px',
    },
  },
}));


function Form(props) {
    const {classes}=useStyles();
    const{children,...other}=props;
    return (
       <form className={classes.root} noValidate autoComplete='off' {...other}>
        {children}
       </form>
    );
}

export default Form;