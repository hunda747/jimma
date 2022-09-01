import React from 'react'
import './productList.css'


import { Table , Switch , message,Button} from 'antd';

import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


import {MenuItem, Select} from '@material-ui/core';
import { Drawer, Form, Col, Row, Input,  DatePicker, Space } from 'antd';
import axios from 'axios';
// import { getCagegory, createCategory } from '../../../redux/actions/categoryActions';
import { getFoodsByRestaurant } from '../../../redux/actions/foodAction';


// const { Option } = Select;

export default function ProductList() {

  const dispatch = useDispatch();

  const [products ,setProducts] = useState([]);
  const [searchInput , setSearchInput] = useState('');
  const [searchCategory , setSearchCategory] = useState('');
  const [category , setCategory] = useState(0);

  useEffect(() => {
    // dispatch(getFoodsByRestaurant());
  }, [])

  const food = useSelector((state) => state.food.food);

  useEffect(()=>{
    // const fetchProducts = async ()=>{
    //   const res = await axios.get(`http://localhost:5000/api/getAllProducts?sq=${searchInput.toLowerCase()}`);
    //   setProducts(res.data);
    // }

    // fetchProducts()
  }, [searchInput])

  const getActive = async()=>{
    // setCategory(1);
    // const res = await axios.get('http://localhost:5000/api/getActiveProducts');
    // setProducts(res.data);
  }

  const getAll = async ()=>{
    // setCategory(0);
    // const res = await axios.get(`http://localhost:5000/api/getAllProducts?sq=${searchInput.toLowerCase()}`);
    // setProducts(res.data)
  }
  const getDiactive = async ()=>{
    // setCategory(2);
    // const res = await axios.get('http://localhost:5000/api/getDiactiveProducts');
    // setProducts(res.data)
  }

    // rowSelection objects indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

    },
    onSelect: (record, selected, selectedRows ) => {
    console.log(record, selected, selectedRows);
  
    console.log( selectedRows[0].id);
    
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
    },
    getCheckboxProps: (record)=>{
      //console.log(record)  
    }  ,
    selections: true,
    hideSelectAll: true,
  };
 
  const [fixedTop, setFixedTop] = React.useState(false);

   //handle delete
  const DeleteProduct = (record) =>{
    console.log(record.id)    
    if(record.statusValue === 0){
      message.error("Product Already Deleted")
    }
    else{
      if(window.confirm("Are you sure you want to delete?")){
        // dispatch(deleteProductById(record.id));
        // setVisible(false);
        // window.location.reload(true)
        // message.success("Deleted Successfully");
        // // dispatch(getAllProducts());
      }
    }
  }

  //state for sidedrawer edit
  const [visible , setVisible] = useState(false)
  //state = { visible: false };

  const showDrawer = () => {
    setVisible(!visible);
    console.log("this is the status of the product " + editValues.status)
  };

  const onClose = () => {
    setVisible(false);
  }

  const [editValues ,setEditValues] = useState({
    _id:'',
    food_name:'',
    description: '',
    image: '',
    type: '',
    restaurant: '',
    price: '',
  })
  // state for product list search bar

  const EditProduct = (record) =>{
    setEditValues({ ...editValues,
      _id: record._id,
      food_name: record.food_name,
      description:  record.description,
      image:  record.image,
      type:  record.type,
      restaurant:  record.restaurant,
      price:  record.price,
    })
  }

  console.log("this are the edit values " + {...editValues})
  console.log(editValues)

  const handleEditChanges = () =>{
    // console.log("handling edit changes");
    // dispatch(editProduct(editValues))
    // setVisible(false);
    // window.location.reload(0)

    if(editValues.status === 0){
        message.warning("Product is still inactive");
    }
    
    message.success("Product Updated");
    // dispatch(getAllProducts());
  }      


  const [sortedInfo ,setSortedInfo] = useState()
 
  const handleChange = (pagination, filters, sorter) =>{
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      fixed: 'left',
      width: 30
    },
    {
      title: 'Name',
      dataIndex: 'food_name',
      key: 'food_name',
      width:110,       
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width:70,
      ellipsis: true,
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Category',
      dataIndex:'type',
      key: 'type',
      width:100
    },   
    {
        title:'Status',
        dataIndex: 'status',
        key: "status",
        width:60,    
    },
    {
      title: "Action",
      key: "deleteAndEdit",
      width: 70,      
      render: (record) => {
        return(
          <>
          <EditOutlinedIcon  onClick={()=> { 
            showDrawer()  
            EditProduct(record)} 
          }
            style={{color: "gray" , fontWeight: "bolder", cursor: "pointer" }}  />
          <DeleteOutlineOutlinedIcon onClick={() =>{
            DeleteProduct(record)
          }}  style={{color: "red" , fontWeight: "bolder", cursor: "pointer" , marginLeft:10}}  />

          </>
        );
      },
    },
  ];

  const data = [];

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    const cate = event.target.value;
    setSearchCategory(event.target.value);
    console.log(cate)
    console.log("inside category handler");
    if(event.target.value === ''){
      
    }else{
      const response =  axios.post('http://localhost:5000/api/getProductsByCategory', {category: cate});
      setProducts(response.data);  
    }
  };

  //  const keys =["productName", "productBrand", "productCategory","productPrice"];
      
  if(!food?.length){
      
  }
  else{      
    food.filter(
      (food)=>food.food_name.toLowerCase().includes(searchInput)                              
      
    ).map((val,key)=>{
      data.push({
        key: val.id,
        id: val.id,
        category:val.productCategory,
        detail: val.productDetail,
        image: val.productImg,
        name: val.productName,
        brand: val.productBrand,
        price: val.productPrice,
        statusValue: val.status,
        count_in_stock: val.countInStock,
        status:  val.status === 0 ? <FiberManualRecordIcon style={{color:"#ff0000"}} /> : <FiberManualRecordIcon style={{color:"#19ff05"}} /> 
      })
    })
  };
  
  console.log(searchInput);
  return (
    <>
    <div className="productListPageHolder">
      <div className="searchBarContainer">
        <div className="sorter">
          <div className="active_only">
            <div className="active_only_wrapper">
              <div className="all_products" onClick={getAll}  style={category === 0 ? {backgroundColor:'orange', color:'white'}:{}}  >
                <p>All</p>
              </div>
              <div className="active_products"  onClick={getActive}  style={category === 1 ? {backgroundColor:'orange', color:'white'}:{}}   >
                <p>Active</p>
              </div>
              <div className="diactive_products" onClick={getDiactive}  style={category === 2 ? {backgroundColor:'orange', color:'white'}:{}}   >
                <p>Diactive</p>
              </div>
            </div>
          </div> 
        </div> 
        <div className="productList_searchBarWrapper">
          <input type="text" 
            className='productList_searchBar' 
            placeholder='Search Product'
            onChange={e=>setSearchInput(e.target.value)}
            />
        </div>
      </div>

      <Table 
      rowSelection={{ ...rowSelection }}
      columns={columns}
      dataSource={food}
      scroll={{ x: 1000 }}
      onChange={handleChange}
      summary={pageData => (
        <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
          <Table.Summary.Row >
        
            <Table.Summary.Cell   index={2} colSpan={18}>
              
            </Table.Summary.Cell>
            <Table.Summary.Cell index={50}>

            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
      // sticky
      />
    </div>


    <Drawer
    title="Edit Product"
    width={720}
    onClose={onClose}
    visible={visible}
    bodyStyle={{ paddingBottom: 80 , zIndex: '100'}}
    extra={
      <Space>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" onClick={()=> handleEditChanges()}  >
          Submit
        </Button>
      </Space> }>

      <Form layout="vertical" hideRequiredMark>
      <Row gutter={20}>
        </Row>
        <Row gutter={16}>

          <Col span={12}>
              <div className='editProduct_imageHolder'>
                <img src={editValues.image} onClick={()=> message.warning("Want To Change the image")} />
              </div>
          </Col>

          <Col span={12}>
            <Form.Item
              name="product_status"
              label="Product Status"
              rules={[{ required:true , message: "Please Give Status for Product"}]}
            >
              <Switch checked={editValues.status === 1 ? true : false} onChange={()=> editValues.status === 1 ? setEditValues({...editValues , status: 0}) : setEditValues({...editValues, status: 1}) }  />

            </Form.Item>
            <Form.Item
              name="product_name"
              label="Product Name"
              rules={[{ required: true, message: 'Please enter product Name' }]}
            >
              <Input value={editValues.food_name} onChange={(e)=> setEditValues({...editValues, name: e.target.value})}  placeholder={editValues.food_name} />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >

              {/* <Select
                value={editValues.category}
                onChange={(e) => {
                  setEditValues({ 
                    ...editValues, 
                      category: e.target.value
                    } ) 
                }}
              
                label="Category"
                defaultValue={editValues.category}
                labelId="demo-simple-select-label"                   
                style={{width: '100%'}}>
                {categories?.map((item) => {
                  return(
                  <MenuItem   style={{width: '100%' , justifyContent: 'left', marginLeft: "4px"}} value={item.ctgr_value}>{item.ctgr_title}</MenuItem>
                )}) }
              </Select>  */}
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
          <Col span={12}>
            
          </Col>
          <Col span={12}>
          
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
          <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter product price' }]}
            >
              <Input min={0} prefix="$" type='number' placeholder={editValues.price} value={editValues.price} onChange={(e)=> setEditValues({...editValues, price: e.target.value})}   />
            </Form.Item>
          </Col>
          <Col span={12}>
            
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'please enter description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder={editValues.detail}  value={editValues.detail} onChange={(e)=> setEditValues({...editValues, detail: e.target.value})}   />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  </>     
  )
}























