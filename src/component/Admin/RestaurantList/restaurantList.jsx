import React , {useState, useEffect,useRef} from 'react'
import './restaurantList.css'


import { Table , Switch , message,Button} from 'antd';
import { Drawer, Form, Col, Row, Input,  DatePicker, Space } from 'antd';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { useDispatch, useSelector, useSelectore } from 'react-redux'
import { getAllRestaurants, getRestaurants, updateRestaurant } from '../../../redux/actions/restaurantAction';
import { getFoodsByRestaurant, getAllFoodsByRestaurant } from '../../../redux/actions/foodAction';
import {Link} from 'react-router-dom';
// import RestaurantList from '../../RestaurantCard/restaurantCart';

// for the input hider
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'
import { Add   } from '@material-ui/icons';
import { CircularProgress } from '@mui/material';
import { useCookies } from 'react-cookie';
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
  const [cookies, setCookie] = useCookies(['user']);
  const [visible , setVisible] = useState(false)

  const onClose = () => {
    setVisible(false);
  }

  useEffect(() => {
    dispatch(getRestaurants());
  }, []);

  const handleEditChanges = () => {
    console.log('edit');
    console.log(editValues);
    dispatch(updateRestaurant(editValues.restaurant_name, editValues.description, editValues.rating, editValues.open_days, editValues.working_hour, editValues.img, editValues._id, editValues.status));
    setVisible(false);
    
    setEditValues({ ...editValues,
      _id:'',
      restaurant_name:'',
      description: '',
      rating: 0,
      image: '',
      working_hour: '',
      open_days: '',
      status: false
    });

    if(editValues.status === 0){
      message.warning("Product is still inactive");
    }
    
    message.success("Restaurant Updated");
    dispatch(getRestaurants());
    // window.location.reload(0);
    onMorePage(1);
  }
  
  const [editValues ,setEditValues] = useState({
    _id:'',
    restaurant_name:'',
    description: '',
    rating: 0,
    image: '',
    working_hour: '',
    open_days: '',
    status: false,
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
      status: record.status
    })
  }

  const restaurants = useSelector(state => state.restaurant.restaurant);

  const handleClick = () => {
    dispatch(getAllFoodsByRestaurant(props.id));
    onMorePage(10);
  }

  return (
    <div className='restaurantList'>
			<div className="wrapper">
        <div className="header">
          <h2>Restaurant List</h2>
        </div>
        {
        restaurants.length !== 0 ? 
          <div className="restaurants">
            <table className="restaurant_table">
              <tr>
                <th>image</th>
                <th>name</th>
                <th>status</th>
                <th>edit</th>
                <th>product</th>
              </tr>
            
            {
              restaurants?.map((restaurant) => {
                return(
                  // <div className="restaurant">
                  <tr>
                    <td>
                    <img src={restaurant.img} width='50px' height='50px' alt="img " />
                    </td>
                    <td>
                    <h3>{restaurant.name}</h3>
                    </td>
                    <td>
                    <p className='open'>{restaurant.status === false ? "Closed" : "Open"}</p>
                    </td>
                    <td>
                    <button onClick={() => {
                      setEditValues({ ...editValues,
                        _id: restaurant._id,
                        restaurant_name: restaurant.name,
                        description:  restaurant.description,
                        rating:  restaurant.rating,
                        image:  restaurant.img,
                        working_hour:  restaurant.working_hour,
                        open_days:  restaurant.open_days,
                        status: restaurant.status
                      })
                      console.log(editValues);
                      console.log(restaurant);
                      
                      setVisible(true)}}
                      className="btn_table">
                      edit
                    </button></td>
                    <td>
                    <button onClick={() => {
                        // dispatch(getAllFoodsByRestaurant(restaurant._id));

                        localStorage.setItem('restId', restaurant._id);
                        onMorePage(10)
                      }}
                      className="btn_table"
                      >
                      products
                    </button></td>
                  </tr>
                  // </div>
                )
              })
            }
            </table>
            <div className='addButton' onClick={() => {
                onMorePage(2);
              }}>
              <Add className='add' />
            </div>
          </div>
        :
          <div className='center'>
            <CircularProgress />
          </div>
        }
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
                <Switch checked={editValues.status === true ? true : false} onChange={()=> editValues.status === true ? setEditValues({...editValues , status: false}) : setEditValues({...editValues, status: true}) }  />

              </Form.Item>
              <Form.Item
                name="product_name"
                label="Product Name"
                rules={[{ required: true, message: 'Please enter product Name' }]}
              >
                <Input value={editValues.restaurant_name} onChange={(e)=> setEditValues({...editValues, restaurant_name: e.target.value})}  
                placeholder={editValues.restaurant_name} 
                />
              </Form.Item>
              <Form.Item
                name="open_days"
                label="Open days"
                rules={[{ required: true, message: 'Please enter restaurant opening days' }]}
              >
                <Input value={editValues.open_days} 
                onChange={(e)=> setEditValues({...editValues, open_days: e.target.value})}  
                placeholder={editValues.open_days} />
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
                name="rating"
                label="rating"
                rules={[{ required: true, message: 'Please enter product rating' }]}
              >
                <Input min={0} type='number' placeholder={editValues.rating} value={editValues.rating} onChange={(e)=> setEditValues({...editValues, rating: e.target.value})}   />
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
                <Input.TextArea rows={4} placeholder={editValues.description}  
                value={editValues.description} 
                onChange={(e)=> setEditValues({...editValues, description : e.target.value})}   />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>

  )
}
