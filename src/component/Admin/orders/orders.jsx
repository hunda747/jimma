import React, {useEffect} from 'react'
import './orders.css'
import { Box, Collapse, IconButton,
   Table, TableBody, TableCell,
    TableContainer, TableHead,
     TableRow, Typography, Paper} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { getOrdersInprogress, getOrdersPending, getOrders, getOrdersComplete } from '../../../redux/actions/orderActions';

import { CircularProgress} from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// import UserTableRow from '../../../components/ProductManager/orderRow/orderRow'
 
import Row from '../orderRow/orderRow';
import axios from 'axios';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import {Stack, TextField} from '@material-ui/core';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function Orders() {

  // const [orders , setOrders] = useState([]);
  const [loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 0){
      dispatch(getOrdersPending());
    }else if(newValue === 1){
      dispatch(getOrdersInprogress());
    }else{
      dispatch(getOrdersComplete());
    }
  };

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const fetchAllOrders = async() =>{
    const response = await axios.post('http://localhost:5000/api/getOrders');
    // setOrders(response.data)
  }

  useEffect(()=>{
    // fetchAllOrders();
    dispatch(getOrdersPending());
  },[])

  

  const orders = useSelector((state) => state.order.orders);
  // const load = useSelector((state) => state.order.loading);
  // setLoader(load);

  // useEffect(()=>{
  //   setLoader(load);
  // },[dispatch])

  const date = new Date();
  const [dateValue, setDateValue] = React.useState( date );

  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
    const year = newValue.getFullYear();
    let months = newValue.getMonth()+1;
    let days = newValue.getDate();
    if(String(days).length < 2){
      days = '0' + days;
    }
    if(String(months).length < 2){
      months = '0' + months;
    }
    const selectedDate = year+'-'+months+'-'+days;
    console.log(selectedDate);
    // dispatch(getCompleteOrdersByDate(selectedDate))
  };

  const handleViewAll = () => {
    dispatch(getOrdersComplete());
  }

  return (
    <>
      
        <div className='orderPageContainer'>
          <div className='orderTable_holder'>

          <div className={classes.root}>
            <AppBar position="static" color="default">
							<Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs">

              	<Tab label="Pending Orders"  {...a11yProps(0)} />
              	<Tab label="Inprogress Orders" {...a11yProps(1)}/>
              	<Tab label="Complete Orders" {...a11yProps(2)}/>
            	</Tabs>
            </AppBar>

						<TabPanel value={value} index={0}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead >
                    <TableRow>
                      <TableCell />
                      <TableCell>Order Id</TableCell>
                      <TableCell>Name</TableCell>
                      {/* <TableCell>Date</TableCell> */}
                      {/* <TableCell>Last name</TableCell> */}
                      <TableCell align="right">
                        Sub-Total</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                    !orders?.length ? <div>No Orders</div> : (
                      orders.map((val, key) => {
                        console.log(val);
                        return (
                          <Row 
                            key = {val._id}   
                            id = {val._id}
                            fname = {val.fname}
                            lname = {val.lname}
                            contact = {val.userId.contact} 
                            user = {val.userId}
                            total = {val.total}
                            date = {val.date}
                            status = {val.status}
                            address = {val.address}
                            orders = {val.orders}
                            longitude = {val.longitude}
                            latitude = {val.latitude}
                            admin = {true}
                            />
                          )
                      }
                    ))
                  }
                  </TableBody>
                </Table>
              </TableContainer>
						</TabPanel>

						<TabPanel value={value} index={1}>          
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead >
                    <TableRow>
                      <TableCell />
                      <TableCell>Order Id</TableCell>
                      <TableCell>Date</TableCell>
                      {/* <TableCell>Last name</TableCell> */}
                      <TableCell align="right">
                        Sub-Total</TableCell>
                      <TableCell align="right">Status</TableCell>
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      !orders?.length ?
                        // loader ? 
                        //   <CircularProgress />
                        // : 
                          <div>empty</div>
                      : (
                        orders.map((val, key) => {
                          console.log(val);
                          return (
                            // <Row 
                            //   key = {val.orderId}   
                            //   id = {val.orderId}
                            //   fname = {val.fname}
                            //   lname = {val.lname}
                            //   contact = {val.contact === null ? val.contact : null} 
                            //   total = {val.total}
                            //   date = {val.date}
                            //   status = {val.status}
                            //   admin = {true}
                            //   />
                            <Row 
                              key = {val._id}   
                              id = {val._id}
                              fname = {val.fname}
                              lname = {val.lname}
                              contact = {val.userId.contact} 
                              user = {val.userId}
                              total = {val.total}
                              date = {val.date}
                              status = {val.status}
                              address = {val.address}
                              orders = {val.orders}
                              longitude = {val.longitude}
                              latitude = {val.latitude}
                              admin = {true}
                              />
                            )
                        }
                      ))
                  }
                  </TableBody>
                </Table>
              </TableContainer>
						</TabPanel>

						<TabPanel value={value} index={2}>  
              <div>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                  {/* <Stack spacing={3}> */}
                    {/* <MobileDatePicker
                      label="Date mobile"
                      inputFormat="MM/dd/yyyy"
                      value={dateValue}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Button onClick={handleViewAll}>View All Orders</Button> */}
                  {/* </Stack> */}
                {/* </LocalizationProvider> */}
              </div>          
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead >
                    <TableRow>
                      <TableCell />
                      <TableCell>Order Id</TableCell>
                      <TableCell>Date</TableCell>
                      {/* <TableCell>Last name</TableCell> */}
                      <TableCell align="right">
                        Sub-Total</TableCell>
                      <TableCell align="right">Status</TableCell>
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      !orders?.length ? <div>empty</div> : (
                        orders.map((val, key) => {
                          console.log(val);
                          return (
                            <Row 
                              key = {val._id}   
                              id = {val._id}
                              fname = {val.fname}
                              lname = {val.lname}
                              contact = {val.userId.contact} 
                              user = {val.userId}
                              total = {val.total}
                              date = {val.date}
                              status = {val.status}
                              address = {val.address}
                              orders = {val.orders}
                              longitude = {val.longitude}
                              latitude = {val.latitude}
                              admin = {true}
                              />
                            )
                        }
                      ))
                  }
                  </TableBody>
                </Table>
              </TableContainer>
						</TabPanel>
                
          </div>

          
          </div>
        </div>
     
    </>
    
  )
}
