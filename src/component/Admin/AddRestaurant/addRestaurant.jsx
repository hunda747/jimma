import React, {useEffect} from 'react'
import './addRestaurant.css'

import { v4 } from 'uuid';
//imports for image uploader

import { useState } from 'react';
import { message, Upload } from 'antd';

import { Input,Button } from 'antd';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {ArrowBack} from '@material-ui/icons';
import { Divider,  Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import {MenuItem, Select} from '@mui/material';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
// import UseStorage from '../firebase/useStorage';

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/config";

import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

import { useDispatch, useSelector } from 'react-redux';
import { createRestaurant } from '../../../redux/actions/restaurantAction';
// import { getCagegory, createCategory } from '../../../redux/actions/categoryActions';

// import {CircularProgress, CircularProgressWithLabel} from '@mui/material';
import {LinearProgress} from '@mui/material';
import {Box} from '@mui/material'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function AddRestaurant({onMorePage}) {
  
	const classes = useStyles();
	const [fileList, setFileList] = useState([1]);
	const dispatch = useDispatch();
	const [restaurantData, setRestaurantData] = useState({
			name: "",
			description: "",
			rating: 5,
			productImg: "",
			open_days: "",
			working_hour: '',
	})
	
	useEffect(() => {
		// dispatch(getCagegory());
	}, []);

	// for the dialog box
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
    // setUserInfo({...userInfo , fname: fname})
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

	const [dialogPage , setDialogPage] = useState(0)

	const [imgPreview, setImgPreview] = useState('https://img.icons8.com/color/344/gallery.png');

	const [progress, setProgress] = useState(0);

	const onChange = async(e) => {
		const file = e.target.files[0];
		console.log(file);
		let url;
		if (!file) return;

		const storageRef = projectStorage.ref(`Restaurant/${file.name}`);
    const collectionRef = projectFirestore.collection('Restaurant');
    
    storageRef.put(file).on('state_changed', (snapshot)=> {
			const prog = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			)
			console.log(prog);
			setProgress(prog);
		}, (err) => {
      console.log(err);
    }, async () => {
			// url = await storageRef.getDownloadURL().then();
			storageRef.getDownloadURL().then(url => {
				console.log(url);
				setImgPreview(url);
				collectionRef.add({ url, createdAt });

				setRestaurantData({
					...restaurantData, 
					productImg: url
					}
				)
			});

			const createdAt = timestamp();
			// console.log(url);
			console.log(imgPreview);
			});
		// console.log('url: ' + url);
	};

	const { TextArea } = Input;
    //add product button loading state
  
	const handleSubmit = () => {
		console.log("validating all the product inputs")
		console.log(restaurantData);

		if(restaurantData.name === ''){
			message.error("Name is missing")
		}else if(restaurantData.description === ''){
			message.error("Select Product description")
		}else if(restaurantData.working_hour === ''){
			message.error("working hour is missing")
		}else if(restaurantData.open_days === ''){
			message.error("Product open_days is missing")
		}else if(restaurantData.rating === ''){
			message.error("Product rating missing")
		}else if(fileList?.length){
			console.log("this is the product data so far")
			console.log(restaurantData)
			dispatch(createRestaurant(restaurantData.name, restaurantData.description, restaurantData.rating, restaurantData.open_days, restaurantData.working_hour, restaurantData.productImg))
			// window.location.reload(true)
			message.success("New Product Created")
		}
	}

	const handleAddCategory = () => {
		// console.log(categoryData);
		// if(categoryData.categoryName === ''){
		// 	message.error("Category Name is missing")
		// }else if(categoryData.categoryImg === ''){
		// 	message.error("Category Image is missing")
		// }else if(categoryData.categoryValue === ''){
		// 	message.error("Category value is missing")
		// }else if(! /(?=.*[A-Za-z]).{2,}/.test(categoryData.categoryName)){
		// 	message.error("Invalid Category Name")
		// }else if(! /(?=.*[A-Za-z]).{2,}/.test(categoryData.categoryValue)){
		// 	message.error("Invalid Category Brand")
		// }else if(fileList?.length){
		// 	console.log("this is the product data so far")
		// 	console.log(categoryData)
		// 	dispatch(createCategory(categoryData.categoryName, categoryData.categoryValue, categoryData.categoryImg))
		// 	handleClose();
		// 	// categoryData.location.reload(true)
		// 	message.success("New Category Created")
		// }
	}

  return (
    <div className='add_product'>
		<div className="add_product_wrapper">
			<div className="information">
				<div className="form_side">
					<div className="form_wrapper">
				<div className="tops">
      	  <Button onClick={() => {
      	    onMorePage(1);
      	  }}> <ArrowBack fontSize='large'/> </Button>
      	  <h3>Add Product</h3>
      	</div>

          <div className="aboutProduct_holder">
            <div className="aboutProduct_container">
              <p className='title'>Restaurant Name</p>
              <input 
                className='product_name_input' 
                type='text' 
                placeholder="Restaurant Name"
                value={restaurantData.name}
                onChange = {(e) => {
                  setRestaurantData({
                    ...restaurantData, 
                      name: e.target.value
                    }
                  )
                }} />
            </div>
            <div className="aboutProduct_container">
              <p className='title'>Description</p>
              <textarea 
                className='product_detail_input' 
                placeholder='Restaurant Description' 
                type='text' 
                rows={8}
                value={restaurantData.description}
                onChange = {(e) => {
                    setRestaurantData({
                        ...restaurantData, 
                        description: e.target.value
                      }
                  )
              }} />
            </div>
          </div>

          <div className="aboutProduct_holder">
            <div className="aboutProduct_container">
              <p className='title'>Working Hours</p>
              <input 
                className='product_name_input' 
                type='text' 
                placeholder="Working Hours"
                value={restaurantData.working_hour}
                onChange = {(e) => {
                  setRestaurantData({
                    ...restaurantData, 
                      working_hour: e.target.value
                    }
                  )
                }} />
            </div>
            <div className="aboutProduct_container">
              <p className='title'>Opening days</p>
              <input 
                className='product_name_input' 
                type='text' 
                placeholder="Opening days"
                value={restaurantData.open_days}
                onChange = {(e) => {
                  setRestaurantData({
                    ...restaurantData, 
                      open_days: e.target.value
                    }
                  )
                }} />
            </div>
          </div>

          <div className="productMedia_holder">
            <h3>Media</h3>
            </div>
            
            <div className="productMedia_container">
              <input type="file" onChange={onChange} />
            
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            
              {progress} %
            <div className="productMediaImage_container">
              <div className="imagePreviewHolder">
                  <img src={imgPreview} alt={restaurantData.productName}  />
              </div>
            </div>
          </div>

          <div className="buttonHolder">
            <button className='add_product_btn' onClick={handleSubmit} >Add Product</button>
            <button className='add_product_cancel_btn'>Cancel</button>
          </div>

					</div>
				</div>
			</div>
		</div>

    </div>
  )
}





