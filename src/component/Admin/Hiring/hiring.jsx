import React from "react";

import "./hiring.css";

import { useDispatch } from "react-redux";

import { message } from "antd";

import { useState, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import axios from "axios";

// import { saveAccessKey } from '../../../redux/actions/userActions';

import { MenuItem, Select } from "@mui/material";

import EmployeeCard from "../employeeCard/employeeCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function Hiring() {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState([]);
  const [tokenKey, setTokenKey] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [role, setRole] = useState("manager");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const errRef = useRef();

  useEffect(() => {
    const getProductManager = async () => {
      const response = await axios.post(
        "http://localhost:5000/api/getAllAdmin"
      );
      setEmployee(response.data);
    };

    getProductManager();
  }, []);

  // console.log(employee);

  const classes = useStyles();

  const handleKeyGeneration = async () => {
    // console.log(inputEmail);
    // if(inputEmail === ""  ){
    //   message.error("Provide Email please!");
    // }if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)){
    //   message.warning("Email Invalid");
    // }else{
    //   const response = await axios.post('http://localhost:5000/api/generateAccessKey', {email: inputEmail})
    //   // console.log(response);
    //   if(response.data.isUser){
    //     setErrMsg("Email Already in Use");
    //   }else{
    //     setErrMsg('')
    //     setTokenKey(response.data.access_key);
    //   }
    // }
  };

  const handleSave = () => {
    // console.log("saving the data");

    if (inputEmail !== "" && tokenKey !== "" && errMsg === "") {
      message.success("Access Key saved successfully");
      dispatch(saveAccessKey(inputEmail, tokenKey, role));
      setInputEmail("");
      setTokenKey("");
      window.location.reload(false);
    } else {
      message.error("Email or Key is missing");
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    setRole(event.target.value);
  };

  return (
    <>
      <div>
        <div className={classes.root}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>
                  Employee Info
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <input
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                type="email"
                className="access_key_email"
                placeholder="Email Address"
              />

              <div className={clsx(classes.column, classes.helper)}>
                <Select
                  value={role ?? " "}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue={role}
                >
                  <MenuItem value="manager">Product Manager</MenuItem>
                  <MenuItem value="delivery">Delivery</MenuItem>
                </Select>

                <Typography variant="caption">
                  Generated Access Key
                  <br />
                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg ? errMsg : ""}
                  </p>
                  <label className="generated_access_key">{tokenKey}</label>
                </Typography>
              </div>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={handleKeyGeneration}
              >
                Generate
              </Button>
            </AccordionDetails>

            <Divider />
            <AccordionActions>
              <Button size="small">Cancel</Button>
              <Button size="small" color="primary" onClick={handleSave}>
                Save
              </Button>
            </AccordionActions>
          </Accordion>
        </div>
      </div>

      <div className="productManagerList">
        <div className="pm_table_container">
          <div className="pm_table_side">
            <div className="pm_table_side_wrapper">
              {!employee?.length ? (
                <div className="emp_empty_holder">
                  <p>empty</p>
                </div>
              ) : (
                employee.map((val, key) => {
                  return (
                    <EmployeeCard
                      key={val.id}
                      user_name={val.username}
                      accessKey={val.access_key}
                      phone={val.phone}
                      status={val.status}
                      role={val.role}
                      date={val.date}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
