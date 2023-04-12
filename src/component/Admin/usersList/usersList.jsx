import React from "react";
import "./usersList.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

//imports for dialog box
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

// import Chart from "react-apexcharts";

import {
  InputLabel,
  MenuItem,
  Option,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../redux/actions/userActions";

//user analysis dialog box content
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const localhost = "https://jimma-e-comm.herokuapp.com/";
export default function UsersList() {
  const dispatch = useDispatch();
  const datas = [
    {
      id: 1,
      fname: "Hunda",
      lname: "nk",
      email: "hunda@gmail.com",
      phone_number: "0988562356",
      signUpDate: "2022-06-06",
      status: "active",
    },
    {
      id: 2,
      fname: "james",
      lname: "rogri",
      email: "james@gmail.com",
      phone_number: "0988562356",
      signUpDate: "2022-06-06",
      status: "active",
    },
  ];
  const classes = useStyles();
  // const [users, setUsers] = useState([]);
  const [categoryValue, setCategoryValue] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.post(localhost + "api/getUsers");
      // console.log(res.data);
      setUsers(res.data);
    };
    dispatch(getAllUser());
    // fetchProducts()
  }, []);
  const user = useSelector((state) => state.user.user);
  // setUsers(user);
  // console.log(user);

  const handleNext = async () => {
    // const response = await axios.post('http://localhost:5000/api/getAllUsers');
    // setUsers(response.data)
  };

  const handleChange = async (event) => {
    // setCategoryValue(event.target.value);
    // if(event.target.value === "tcal"){
    //   const res = await axios.post('http://127.0.0.1:5000/api/getUserLogActivity', {days: 1000});
    //   // console.log(res.data);
    //   setUsers(res.data);
    // }else if(event.target.value === "tcty"){
    //   const res = await axios.post('http://127.0.0.1:5000/api/getUserLogActivity', {days: 365});
    //   // console.log(res.data);
    //   setUsers(res.data);
    // }else if(event.target.value === "tctm"){
    //   const res = await axios.post('http://127.0.0.1:5000/api/getUserLogActivity', {days: 30});
    //   // console.log(res.data);
    //   setUsers(res.data);
    // }else if(event.target.value === "acal"){
    //   const res = await axios.post('http://127.0.0.1:5000/api/getUserLogHistory', {days: 1000});
    //   // console.log(res.data);
    //   setUsers(res.data);
    // }else if(event.target.value === "acty"){
    //   const res = await axios.post('http://127.0.0.1:5000/api/getUserLogHistory', {days: 365});
    //   // console.log(res.data);
    //   setUsers(res.data);
    // }else if(event.target.value === "actm"){
    //   const res = await axios.post('http://127.0.0.1:5000/api/getUserLogHistory', {days: 30});
    //   // console.log(res.data);
    //   setUsers(res.data);
    // }else {
    //   const res = await axios.post('http://localhost:5000/api/getAllUsers');
    //   // console.log(res.data);
    //   setUsers(res.data);
    // }
  };

  // for the dialog box
  const [open, setOpen] = React.useState(false);

  const [userInfo, setUserInfo] = useState({
    id: "",
    fname: "",
    lname: "",
    emal: "",
    phone_number: "",
    signUpDate: "",
    status: "",
  });

  const handleClickOpen = () => {
    // setUserInfo({...userInfo , fname: fname})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checkoutRate, setCheckoutRate] = useState([]);
  const [recentCart, setRecentCart] = useState([]);

  const calcChechoutRate = async (userId) => {
    // const resp = await axios.post('http://localhost:5000/api/getUserCheckoutRate', {userId: userId})
    // // console.log(resp);
    // setCheckoutRate(resp.data)
  };

  const getOrderLocation = (userId) => {
    // dispatching the redux to get the recent order loccation for user id specified
    // console.log("dispatching order location getter");
    // dispatch(getRecentOrderLocation(userId));
  };

  const getRecetentCart = async (userId) => {
    //  const resp = await axios.post('http://localhost:5000/api/getRecentCartHistory',{userId:userId})
    //  // console.log(resp);
    //  setRecentCart(resp.data)
  };

  // console.log(checkoutRate);

  //  const stat = {

  //   series:  checkoutRate['one'] === null || checkoutRate['zero']=== null ? [0 , 0] :   [checkoutRate["zero"], checkoutRate["one"]],
  //   options: {
  //     chart: {
  //       type: 'pie',
  //     },
  //     labels:[`Failed to reach Checkout ( ${checkoutRate['zero']} #)`,`Reached Checkout ( ${checkoutRate['one']} #)`],
  //     // responsive: [{

  //     //   options: {
  //     //     chart: {
  //     //       width: 100
  //     //     },
  //     //     legend: {
  //     //       position: 'bottom'
  //     //     }
  //     //   }
  //     // }]
  //   },

  // }
  const [viewPort, setViewPort] = useState({
    latitude: 9.022875,
    longitude: 38.752261,
    zoom: 12,
    width: "100vw",
    height: "100vh",
  });

  const [dialogPage, setDialogPage] = useState(0);
  // const recentOrder = useSelector((state)=> state.recentOrderLoc)
  // const {loading, recentOrders , error} = recentOrder;
  const loading = false;
  const error = false;

  return (
    <>
      <div className="productListPageHolder">
        <Select
          value={categoryValue ?? " "}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
          defaultValue="all"
        >
          <MenuItem value="all">All user</MenuItem>
          <MenuItem value="tcal">Top customer all time</MenuItem>
          <MenuItem value="tcty">Top customer this year</MenuItem>
          <MenuItem value="tctm">Top customer last 30 days</MenuItem>
          <MenuItem value="acal">Active customer all time</MenuItem>
          <MenuItem value="acty">Active customer this year</MenuItem>
          <MenuItem value="actm">Active customer last 30 days</MenuItem>
          {/* <MenuItem value="icat">Inactive customer all time</MenuItem>
          <MenuItem value="icty">Inactive customer this year</MenuItem>
          <MenuItem value="ictm">Inactive customer this month</MenuItem>      */}
        </Select>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <caption>All Users table</caption>
            <TableHead>
              {categoryValue === "all" ? (
                <TableRow>
                  <TableCell>UserID</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Contact</TableCell>
                  <TableCell align="right">SignUp Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>UserID</TableCell>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Visit</TableCell>
                  <TableCell align="right">Conversion rate</TableCell>
                  <TableCell align="right">SignUp Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {!user?.length ? (
                <div>Empty</div>
              ) : categoryValue === "all" ? (
                user.map((val, key) => {
                  return (
                    <>
                      <TableRow
                        key={val.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUserInfo({
                            ...userInfo,
                            id: val.id,
                            fname: val.fname,
                            lname: val.lname,
                            email: val.email,
                            phone_number: val.phone_number,
                            signUpDate: val.signUpDate,
                            status: val.status,
                          });
                          calcChechoutRate(val.id);
                          getOrderLocation(val.id);
                          handleClickOpen();
                        }}
                      >
                        <TableCell component="th" scope="val">
                          {val.id}
                        </TableCell>
                        <TableCell align="right">{val.fname}</TableCell>
                        <TableCell align="right">{val.lname}</TableCell>
                        <TableCell align="right">{val.phone}</TableCell>

                        <TableCell align="right">{val.date}</TableCell>
                        <TableCell align="center">
                          {val.status === "active" ? (
                            <p className="active_status"></p>
                          ) : (
                            <p className="de-active_status"></p>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              ) : (
                users.map((val, key) => {
                  return (
                    <>
                      <TableRow
                        key={val.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setUserInfo({
                            ...userInfo,
                            id: val.id,
                            fname: val.fname,
                            lname: val.lname,
                            email: val.email,
                            phone_number: val.phone_number,
                            signUpDate: val.signUpDate,
                            status: val.status,
                          });
                          calcChechoutRate(val.id);
                          getOrderLocation(val.id);
                          handleClickOpen();
                        }}
                      >
                        <TableCell component="th" scope="val">
                          {val.id}
                        </TableCell>
                        <TableCell align="right">{val.fname}</TableCell>
                        <TableCell align="right">{val.lname}</TableCell>
                        <TableCell align="right">{val.visit}</TableCell>
                        <TableCell align="right">
                          {((val.purchase / val.visit) * 100).toFixed(2) + "%"}
                        </TableCell>
                        <TableCell align="right">{val.signUpDate}</TableCell>
                        <TableCell align="center">
                          {val.status === "active" ? (
                            <p className="active_status"></p>
                          ) : (
                            <p className="de-active_status"></p>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="nextButtonHolder">
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>

      <div>
        {/* <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}   >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <div className="dialog_userInfoHolder">
                  <h2>Name: {userInfo.fname + " " + userInfo.lname}</h2>
                  <hr /> 
                  <p>Contact: {userInfo.email === null? userInfo.phone_number : userInfo.email}</p>
                  <p>SignUpDate: {userInfo.signUpDate}</p>
                  <p>Status: {userInfo.status}</p>

            </div>
        </DialogTitle>
        <div className="userAnalyticsTypeSlider">
             <div className="reachedCheckoutPage" onClick={()=> setDialogPage(0)}  style={dialogPage === 0? {backgroundColor: "#574c7f", color:'white'} : {}}  >
                <p>Checkout Status</p>
             </div>
             <div className="visitPage" onClick={()=> setDialogPage(1)}  style={dialogPage === 1? {backgroundColor: "#574c7f", color:'white'} : {}}   >
               <p>Recent Order Locations</p>
             </div>
             {/* <div className="recentPerchases" onClick={()=> setDialogPage(3)}  style={dialogPage === 3? {backgroundColor: "#574c7f", color:'white'} : {}} >
                <p>Perchase Info</p>
             </div> }
          </div>
        <DialogContent dividers>
          
            <div className="userAnalysisBody">
                {
                  dialogPage === 0 ? (
                    <div className="userAnalysisBodyLeft">
                    <div className="checkoutRateHolder">
                       <div className="chartHolder">                      
                         <Chart
                             className="userPieChart"
                             options={stat.options}
                             series={stat.series} 
                             type="donut"                        
                             title='checkoutRate'
                             width={'100%'}
                             height={'130%'}
                             />
                       </div>
                      
                    </div>
                    <div className="recentCartHistory">
   
                    </div>
                 </div>

                  ):
                dialogPage === 1 ? (
                  <div className="visitedFromMapHolder">                  

                          <ReactMapGL {...viewPort} 
                            mapboxAccessToken= "pk.eyJ1IjoiZGFuaGdiIiwiYSI6ImNsMXVnNDIxbzAwMmYzcXBiMXB0ZWVjcWMifQ.nC63RhWneFhiZ4k4XJim9A"
                            onMove={(viewPort)=> { setViewPort(viewPort)}}
                            mapStyle="mapbox://styles/mapbox/streets-v11">
                            {
                              loading ? <p>Loading ...</p> : error ? <>{error}</>: (
                                recentOrders?.map(order=> order.status === 'complete'?  (
                                  <>
                                    <Marker 
                                      key={order.orderId}
                                      latitude={order.latitude}
                                      longitude={order.longitude}                               
                                    >                           
                          
                                      <PersonPinCircleIcon style={{fontSize: 35 , color: 'rgb(0, 97, 158)' , fontWeight:"bold"}}
                                          className='orderLocationIcon'                                       
                                      />                            
                                  
                                  </Marker>
                                </>
                                ): '')
                              )
                            }
                  </ReactMapGL> 
                  </div>
                ):""
                }

              
              <div className="userAnalysisRight">
                right
              </div>
              
            </div>



         
        </DialogContent>
      </Dialog> */}
      </div>
    </>
  );
}

{
  /* <Table 
    rowSelection={{ ...rowSelection }}
    columns={columns}
    dataSource={data}
    scroll={{ x: 1000 }}
    onChange={handleChange}
    
    summary={pageData => (
          <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
            <Table.Summary.Row    >
          
              <Table.Summary.Cell   index={2} colSpan={8}>
                
              </Table.Summary.Cell>
              <Table.Summary.Cell index={10}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
    )}
    sticky
    /> */
}
