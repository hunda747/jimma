import React , {useState, useEffect,useRef} from 'react'
import './restaurantList.css'


import { Table , Switch , message,Button} from 'antd';
import { Drawer, Form, Col, Row, Input,  DatePicker, Space } from 'antd';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { useDispatch, useSelector, useSelectore } from 'react-redux'
import { getAllRestaurants } from '../../../redux/actions/restaurantAction';
import { getFoodsByRestaurant } from '../../../redux/actions/foodAction';
import {Link} from 'react-router-dom';
import RestaurantList from '../../RestaurantCard/restaurantCart';

// for the input hider
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'

//for the input hider
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));


export default function RestuarantList({onMorePage}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errRef = useRef();
  //error message
  const [errMsg ,setErrMsg]  = useState('')
  const [addAccErr , setAddAccErr] = useState('');
	const loading = false;
	const error = false;

  
  const [visible , setVisible] = useState(false)

  const onClose = () => {
    setVisible(false);
  }

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const handleEditChanges = () => {
    console.log('edit');
  }
  
  const [editValues ,setEditValues] = useState({
    _id:'',
    restaurant_name:'',
    description: '',
    rating: 0,
    image: '',
    working_hour: '',
    open_days: '',
  })

  const EditRestaurant = (record) =>{
    setEditValues({ ...editValues,
      _id: record._id,
      restaurant_name: record.name,
      description:  record.description,
      rating:  record.rating,
      image:  record.image,
      working_hour:  record.working_hour,
      open_days:  record.open_days,
    })
  }


  const restaurants = useSelector(state => state.restaurant.restaurant);

  const handleClick = () => {
    dispatch(getFoodsByRestaurant(props.id));
    onMorePage(10);
  }

  return (
    <div className='restaurantList'>
			<div className="wrapper">
        <div className="header">
          <h2>Restaurant List</h2>
        </div>
        <div className="restaurants">
          {
            restaurants?.map((restaurant) => {
              return(
                <div className="restaurant">
                  <img src={restaurant.img} width='50px' height='50px' alt="img " />
                  <h3>{restaurant.name}</h3>
                  {/* <p>{restaurant.description}</p> */}
                  {/* <div className=""> */}
                    <p className='open'>open</p>
                  {/* </div> */}
                  <button onClick={() => {
                    setEditValues({ ...editValues,
                      _id: restaurant._id,
                      restaurant_name: restaurant.name,
                      description:  restaurant.description,
                      rating:  restaurant.rating,
                      image:  restaurant.img,
                      working_hour:  restaurant.working_hour,
                      open_days:  restaurant.open_days,
                    })
                    console.log(editValues);
                    setVisible(true)}}>
                    edit
                  </button>
                  <button onClick={() => {
                    dispatch(getFoodsByRestaurant(restaurant._id));
                    onMorePage(10)}}
                    >
                    products
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>

      <Drawer
      title="Edit Restaurant"
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
                <Input value={editValues.name} onChange={(e)=> setEditValues({...editValues, name: e.target.value})}  placeholder={editValues.name} />
              </Form.Item>
              <Form.Item
                name="product_name"
                label="Open days"
                rules={[{ required: true, message: 'Please enter restaurant opening days' }]}
              >
                <Input value={editValues.open_days} onChange={(e)=> setEditValues({...editValues, open_days: e.target.value})}  placeholder={editValues.open_days} />
              </Form.Item>
              <Form.Item
                name="Working hours"
                label="Open days"
                rules={[{ required: true, message: 'Please enter restaurant working hours' }]}
              >
                <Input value={editValues.working_hour} onChange={(e)=> setEditValues({...editValues, working_hour: e.target.value})}  placeholder={editValues.working_hour} />
              </Form.Item>

              
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
    </div>

  )
}
