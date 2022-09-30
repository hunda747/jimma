import React, {useEffect} from "react";

import { Box, Collapse, IconButton,
  Table, TableBody, TableCell,
   TableContainer, TableHead,
    TableRow, Typography, Paper} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { getOrdersbyUser, getOrdersComplete } from '../../redux/actions/orderActions';
 
import Row from './orderDetail';
// import Row from '../../component/Admin/orderRow/orderRow';
import { useCookies } from "react-cookie";

export default function UserOrder(params) {
  const dispatch = useDispatch();
  
	const [cookies, setCookie] = useCookies(['user']);

  useEffect(()=>{
    // fetchAllOrders();
    dispatch(getOrdersbyUser(cookies.uid));
  },[])
  
  const orders = useSelector((state) => state.order.orders);
  
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead >
            <TableRow>
              <TableCell />
              {/* <TableCell>Name</TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell>Address</TableCell>
              {/* <TableCell>Phone number</TableCell> */}
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
                    contact = {val.contact} 
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
    </>
  )
};
