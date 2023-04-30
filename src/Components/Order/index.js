import React from 'react';
import OrderForm from './OrderForm';
import useForm from '../../hooks/useForm';
import { Grid } from '@mui/material';
import SearchFoodItems from './SearchFoodItems';
import OrderedFoodItem from './OrderedFoodItem';


const generateOrderNumber=()=>Math.floor(100000+Math.random()*900000).toString();

const getFreshModelObject=()=>({
    orderMasterId:0,
    orderNumber:generateOrderNumber(),
    customerId:0,
    pMethod:'none',
    gTotal:0,
    deletedOrderItemIds:'',
    orderDetails:[]

})

function Order() {
    const{
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);
    
 return (
        <Grid container spacing={2} >
            <Grid item sx={12}>
            <OrderForm
           {...{values,errors,setErrors,handleInputChange,setValues,resetFormControls}}
            />
            </Grid>
                <Grid item xs={6}>
                    <SearchFoodItems
                    {...{values,setValues,
                       ordered:values.orderDetails}}/>
                </Grid>

                <Grid item xs={6}>
                    <OrderedFoodItem
                    {...{ordered:values.orderDetails,values,setValues,errors}}/>
                </Grid>
            </Grid>
            
    )
}

export default Order;