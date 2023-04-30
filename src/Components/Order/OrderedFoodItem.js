import { Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material';
import React from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { roundto2decimalPoint } from '../../utils';
import { makeStyles } from 'tss-react/mui';

const useStyles=makeStyles()(theme=>({
    paperRoot:{
        margin:'15px 0px',
        '&:hover':{
            cursor:'pointer'
        },
        '&:hover $deleteButton':{
            display:'block'
        }

    },
    buttonGroup:{
        backgroundColor:'#e3e3e3',
        borderRadius:8,
        '& .MuiButtonBase-root':{
            border:'none',
            minWidth:'25px',
            padding:'1px'
        },
        '& button:nth-child(2)':{
            fontSize:'1.2em',
            color:'#000'
        }
    },
    deleteButton:{
       
        '& .MuiButtonBase-root':{
            
            color:'#e81719'

        },
    },
    totalPerItem:{
        fontWeight:'bolder',
        fontSize:'1.2em',
        margin:'0px 10px'
    }
}))
function OrderedFoodItem(props) {
    const{ordered,values,setValues,errors}=props;
    const{classes}=useStyles();
    
    const updateQuantity=(idx,value)=>{
        let x={...values};
        if(x.orderDetails[idx].quantity+value>0){
        
        x.orderDetails[idx].quantity+=value;
        setValues({...x});
        }
    }

    const removeFoodItem=(index,id)=>{
        let x={...values};
        x.orderDetails=x.orderDetails.filter((item,i)=>i!=index)
        if(id!=0)
        x.deletedOrderItemIds+=id+',';
        setValues({...x});
    }
    return (
         <List>
            {ordered.length==0?
                    <ListItem>
                        <ListItemText
                         primary="Please select food items"
                         primaryTypographyProps={{
                            style:{
                                textAlign:'center',
                                fontStyle:'italic'
                            }
                         }}
                         />
                    </ListItem>
                :ordered.map((item,idx)=>(
                    <Paper key={idx} className={classes.paperRoot}>
                        <ListItem>
                            <ListItemText
                              primary={item.foodItemName}
                              primaryTypographyProps={{
                                component:'h1',
                                style:{
                                    fontWeight:'500',
                                    fontSize:'1.2em'
                                }

                              }}
                              secondary={
                                <>
                                <ButtonGroup className={classes.buttonGroup}>

                                    <Button onClick={e=>updateQuantity(idx,-1)}>-</Button>
                                    <Button
                                      disabled>{item.quantity}</Button>
                                    <Button onClick={e=>updateQuantity(idx,1)}>+</Button>

                                </ButtonGroup>
                                <span className={classes.totalPerItem}>{'$'+roundto2decimalPoint(item.quantity*item.foodItemPrice)}</span>
                                
                                </>
                              }
                              secondaryTypographyProps={{
                                component:'div'
                              }}
                              />
                              <ListItemSecondaryAction className={classes.deleteButton}>

                                <IconButton 
                                disableRipple
                                onClick={e=>removeFoodItem(idx,item.orderDetailId)}>
                                <DeleteTwoToneIcon/>
                                </IconButton>
                              </ListItemSecondaryAction>
                              
                        </ListItem>
                    </Paper>

                ))
            }
        </List>
        
    );
    
}

export default OrderedFoodItem;