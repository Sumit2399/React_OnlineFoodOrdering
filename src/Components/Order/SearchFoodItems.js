import React,{useState,useEffect} from 'react';
import { createAPIEndpoint,ENDPOINTS } from '../../api';
import { IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Table } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { makeStyles } from 'tss-react/mui';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const useStyles=makeStyles()(theme=>({
    searchPaper:{
        padding:'2px 4px',
        display:'flex',
        alignItems:'center'
    },
    searchInput:{
        marginLeft:theme.spacing(1),
        flex:1,
    },
    listRoot:{
        marginTop:theme.spacing(1),
        maxHeight:450,
        overflow:'auto',
        '& li:hover':{
            cursor:'pointer',
            backgroundColor:'#e3e3e3'
        },
        '& li:hover .MuiButtonBase-root':{
            display:'block',
            color:'#000'
        },
        '& .MuiButtonBase-root':{
            display:'none'
        },
        '& .MuiButtonBase-root:hover':{
            backgroundColor:'transparent'
        }
    }
}))
function SearchFoodItems(props) {
    const{ordered,values,setValues}=props;
    const[foodItems,setFoodItems]=useState([]);
    const {classes}=useStyles();
    const[searchKey,setSearchKey]=useState('');
    const[searchList,setSearchList]=useState([]);

    const addFoodItem=foodItem=>{
        let x={
            orderMasterId:values.orderMasterId,
            orderDetailId:0,
            foodItemId:foodItem.foodItemId,		
            foodItemPrice:foodItem.price,	
            quantity:1,
            foodItemName:foodItem.foodItemName
        }
        setValues({
            ...values,
            orderDetails:[...values.orderDetails,x]
        })
    }
    
    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.FOODITEM).fetchAll()
        .then(res=>{
            setFoodItems(res.data);
            setSearchList(res.data);

        })
        .catch(err=>console.log(err));

    },[]);

    useEffect(()=>{
        let x=[...foodItems];
        x=x.filter(y=>{
            return y.foodItemName.toLowerCase().includes(searchKey.toLowerCase())
            && ordered.every(item=>item.foodItemId!=y.foodItemId)
        });
            setSearchList(x);

    },[searchKey,ordered])


    return (
        <>
        <Paper className={classes.searchPaper}>
            <InputBase className={classes.searchInput}
            value={searchKey}
            onChange={e=>setSearchKey(e.target.value)}
            placeholder='Search food items'/>
            <IconButton>
                <SearchTwoToneIcon/>
            </IconButton>
        </Paper>
       <List className={classes.listRoot}>
        {
            searchList.map((item,idx)=>(
                <ListItem onClick={e=>addFoodItem(item)}
                 key={idx}>
                    <ListItemText primary={item.foodItemName}
                                  secondary={'$'+item.price}/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={e=>addFoodItem(item)}>
                            <PlusOneIcon/>
                            <ArrowForwardIosIcon/>
                        </IconButton>
                        </ListItemSecondaryAction>              
                 </ListItem>
            ))
        }
       </List>
       
       </>
    );
}

export default SearchFoodItems;