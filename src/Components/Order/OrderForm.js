import React,{useState,useEffect} from 'react';
import Form from '../../Layouts/Form';
import { ButtonGroup, Grid, InputAdornment,Button as MuiButton} from '@mui/material';
import Input from '../../Controls/Input';
import Select from '../../Controls/Select';

import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Buttons from '../../Controls/Buttons';
import ReorderIcon from '@mui/icons-material/Reorder';
import { createAPIEndpoint ,ENDPOINTS} from '../../api';
import { makeStyles } from 'tss-react/mui';
import { roundto2decimalPoint } from '../../utils';
import Popup from '../../Layouts/Popup';
import OrderList from './OrderList';
import Notifications from '../../Layouts/Notifications';

const pMethods=[
    {id:'none',title:'Select'},
    {id:'Cash',title:'Cash'},
    {id:'Card',title:'Card'}
]
const useStyles=makeStyles()(theme=>({
    adornmentText:{
       
        '& .MuiTypography-root':{
            color:'#000',
            fontWeight:'bolder',
            fontSize:'1.5em'
        }
    },
    submitButtonGroup:{
        backgroundColor:'#f3b33d',
        margin:theme.spacing(1),
        color:'#000',
        '& .MuiButton-label':{
            textTransform:'none'
        },
        '&:hover':{
            backgroundColor:'#f3b33d'
        }
    }
}))

function OrderForm(props) {
    const{values,errors,handleInputChange,setValues,setErrors,resetFormControls} =props;
    const {classes}=useStyles();
    const[customerList,setCustomerList]=useState([]);
    const[orderListVisibility,setorderListVisibility]=useState(false);
    const[orderId,setOrderId]=useState(0);
    const[notify,setNotify]=useState({isOpen:false});
    
    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
        .then(res=>{
            let customerList=res.data.map(item=>({
                id:item.customerID,
                title:item.customerName
            }));
            customerList=[{id:0,title:"Select"}].concat(customerList);
            setCustomerList(customerList);
        })
        .catch(err=>console.log(err))
    },
    [])

    useEffect(()=>{
        let gTotal=values.orderDetails.reduce((tempTotal,item)=>{
                return tempTotal+(item.quantity*item.foodItemPrice);
        },0);
       setValues({
        ...values,
        gTotal:roundto2decimalPoint(gTotal)
       })

    },[JSON.stringify(values.orderDetails)])

    useEffect(()=>{
        if(orderId==0) 
          resetFormControls();
        else{
            createAPIEndpoint(ENDPOINTS.ORDER).fetchById(orderId)
            .then(res=>{
                setValues(res.data);
                setErrors({});
            })
            .catch(err=>console.log(err));
        }
    },[orderId])
    
    const resetForm=()=>{
        resetFormControls();
        setOrderId(0);
    }
    const validateForm=()=>{
        let temp={};
        temp.customerId=values.customerId!=0?"":"This Field is required.";
        temp.pMethod=values.pMethod!="none"?"":"This Field is required.";
        temp.orderDetails=values.orderDetails.length!=0?"":"This Field is required.";

        setErrors({...temp});
        return Object.values(temp).every(x=>x==="");
    }
    const submitOrder=e=>{
        e.preventDefault();
        if(validateForm()){
            if(values.orderMasterId==0){
            createAPIEndpoint(ENDPOINTS.ORDER).create(values)
            .then(res=>{
                resetFormControls();
                setNotify({isOpen:true,message:'New order is created'});
            })
            .catch(err=>console.log(err));
        }
        else{
            createAPIEndpoint(ENDPOINTS.ORDER).update(values.orderMasterId,values)
            .then(res=>{
                
                setOrderId(0)
                setNotify({isOpen:true,message:'New order is updated'});
            })
            .catch(err=>console.log(err));
        }

        }
    }
    const openListOfOrders=()=>{
        setorderListVisibility(true);
    }

    return (
        <>
       <Form onSubmit={submitOrder}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <Input 
                  disabled
                 label="Order Number"
                 name="orderNumber"
                 value={values.orderNumber}
                 InputProps={{
                    startAdornment:<InputAdornment
                    className={classes.adornmentText}
                     position='start'>#</InputAdornment>
                 }}
                 />
                 </Grid>
                 <Grid item xs={6}>
                 <Input 
                  disabled
                 label="Grand Total"
                 name="gTotal"
                 value={values.gTotal}
                 InputProps={{
                    startAdornment:<InputAdornment
                     className={classes.adornmentText}
                     position='start'>$</InputAdornment>
                 }}
                 />

            </Grid>
            <Grid item xs={6}>
            <Select
                  label="Customer"
                  name="customerId"
                  value={values.customerId}
                  onChange={handleInputChange}
                  options={customerList}
                  error={errors.customerId}
                  />
           
                </Grid>
               <Grid item xs={6}>
                 <Select
                  label="Payment Method"
                  name="pMethod"
                  options={pMethods}
                  value={values.pMethod}
                  onChange={handleInputChange}
                  error={errors.pMethod}
                  
                  />
                  <ButtonGroup className={classes.submitButtonGroup}>
                    <MuiButton
                      size="large"
                      endIcon={<RestaurantMenuIcon/>}
                      type="submit">Submit</MuiButton>
                      <MuiButton
                      size="small"
                      onClick={resetForm}
                      endIcon={<ReplayIcon/>}
                      />

                  </ButtonGroup>
                  <Buttons
                  className={classes.submitButtonGroup}
                  size="large"
                  onClick={openListOfOrders}
                  startIcon={<ReorderIcon/>}
                  >
                        Order
                  </Buttons>

            </Grid>
        </Grid>
        
       </Form>
       
       <Popup
        title="List of orders"
        openPopup={orderListVisibility}
        setOpenPopup={setorderListVisibility}>
                <OrderList
                {...{setOrderId,setorderListVisibility,resetFormControls,setNotify}}/>
        </Popup>
        <Notifications
          {...{notify,setNotify}}>
            
          </Notifications>
        </>
    );
}

export default OrderForm;