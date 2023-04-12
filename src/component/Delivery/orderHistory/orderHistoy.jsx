import React, { useEffect } from "react";
import { useState } from "react";
import "./orderHistory.css";

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
import Button from "@material-ui/core/Button";
import Label from "@material-ui/core/InputLabel";

import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersInprogress,
  getOrdersPending,
  getOrdersByDeliveryId,
  getOrdersByDeliveryIdAndDate,
  getOrdersComplete,
} from "../../../redux/actions/orderActions";
// import { getOrderDetails } from '../../../redux/actions/orderDetailAction';
// import { changeOrderStatus } from '../../../redux/actions/orderActions'

import TableRows from "../../Admin/orderRow/orderRow";
// import TableRows from '../orderTableRow/orderTableRow'
import axios from "axios";

import { useCookies } from "react-cookie";
import { MenuItem, Select } from "@mui/material";
import { Stack, TextField } from "@mui/material";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

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

export default function OrderHistory() {
  const [open, setOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getOrdersByDeliveryId(cookies?.ADid));
    dispatch(getOrdersComplete());
  }, []);

  const orders = useSelector((state) => state.order.orders);

  const [displayedOrders, setDisplayedOrders] = useState(orders);

  const date = new Date();
  const [value, setValue] = React.useState(date);

  const handleChange = (newValue) => {
    // setValue(newValue);
    // const year = newValue.getFullYear();
    // let months = newValue.getMonth()+1;
    // let days = newValue.getDate();
    // if(String(days).length < 2){
    //   days = '0' + days;
    // }
    // if(String(months).length < 2){
    //   months = '0' + months;
    // }
    // const selectedDate = year+'-'+months+'-'+days;
    // dispatch(getOrdersByDeliveryIdAndDate(cookies?.ADid, selectedDate))
  };

  const handleViewAll = () => {
    // dispatch(getOrdersByDeliveryId(cookies?.ADid));
  };

  useEffect(() => {
    setDisplayedOrders(orders);
  }, [handleChange]);

  return (
    <div className="orderHistoryWrapper">
      <div>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        {/* <Stack spacing={3}> */}
        {/* <MobileDatePicker
              label="Date mobile"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <Button onClick={handleViewAll}>View All Orders</Button> */}
        {/* </Stack> */}
        {/* </LocalizationProvider> */}
      </div>

      <div className="orderTable_holder">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone number</TableCell>
                <TableCell align="right">Sub-Total</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!displayedOrders?.length ? (
                <div>No Orders</div>
              ) : (
                displayedOrders.map((val, key) => {
                  // // console.log(val);
                  return (
                    <TableRows
                      key={val._id}
                      id={val._id}
                      fname={val.fname}
                      lname={val.lname}
                      contact={val.contact}
                      user={val.userId}
                      total={val.total}
                      date={val.date}
                      status={val.status}
                      address={val.address}
                      orders={val.orders}
                      longitude={val.longitude}
                      latitude={val.latitude}
                      admin={true}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
