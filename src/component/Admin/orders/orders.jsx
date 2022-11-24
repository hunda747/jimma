import React, { useEffect } from "react";
import "./orders.css";
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

import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersInprogress,
  getOrdersPending,
  getOrders,
  getOrdersComplete,
} from "../../../redux/actions/orderActions";

import { CircularProgress } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// import UserTableRow from '../../../components/ProductManager/orderRow/orderRow'

import Row from "../orderRow/orderRow";
import axios from "axios";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useCookies } from "react-cookie";
import { Stack, TextField } from "@material-ui/core";

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
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function Orders() {
  // const [orders , setOrders] = useState([]);
  const [loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["user"]);
  // console.log(cookies.ADaccess_token);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(getOrdersPending());
    } else if (newValue === 1) {
      dispatch(getOrdersInprogress());
    } else {
      dispatch(getOrdersComplete(cookies.ADaccess_token));
    }
  };

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const fetchAllOrders = async () => {
    const response = await axios.post("http://localhost:5000/api/getOrders");
    // setOrders(response.data)
  };

  useEffect(() => {
    // fetchAllOrders();
    dispatch(getOrdersPending());
  }, []);

  const orders = useSelector((state) => state.order.orders);

  const orderLoad = useSelector((state) => state.order.loading);
  // const load = useSelector((state) => state.order.loading);
  // setLoader(load);

  // useEffect(()=>{
  //   setLoader(load);
  // },[dispatch])

  const date = new Date();
  const [dateValue, setDateValue] = React.useState(date);

  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
    const year = newValue.getFullYear();
    let months = newValue.getMonth() + 1;
    let days = newValue.getDate();
    if (String(days).length < 2) {
      days = "0" + days;
    }
    if (String(months).length < 2) {
      months = "0" + months;
    }
    const selectedDate = year + "-" + months + "-" + days;
    console.log(selectedDate);
    // dispatch(getCompleteOrdersByDate(selectedDate))
  };

  const handleViewAll = () => {
    dispatch(getOrdersComplete());
  };

  return (
    <>
      <div className="orderPageContainer">
        <div className="orderTable_holder">
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs"
              >
                <Tab label="Pending Orders" {...a11yProps(0)} />
                <Tab label="Inprogress Orders" {...a11yProps(1)} />
                <Tab label="Complete Orders" {...a11yProps(2)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              {!orderLoad ? (
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        {/* <TableCell>Date</TableCell> */}
                        <TableCell>Phone number</TableCell>
                        <TableCell align="right">Sub-Total</TableCell>
                        <TableCell align="right">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!orders?.length > 0 ? (
                        <div>No Orders</div>
                      ) : (
                        orders.map((val, key) => {
                          return (
                            <Row
                              key={val.id}
                              id={val.id}
                              fname={val.fname}
                              lname={val.lname}
                              contact={val.contact}
                              user={val.users}
                              total={val.total}
                              date={val.date}
                              status={val.status}
                              address={val.address}
                              // orders = {val.orders}
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
              ) : (
                <div className="loaders">
                  <CircularProgress />
                </div>
              )}
            </TabPanel>

            <TabPanel value={value} index={1}>
              {!orderLoad ? (
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
                      {!orders?.length ? (
                        // loader ?
                        //   <CircularProgress />
                        // :
                        <div>empty</div>
                      ) : (
                        orders.map((val, key) => {
                          return (
                            <Row
                              key={val.id}
                              id={val.id}
                              fname={val.fname}
                              lname={val.lname}
                              contact={val.contact}
                              user={val.users}
                              total={val.total}
                              date={val.date}
                              status={val.status}
                              address={val.address}
                              // orders = {val.orders}
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
              ) : (
                <div className="loaders">
                  <CircularProgress />
                </div>
              )}
            </TabPanel>

            <TabPanel value={value} index={2}>
              {!orderLoad ? (
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
                      {!orders?.length ? (
                        <div>empty</div>
                      ) : (
                        orders.map((val, key) => {
                          return (
                            <Row
                              key={val.id}
                              id={val.id}
                              fname={val.fname}
                              lname={val.lname}
                              contact={val.contact}
                              user={val.users}
                              total={val.total}
                              date={val.date}
                              status={val.status}
                              address={val.address}
                              // orders = {val.orders}
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
              ) : (
                <div className="loaders">
                  <CircularProgress />
                </div>
              )}
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}
