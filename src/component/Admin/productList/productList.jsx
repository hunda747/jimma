import React from "react";
import "./productList.css";

import { Switch, message, Button } from "antd";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { Drawer, Col, Row, Space } from "antd";

import "antd/dist/antd.css";
import { MenuItem, Select } from "@material-ui/core";

import axios from "axios";
import {
  getFoodsByRestaurant,
  getAllFoodsByRestaurant,
  updateFood,
  createFood,
} from "../../../redux/actions/foodAction";
import { Add } from "@material-ui/icons";
import { CircularProgress } from "@mui/material";
// const { Option } = Select;
import { useCookies } from "react-cookie";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function ProductList({ onMorePage }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [category, setCategory] = useState(0);
  const [cookies, setCookie] = useCookies(["user"]);
  const restId = localStorage.getItem("restId");
  console.log(restId);

  useEffect(() => {
    dispatch(getAllFoodsByRestaurant(restId));
  }, []);

  // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);

      console.log(selectedRows[0].id);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: (record) => {
      //console.log(record)
    },
    selections: true,
    hideSelectAll: true,
  };

  const [fixedTop, setFixedTop] = React.useState(false);

  const food = useSelector((state) => state.food.food);
  const foodLoad = useSelector((state) => state.food.loading);
  console.log(foodLoad);

  const [form] = Form.useForm();
  const [data, setData] = useState(food);
  console.log(data);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    setData(food);
  }, []);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      id: "",
      food_name: "",
      description: "",
      image: "",
      type: "",
      restaurant: "",
      price: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      console.log(key);
      // const row = await form.validateFields();
      // const newData = [...data];
      // const index = newData.findIndex((item) => key === item.key);

      // if (index > -1) {
      //   const item = newData[index];
      //   newData.splice(index, 1, { ...item, ...row });
      //   setData(newData);
      //   setEditingKey('');
      // } else {
      //   newData.push(row);
      //   setData(newData);
      //   setEditingKey('');
      // }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // food_name:'',
  //   description: '',
  //   image: '',
  //   type: '',
  //   restaurant: '',
  //   price: '',

  // const columns = [
  //   {
  //     title: 'Food name',
  //     dataIndex: 'food_name',
  //     width: '25%',
  //     editable: true,
  //   },
  //   {
  //     title: 'Description',
  //     dataIndex: 'description',
  //     width: '40%',
  //     editable: true,
  //   },
  //   {
  //     title: 'Type',
  //     dataIndex: 'type',
  //     width: '15%',
  //     editable: true,
  //   },
  //   {
  //     title: 'operation',
  //     dataIndex: 'operation',
  //     render: (_, record) => {
  //       const editable = isEditing(record);
  //       return editable ? (
  //         <span>
  //           <Typography.Link
  //             onClick={() => save(record.key)}
  //             style={{
  //               marginRight: 8,
  //             }}
  //           >
  //             Save
  //           </Typography.Link>
  //           <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
  //             <a>Cancel</a>
  //           </Popconfirm>
  //         </span>
  //       ) : (
  //         <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
  //           Edit
  //         </Typography.Link>
  //       );
  //     },
  //   },
  // ];

  const columns = [
    {
      title: "Food name",
      dataIndex: "food_name",
      key: "food_name",
      fixed: "left",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 210,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 70,
      ellipsis: true,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 80,
    },
    // {
    //     title:'Status',
    //     dataIndex: 'status',
    //     key: "status",
    //     width:60,
    // },
    {
      title: "Action",
      key: "deleteAndEdit",
      width: 70,
      render: (record) => {
        return (
          <>
            <EditOutlinedIcon
              onClick={() => {
                showDrawer();
                EditProduct(record);
              }}
              style={{ color: "gray", fontWeight: "bolder", cursor: "pointer" }}
            />
            {/* <DeleteOutlineOutlinedIcon onClick={() =>{
            DeleteProduct(record)
          }}  style={{color: "red" , fontWeight: "bolder", cursor: "pointer" , marginLeft:10}}  /> */}
          </>
        );
      },
    },
  ];

  //state for sidedrawer edit
  const [visible, setVisible] = useState(false);
  //state for sidedrawer edit
  const [visibleAdd, setVisibleAdd] = useState(false);

  const showDrawer = () => {
    setVisible(!visible);
    console.log("this is the status of the product " + editValues.status);
  };

  const showAddDrawer = () => {
    setVisible(!visibleAdd);
    console.log("this is the status of the product " + addValues.status);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onAddClose = () => {
    setVisibleAdd(false);
  };

  const [editValues, setEditValues] = useState({
    id: "",
    food_name: "",
    description: "",
    type: "",
    status: false,
    restaurant: "",
    price: "",
  });

  const [addValues, setAddValues] = useState({
    id: "",
    food_name: "",
    description: "",
    type: "",
    status: true,
    restaurant: "",
    price: "",
  });

  // state for product list search bar
  const EditProduct = (record) => {
    console.log(record);
    setEditValues({
      ...editValues,
      id: record.id,
      food_name: record.food_name,
      description: record.description,
      type: record.type,
      price: record.price,
      status: record.status,
    });
    console.log(editValues);
  };

  const handleAddFood = () => {
    console.log("handling add values");
    console.log(addValues);
    dispatch(
      createFood(
        addValues.food_name,
        addValues.description,
        addValues.type,
        restId,
        addValues.price
      )
    );
    setVisibleAdd(false);
    onMorePage(1);
    // window.location.reload(0)

    if (addValues.status === 0) {
      message.warning("Product is still inactive");
    } else {
      message.success("Product Updated");
    }

    // dispatch(getAllProducts());
  };

  const handleEditChanges = () => {
    console.log("handling edit changes");
    console.log(editValues);
    dispatch(
      updateFood(
        editValues.food_name,
        editValues.description,
        editValues.type,
        editValues.id,
        editValues.price,
        editValues.status
      )
    );
    setVisible(false);
    onMorePage(1);
    // window.location.reload(0)

    if (editValues.status === 0) {
      message.warning("Product is still inactive");
    }

    message.success("Product Updated");
    // dispatch(getAllProducts());
  };

  console.log(searchInput);
  return (
    <>
      <div className="productListPageHolder">
        <div className="searchBarContainer">
          <div>
            <button
              onClick={() => {
                onMorePage(1);
              }}
            >
              back
            </button>
          </div>
          <div className="productList_searchBarWrapper">
            <input
              type="text"
              className="productList_searchBar"
              placeholder="Search Product"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        {!foodLoad ? (
          <div className="table">
            <Form form={form} component={false}>
              <Table
                rowSelection={{ ...rowSelection }}
                columns={columns}
                dataSource={food}
                scroll={{ x: 1000 }}
                // onChange={handleChange}
                summary={(pageData) => (
                  <Table.Summary fixed={fixedTop ? "top" : "bottom"}>
                    <Table.Summary.Row>
                      <Table.Summary.Cell
                        index={2}
                        colSpan={8}
                      ></Table.Summary.Cell>
                      <Table.Summary.Cell index={10}></Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
                sticky
              />
            </Form>
          </div>
        ) : (
          <div className="center">
            <CircularProgress />
          </div>
        )}

        <div
          className="addButton"
          onClick={() => {
            setVisibleAdd(true);
            setAddValues({ ...addValues, restaurant: food[0].restaurant });
            console.log(food[0].restaurant);
          }}
        >
          <Add className="add" />
        </div>
      </div>

      <Drawer
        // title="Basic Drawer" placement="right" onClose={onClose} open={visible}
        title="Add Product"
        width={720}
        onClose={onAddClose}
        visible={visibleAdd}
        bodyStyle={{ paddingBottom: 80, zIndex: "100" }}
        extra={
          <Space>
            <Button onClick={onAddClose}>Cancel</Button>
            <Button type="primary" onClick={() => handleAddFood()}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={20}></Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="product_status"
                label="Product Type"
                rules={[
                  { required: true, message: "Please Give Status for Product" },
                ]}
              >
                <Switch
                  checked={addValues.status === true ? true : false}
                  onChange={() =>
                    addValues.status === true
                      ? setAddValues({ ...addValues, status: false })
                      : setAddValues({ ...addValues, status: true })
                  }
                />
              </Form.Item>

              <Form.Item
                name="food_name"
                label="Food Name"
                rules={[{ required: true, message: "Please enter food Name" }]}
              >
                <Input
                  value={addValues.food_name}
                  onChange={(e) =>
                    setAddValues({ ...addValues, food_name: e.target.value })
                  }
                  initialValues={"food_name"}
                  placeholder={"food_name"}
                />
              </Form.Item>

              <Form.Item
                name="food_type"
                label="Food Type"
                rules={[{ required: true, message: "Please enter food Type" }]}
              >
                <Input
                  value={addValues.type}
                  onChange={(e) =>
                    setAddValues({ ...addValues, type: e.target.value })
                  }
                  placeholder={"type"}
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
                name="price"
                label="Price"
                rules={[
                  { required: true, message: "Please enter product price" },
                ]}
              >
                <Input
                  min={0}
                  prefix="$"
                  type="number"
                  placeholder={"price"}
                  value={addValues.price}
                  onChange={(e) =>
                    setAddValues({ ...addValues, price: e.target.value })
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
                  placeholder={"description"}
                  value={addValues.description}
                  onChange={(e) =>
                    setAddValues({ ...addValues, description: e.target.value })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Drawer
        // title="Basic Drawer" placement="right" onClose={onClose} open={visible}
        title="Edit Product"
        width={720}
        onClose={onClose}
        visible={visible}
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
              <Form.Item
                name="product_status"
                label="Product Type"
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
                name="food_name"
                label="Food Name"
                rules={[{ required: true, message: "Please enter food Name" }]}
              >
                <Input
                  value={editValues.food_name}
                  onChange={(e) =>
                    setEditValues({ ...editValues, food_name: e.target.value })
                  }
                  defaultValue={editValues.food_name}
                  placeholder={editValues.food_name}
                />
              </Form.Item>
              <Form.Item
                name="food_type"
                label="Food Type"
                rules={[{ required: true, message: "Please enter food Type" }]}
              >
                <Input
                  value={editValues.type}
                  onChange={(e) =>
                    setEditValues({ ...editValues, type: e.target.value })
                  }
                  placeholder={editValues.type}
                />
              </Form.Item>

              {/* <Form.Item
            name="count_in_stock"
            label="Amount In Stock"
            rules={[{ required: true, message: 'Please enter count in stock' }]}
          >
            <Input prefix='#' min={0} type='number' placeholder={editValues.count_in_stock}   value={editValues.count_in_stock} onChange={(e)=> setEditValues({...editValues, count_in_stock: e.target.value})}   />
          </Form.Item> */}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  { required: true, message: "Please enter product price" },
                ]}
              >
                <Input
                  min={0}
                  prefix="$"
                  type="number"
                  placeholder={editValues.price}
                  value={editValues.price}
                  onChange={(e) =>
                    setEditValues({ ...editValues, price: e.target.value })
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
                  placeholder={editValues.description}
                  value={(editValues.name = "description")}
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
    </>
  );
}

//  //handle delete
//  const DeleteProduct = (record) =>{
//   console.log(record.id)
//   if(record.statusValue === 0){
//     message.error("Product Already Deleted")
//   }
//   else{
//     if(window.confirm("Are you sure you want to delete?")){
//       // dispatch(deleteProductById(record.id));
//       // setVisible(false);
//       // window.location.reload(true)
//       // message.success("Deleted Successfully");
//       // // dispatch(getAllProducts());
//     }
//   }
// }
