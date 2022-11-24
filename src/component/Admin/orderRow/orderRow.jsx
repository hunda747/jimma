import React, { useEffect, useState } from "react";
import "./orderRow.css";

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@material-ui/core";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Label from "@material-ui/core/InputLabel";

import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../../redux/actions/orderDetailAction";
// import { changeOrderStatus } from '../../../redux/actions/orderActions'

import { styled } from "@mui/material/styles";
import { Stack, Stepper } from "@mui/material";
// import Stepper from '@mui/material/Steppe r';
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Check } from "@mui/icons-material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { addToCart } from "../../../redux/actions/cartActions";
import {
  changeOrderStatus,
  getOrdersPending,
  getOrdersComplete,
} from "../../../redux/actions/orderActions";
// import { returnProduct } from '../../../redux/actions/productActions';
const steps = ["Processing", "Shipped", "Delivered"];

import ReactMapGL, { Marker } from "react-map-gl";

export default function Row(props) {
  const steps = [
    "Processing",
    "Shipped",
    props?.status === "cancel" ? "Canceled" : "Delivered",
  ];

  const [viewPort, setViewPort] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
    zoom: 14,
    width: "100vw",
    height: "100vh",
  });

  const [marker, setMarker] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
  });
  // const { row } = props;
  const [open, setOpen] = React.useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
    dispatch(getOrderDetails(props.id));
  };

  const orders = useSelector((state) => state.orderDetail.orderDetail);
  // console.log("this are the props");
  // console.log(orders);

  const handleCancelOrder = () => {
    console.log(props.id);
    dispatch(changeOrderStatus(props.id, "cancel"));
    dispatch(getOrdersPending());
    // window.location.reload(true);
  };

  const handleAcceptOrder = () => {
    console.log(props.id);
    dispatch(changeOrderStatus(props.id, "inProgress"));
    dispatch(getOrdersPending());
    // window.location.reload(true);
  };

  const handleCompleteOrder = () => {
    console.log(props.id);
    dispatch(changeOrderStatus(props.id, "complete"));
    dispatch(getOrdersComplete());
    // window.location.reload(true);
  };

  const handleReorder = () => {
    props?.orderProducts.map((order) => {
      dispatch(addToCart(order.id, order.productQuantity));
    });
    navigator("/cart");
  };

  // console.log(orders)
  // console.log("inside row");
  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={
          props.status === "complete"
            ? "comRow"
            : props.status === "cancel"
            ? "canRow"
            : props.status === "pending"
            ? "penRow"
            : "inProg"
        }
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">
          {props.user.fname} {props.user.lname}
        </TableCell>
        {/* <TableCell align="right">{props.user.lname}</TableCell> */}
        <TableCell component="th" scope="row">
          {props.address}
        </TableCell>
        <TableCell component="th" scope="row">
          {props.contact}
        </TableCell>

        {/* <TableCell align="center">{props.date}</TableCell> */}
        <TableCell align="center">{props.total} Birr</TableCell>

        {props.status === "pending" ? (
          <TableCell align="right">
            <Button
              onClick={handleCancelOrder}
              style={{ border: "1px solid black" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAcceptOrder}
              style={{ border: "1px solid black" }}
            >
              Accept
            </Button>
          </TableCell>
        ) : props.status === "inProgress" ? (
          <TableCell align="right">
            <Button
              onClick={handleCompleteOrder}
              style={{ border: "1px solid black" }}
            >
              Complete
            </Button>
            {/* <Label className='btn'>In progress</Label> */}
          </TableCell>
        ) : props.status === "complete" ? (
          <TableCell align="right">
            <Label className="btn">Complete</Label>
          </TableCell>
        ) : props.status === "cancel" ? (
          <TableCell align="right">
            <Label className="btn">Canceled</Label>
          </TableCell>
        ) : (
          ""
        )}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className="ordersInfo">
                <Typography variant="h6" gutterBottom component="div">
                  Detail
                </Typography>

                <div className="topInfo">
                  <table border="0" cellPadding="10" size="20px">
                    <tr>
                      <td>Order number: </td>
                      <td>{props.id}</td>
                    </tr>
                    <tr>
                      <td>Order placed: </td>
                      <td>{props.date}</td>
                    </tr>
                    <tr>
                      <td>Status: </td>
                      <td>
                        {props.status === "pending" ? (
                          <p>Processing</p>
                        ) : props.status === "inProgress" ? (
                          <p>In Progress</p>
                        ) : (
                          <p>Completed</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Order placed by: </td>
                      <td>{props.user.fname}</td>
                    </tr>
                  </table>
                </div>

                <div className="middleInfo">
                  <div className="infoItem">
                    <p>Status</p>
                    <Box sx={{ width: "200%" }}>
                      <Stepper
                        activeStep={
                          props.status === "pending"
                            ? 0
                            : props.status === "inProgress"
                            ? 1
                            : 2
                        }
                        alternativeLabel
                      >
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </div>
                  <div className="infoItem">
                    <p>Shiping Address</p>
                    <h2>{props.address}</h2>
                  </div>
                  {/* <div className='infoItem'>
                    <p>Payment Info</p>
                    <h2>Cash on delivey</h2>
                  </div> */}
                </div>
                <div className="mapHolder">
                  <ReactMapGL
                    {...viewPort}
                    mapboxAccessToken="pk.eyJ1IjoiZGFuaGdiIiwiYSI6ImNsMXVnNDIxbzAwMmYzcXBiMXB0ZWVjcWMifQ.nC63RhWneFhiZ4k4XJim9A"
                    onMove={(viewPort) => {
                      setViewPort(viewPort);
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                  >
                    <Marker
                      latitude={marker.latitude}
                      longitude={marker.longitude}
                    />
                  </ReactMapGL>
                </div>

                <div className="itemsInfo">
                  <p>Items</p>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        {/* <TableCell>Price</TableCell> */}
                        {/* <TableCell align="right">Catagory</TableCell> */}
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Reorder</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders?.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell component="th" scope="row">
                            {order.foods.food_name}
                          </TableCell>
                          {/* <TableCell>{order.price} Birr</TableCell> */}
                          {/* <TableCell align="right">{order.productId.productCategory}</TableCell> */}
                          <TableCell align="right">{order.quantity}</TableCell>
                          <TableCell align="right">
                            <Button
                              className="btn"
                              onClick={(e) => {
                                navigator("/details/" + order.id);
                              }}
                              style={{ border: "1px solid black" }}
                            >
                              View Product
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <p className="totalInfo">Total: {props.total} Birr</p>

                  {props?.admin ? (
                    ""
                  ) : (
                    <Button
                      className="btn"
                      onClick={handleReorder}
                      style={{
                        border: "1px solid black",
                        justifyItems: "right ",
                      }}
                    >
                      Reorder Items
                    </Button>
                  )}
                </div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
