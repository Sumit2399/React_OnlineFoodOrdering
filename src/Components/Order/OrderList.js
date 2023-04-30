import React, { useEffect, useState } from 'react';
import { createAPIEndpoint,ENDPOINTS } from '../../api';
import Table from '../../Layouts/Table';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
function OrderList(props) {

    const[orderList,setOrderList]=useState([]);
    const{setOrderId,setorderListVisibility,resetFormControls,setNotify}=props;

    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.ORDER).fetchAll()
        .then(res=>{
            setOrderList(res.data);
        })
        .catch(err=>console.log(err));

    },[])

    const showForUpdate=id=>{
        setOrderId(id);
        setorderListVisibility(false);
        resetFormControls();
    }
    const deleteOrder=id=>{
        if(window.confirm('Are you sure to Delete this record?')){
            createAPIEndpoint(ENDPOINTS.ORDER).delete(id)
            .then(res=>{
                setorderListVisibility(false);
                setOrderId(0);
                resetFormControls();
                setNotify({isOpen:true,message:"Order deleted"});
            })
            .catch(err=>console.log(err));
        }
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Order No.</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Payed with</TableCell>
                    <TableCell>Grand Total</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.map(item=>(
                            <TableRow key={item.orderMasterId}>
                                <TableCell onClick={e=>showForUpdate(item.orderMasterId)}>{item.orderNumber}</TableCell>
                                <TableCell onClick={e=>showForUpdate(item.orderMasterId)}>{item.customer.customerName}</TableCell>
                                <TableCell onClick={e=>showForUpdate(item.orderMasterId)}>{item.pMethod}</TableCell>
                                <TableCell onClick={e=>showForUpdate(item.orderMasterId)}>{item.gTotal}</TableCell>
                                <TableCell><DeleteTwoToneIcon onClick={e=>deleteOrder(item.orderMasterId)} color='secondary'/></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            
        </Table>
    );
}

export default OrderList;