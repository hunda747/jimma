import React, { useState, useEffect, useRef } from "react";
import "./restaurantList.css";

import { Table, Switch, message, Button } from "antd";
import { Drawer, Form, Col, Row, Input, DatePicker, Space } from "antd";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import { useDispatch, useSelector, useSelectore } from "react-redux";
import {
  getAllRestaurants,
  getRestaurants,
  updateRestaurant,
} from "../../../redux/actions/restaurantAction";
import {
  getFoodsByRestaurant,
  getAllFoodsByRestaurant,
} from "../../../redux/actions/foodAction";
import { Link } from "react-router-dom";
// import RestaurantList from '../../RestaurantCard/restaurantCart';

// for the input hider
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { Add } from "@material-ui/icons";
import { CircularProgress, IconButton } from "@mui/material";
import { useCookies } from "react-cookie";

import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";
//for the input hider
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export default function RestuarantList({ onMorePage }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errRef = useRef();
  //error message
  const [errMsg, setErrMsg] = useState("");
  const [addAccErr, setAddAccErr] = useState("");
  const loading = false;
  const error = false;
  const [cookies, setCookie] = useCookies(["user"]);
  const [prog, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const onChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    let url;
    if (!file) return;

    const storageRef = projectStorage.ref(`Restaurant/${file.name}`);
    const collectionRef = projectFirestore.collection("Restaurant");

    storageRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(prog);
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        // url = await storageRef.getDownloadURL().then();
        storageRef.getDownloadURL().then((url) => {
          console.log(url);
          // setImgPreview(url);
          // console.log(url);
          collectionRef.add({ url, createdAt });

          setEditValues({
            ...editValues,
            image: url,
          });
        });

        const createdAt = timestamp();
        // console.log(url);
        // console.log(imgPreview);
      }
    );
    // console.log('url: ' + url);
  };

  const handleChange = (file) => {
    // setFile(file);
    console.log(file);
    setCampaign({ ...campaign, photo: file });
  };

  const onCloseAdd = () => {
    setVisibleAdd(false);
  };

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  const handleEditChanges = () => {
    console.log("edit");
    console.log(editValues);
    dispatch(
      updateRestaurant(
        editValues.restaurant_name,
        editValues.description,
        editValues.rating,
        editValues.open_days,
        editValues.working_hour,
        editValues.image,
        editValues.id,
        editValues.status
      )
    );
    setVisible(false);

    setEditValues({
      ...editValues,
      id: "",
      restaurant_name: "",
      description: "",
      rating: 0,
      image: "",
      working_hour: "",
      open_days: "",
      status: false,
    });

    if (editValues.status === 0) {
      message.warning("Product is still inactive");
    }

    message.success("Restaurant Updated");
    dispatch(getRestaurants());
    // window.location.reload(0);
    onMorePage(1);
  };

  const [editValues, setEditValues] = useState({
    id: "",
    restaurant_name: "",
    description: "",
    rating: 0,
    image: "",
    working_hour: "",
    open_days: "",
    status: false,
  });

  const EditRestaurant = (record) => {
    setEditValues({
      ...editValues,
      id: record.id,
      restaurant_name: record.name,
      description: record.description,
      rating: record.rating,
      image: record.image,
      working_hour: record.working_hour,
      open_days: record.open_days,
      status: record.status,
    });
  };

  const restaurants = useSelector((state) => state.restaurant.restaurant);
  console.log(restaurants);
  const handleClick = () => {
    dispatch(getAllFoodsByRestaurant(props.id));
    onMorePage(10);
  };

  return (
    <div className="restaurantList">
      <div className="wrapper">
        <div className="header">
          <h2>Restaurant List</h2>
        </div>
        {restaurants?.length !== 0 ? (
          <div className="restaurants">
            <table className="restaurant_table">
              <tr>
                <th>image</th>
                <th>name</th>
                <th>status</th>
                <th>edit</th>
                <th>product</th>
              </tr>

              {restaurants?.map((restaurant) => {
                return (
                  // <div className="restaurant">
                  <tr>
                    <td>
                      <img
                        src={restaurant.img}
                        width="50px"
                        height="50px"
                        alt="img "
                      />
                    </td>
                    <td>
                      <h3>{restaurant.name}</h3>
                    </td>
                    <td>
                      <p className="open">
                        {restaurant.status === false ? "Closed" : "Open"}
                      </p>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setEditValues({
                            ...editValues,
                            id: restaurant.id,
                            restaurant_name: restaurant.name,
                            description: restaurant.description,
                            rating: restaurant.rating,
                            image: restaurant.img,
                            working_hour: restaurant.working_hour,
                            open_days: restaurant.open_days,
                            status: restaurant.status,
                          });
                          console.log(editValues);
                          console.log(restaurant);

                          setVisible(true);
                        }}
                        className="btn_table"
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          // dispatch(getAllFoodsByRestaurant(restaurant.id));

                          localStorage.setItem("restId", restaurant.id);
                          onMorePage(10);
                        }}
                        className="btn_table"
                      >
                        products
                      </button>
                    </td>
                  </tr>
                  // </div>
                );
              })}
            </table>
            <div
              className="addButton"
              onClick={() => {
                onMorePage(2);
              }}
            >
              <IconButton>
                <Add className="add" />
              </IconButton>
            </div>
          </div>
        ) : (
          <div className="center">
            <CircularProgress />
          </div>
        )}
      </div>

      <Drawer
        title="Edit Restaurant"
        width={720}
        onClose={onClose}
        open={visible}
        bodyStyle={{ paddingBottom: 80, zIndex: "100" }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={() => handleEditChanges()}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={20}></Row>
          <Row gutter={16}>
            <Col span={12}>
              <div className="editProduct_imageHolder">
                <img
                  src={editValues.image}
                  onClick={() => message.warning("Want To Change the image")}
                />
              </div>
              <Button
                variant="contained"
                component="label"
                className="changeImage"
              >
                Change image
                <input
                  hidden
                  accept={fileTypes}
                  onChange={onChange}
                  // onChange={(e) => handleChange(e.target.files)}
                  type="file"
                />
              </Button>
            </Col>

            <Col span={12}>
              <Form.Item
                name="product_status"
                label="Product Status"
                rules={[
                  { required: true, message: "Please Give Status for Product" },
                ]}
              >
                <Switch
                  checked={editValues.status === true ? true : false}
                  onChange={() =>
                    editValues.status === true
                      ? setEditValues({ ...editValues, status: false })
                      : setEditValues({ ...editValues, status: true })
                  }
                />
              </Form.Item>
              <Form.Item
                name="product_name"
                label="Product Name"
                rules={[
                  { required: true, message: "Please enter product Name" },
                ]}
              >
                <Input
                  value={editValues.restaurant_name}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      restaurant_name: e.target.value,
                    })
                  }
                  initialValues={editValues.restaurant_name}
                  placeholder={editValues.restaurant_name}
                />
              </Form.Item>
              <Form.Item
                name="open_days"
                label="Open days"
                rules={[
                  {
                    required: true,
                    message: "Please enter restaurant opening days",
                  },
                ]}
              >
                <Input
                  value={editValues.open_days}
                  onChange={(e) =>
                    setEditValues({ ...editValues, open_days: e.target.value })
                  }
                  initialValues={editValues.open_days}
                  placeholder={editValues.open_days}
                />
              </Form.Item>
              <Form.Item
                name="Working hours"
                label="Open days"
                rules={[
                  {
                    required: true,
                    message: "Please enter restaurant working hours",
                  },
                ]}
              >
                <Input
                  value={editValues.working_hour}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      working_hour: e.target.value,
                    })
                  }
                  initialValues={editValues.working_hour}
                  placeholder={editValues.working_hour}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rating"
                label="rating"
                rules={[
                  { required: true, message: "Please enter product rating" },
                ]}
              >
                <Input
                  min={0}
                  value={editValues.rating}
                  type="number"
                  placeholder={editValues.rating}
                  initialValues={editValues.rating}
                  onChange={(e) =>
                    setEditValues({ ...editValues, rating: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  value={editValues.description}
                  initialValues={editValues.description}
                  placeholder={editValues.description}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Drawer
        title="Add Restaurant"
        width={720}
        onClose={onClose}
        open={visible}
        bodyStyle={{ paddingBottom: 80, zIndex: "100" }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={() => handleEditChanges()}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={20}></Row>
          <Row gutter={16}>
            <Col span={12}>
              <div className="editProduct_imageHolder">
                <img
                  src={editValues.image}
                  // onClick={() => message.warning("Want To Change the image")}
                />
              </div>
              <Button
                // variant="contained"
                component="label"
                // className="changeImage"
              >
                Change image
                <input
                  // hidden
                  accept={fileTypes}
                  onChange={onChange}
                  // onChange={(e) => handleChange(e.target.files)}
                  type="file"
                />
              </Button>
              {prog && prog === 0 && prog === 100 ? <p>{prog}%</p> : ""}
            </Col>

            <Col span={12}>
              <Form.Item
                name="product_status"
                label="Product Status"
                rules={[
                  { required: true, message: "Please Give Status for Product" },
                ]}
              >
                <Switch
                  checked={editValues.status === true ? true : false}
                  onChange={() =>
                    editValues.status === true
                      ? setEditValues({ ...editValues, status: false })
                      : setEditValues({ ...editValues, status: true })
                  }
                />
              </Form.Item>
              <Form.Item
                name="product_name"
                label="Product Name"
                rules={[
                  { required: true, message: "Please enter product Name" },
                ]}
              >
                <Input
                  value={editValues.restaurant_name}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      restaurant_name: e.target.value,
                    })
                  }
                  initialValues={editValues.restaurant_name}
                  placeholder={editValues.restaurant_name}
                />
              </Form.Item>
              <Form.Item
                name="open_days"
                label="Open days"
                rules={[
                  {
                    required: true,
                    message: "Please enter restaurant opening days",
                  },
                ]}
              >
                <Input
                  value={editValues.open_days}
                  onChange={(e) =>
                    setEditValues({ ...editValues, open_days: e.target.value })
                  }
                  initialValues={editValues.open_days}
                  placeholder={editValues.open_days}
                />
              </Form.Item>
              <Form.Item
                name="Working hours"
                label="Open days"
                rules={[
                  {
                    required: true,
                    message: "Please enter restaurant working hours",
                  },
                ]}
              >
                <Input
                  value={editValues.working_hour}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      working_hour: e.target.value,
                    })
                  }
                  initialValues={editValues.working_hour}
                  placeholder={editValues.working_hour}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rating"
                label="rating"
                rules={[
                  { required: true, message: "Please enter product rating" },
                ]}
              >
                <Input
                  min={0}
                  value={editValues.rating}
                  type="number"
                  placeholder={editValues.rating}
                  initialValues={editValues.rating}
                  onChange={(e) =>
                    setEditValues({ ...editValues, rating: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  value={editValues.description}
                  initialValues={editValues.description}
                  placeholder={editValues.description}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}
