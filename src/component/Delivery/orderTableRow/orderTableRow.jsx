import React, {useState} from 'react';
import './orderTableRow.css'
import { message } from 'antd';

import { Box, Collapse, IconButton, 
  Table, TableBody, TableCell, 
  TableContainer, TableHead,
   TableRow, Typography,
    Paper} from '@material-ui/core';

import ReactMapGL , {Marker} from 'react-map-gl';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Label from '@material-ui/core/InputLabel';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../../redux/actions/orderDetailAction';
// import { changeOrderStatus } from '../../../redux/actions/orderActions'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import {MenuItem, Select} from '@mui/material';
import { useCookies } from 'react-cookie';

export default function Row(props) {
  // const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const handleClick = () => {
    setOpen(!open);
    const id = props.Order_id;
    dispatch(getOrderDetails(props.id));
  }
  
  const handleAcceptOrder = async() => {
    console.log(props.id);
    //dispatch(changeOrderStatus(props.id, 'complete'))
    if(cookies?.ADid){
      const orderNo = await axios.post('http://127.0.0.1:5000/api/countOrderById', {id: cookies.ADid});

      console.log(orderNo.data.orderNo);
     

      if(orderNo.data.orderNo < 1){
        message.success("Order Accepted")
        const respond = await axios.post('http://localhost:5000/api/changeStatusAccept', {id: props.id, deliveryID: cookies.ADid});
        if(respond.status === 200){
          window.location.reload(false);          
        }
      
      }else{
        message.warn("Order still in Progress")
      }
    }else{
      console.log('not logged in');
      navigator('/adminstrationLogin');
    }
  }
  
  const handleCompleteOrder = async() => {
    console.log(props.id);
    //dispatch(changeOrderStatus(props.id, 'complete'))
    if(cookies?.ADid){
      const respond = await axios.post('http://localhost:5000/api/changeStatusComplete', {id: props.id, status: "complete"});
      message.success("Order Complete")
       if(respond.status === 200){
        window.location.reload(false);
      }
    }else{
      console.log('not logged in');
      navigator('/adminstrationLogin');
    }
  }
  
  const handleCancelOrder = async() => {
    console.log(props.id);
    //dispatch(changeOrderStatus(props.id, 'complete'))
    message.success("Order Has Been Canceled")
    if(cookies?.ADid){
      const respond = await axios.post('http://localhost:5000/api/changeStatusComplete', {id: props.id, status: "pending"});
      if(respond.status === 200){
        window.location.reload(false);
       
      }
    }else{
      console.log('not logged in');
      navigator('/adminstrationLogin');
    }
  }

  const [viewPort , setViewPort] = useState({
    latitude: Number(props.latitude),
    longitude: Number(props.longitude),
    zoom:13,
    width: '100vw',
    height: '100vh'
  })

  const [marker,setMarker] = useState({
    latitude: Number(props.latitude),
    longitude: Number(props.longitude)
  });

  const orders = useSelector((state) => state.getOrderDetail.orderDetails);

  return (
    <React.Fragment>

      <TableRow 
      sx={{ '& > *': { borderBottom: 'unset' } }}
      className={ props.status === 'complete' ? 'comRow' 
      : props.status === 'canceled' ? 'canRow' 
      : props.status === 'pending' ? 'penRow' : 'inProg'}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.id}
        </TableCell>
        <TableCell align="center">{props.date}</TableCell>
        <TableCell align="right">{props.total} BIRR</TableCell>
        <TableCell align="center">{props.address}</TableCell>
        
        { 
        props.status === 'pending' ? (
          <TableCell align="right">
            <Button className='btn' onClick={handleAcceptOrder} style={{border: '1px solid black'}}>Accept</Button>
          </TableCell>
        ): props.status === 'inProgress' ? (
          <TableCell align="right">
            <Label className='btn'>In progress</Label>
          </TableCell>
        ) : props.status === 'inProgress' ? 
          <TableCell align="right">
            <Label className='btn'>Complete</Label>
          </TableCell>
        : ''
        }
      </TableRow>

      <TableRow>
        <TableCell 
        style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>

                <div className="topInfo">
                  <table border="0" cellPadding="10" size="20px">
                    <tr>
                      <td  className='detailInfoTitle' >  Order number: </td>
                      <td className='detailInfos' >{props.id}</td>
                    </tr>
                    <tr>
                      <td  className='detailInfoTitle'>Order placed: </td>
                      <td className='detailInfos'>{props.date}</td>
                    </tr>
                    <tr>
                      <td  className='detailInfoTitle'>Status: </td>
                      <td className='detailInfos'>{props.status === "pending" ? "Processing" : props.status === "inProgress" ? "In Progress" : "Complete" }</td>
                    </tr>
                    <tr>
                      <td  className='detailInfoTitle'>Order placed by: </td>
                      <td className='detailInfos'>{props.fname} {props.lname}</td>
                    </tr>
                  </table>
                </div>

              <div className='mapDelivery'>
                <div className="mapHolder">
                  <ReactMapGL {...viewPort} 
                  mapboxAccessToken="pk.eyJ1IjoiZGFuaGdiIiwiYSI6ImNsMXVnNDIxbzAwMmYzcXBiMXB0ZWVjcWMifQ.nC63RhWneFhiZ4k4XJim9A" 
                  onMove={(viewPort)=> { setViewPort(viewPort)}}
                  mapStyle="mapbox://styles/mapbox/streets-v11"> 
                    <Marker latitude={marker.latitude} longitude={marker.longitude} />
                  </ReactMapGL>  
                </div>
              </div>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Catagory</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell component="th" scope="row">
                        {order.productName}
                      </TableCell>
                      <TableCell>{order.productPrice}</TableCell>
                      <TableCell align="right">{order.productCategory}</TableCell>
                      <TableCell align="right">
                        {order.productQuantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className='totalInfo'>Total:     {props.total} Birr</p>

              {/* {orders.map((order) => ( 
              <div className='cartItem'>
                <div className="cartItemHolder">
                  <div className='cartItem_img'>
                    <Link to={`/productDetails/${order.product}`}>
                      <img src={order.imageUrl}  alt={order.productName} />
                    </Link>
                  </div>

                  <p className='cartItem_brand'>{order.brand}</p>

                  <Link to={`/productDetails/${order.product}`}>
                    <p className='cartItem_name'>{order.productName}</p>            
                  </Link>
                  
                  <p className='cartItem_price'>${order.productPrice}</p>

                  <p className='cartItem_price'>${order.productQuantity}</p>

                  </div>
                </div>

               ))} */}


            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
            
      { props.status === 'inProgress' ? (
        <div className='deliveryInProgressBtnHolder'>
          <TableCell align="left">
            <Button className='deliveryComplete_btn' onClick={handleCompleteOrder} style={{border: '1px solid black'}}>Complete</Button>
          </TableCell>
          <TableCell align="left">
            <Button className='deliveryCancel_btn' onClick={handleCancelOrder} style={{border: '1px solid black'}}>Cancel</Button>
          </TableCell>
        </div>
      ) : '' }

    </React.Fragment>
  );
}
