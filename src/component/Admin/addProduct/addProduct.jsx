import React, { useEffect } from "react";
import "./addProduct.css";

import { v4 } from "uuid";
//imports for image uploader

import { useState } from "react";
import { message, Upload } from "antd";

import { Input, Button } from "antd";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ArrowBack } from "@material-ui/icons";
import { Divider, Typography, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import { MenuItem, Select } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
// import UseStorage from '../firebase/useStorage';

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/config";

import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/actions/productActions";
import {
  getCagegory,
  createCategory,
} from "../../../redux/actions/categoryActions";

// import {CircularProgress, CircularProgressWithLabel} from '@mui/material';
import { LinearProgress } from "@mui/material";
import { Box } from "@mui/material";

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

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function AddProduct({ onMorePage }) {
  const classes = useStyles();
  const [fileList, setFileList] = useState([1]);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    productName: "",
    productBrand: "",
    productCategory: "",
    productImg: "",
    productPrice: 0,
    productCostPrice: 0,
    amount: "",
    productDetail: "",
  });
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryValue: "",
    categoryImg: "",
  });

  useEffect(() => {
    dispatch(getCagegory());
  }, []);
  const categories = useSelector((state) => state.getCategory.categories);

  // for the dialog box
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // setUserInfo({...userInfo , fname: fname})
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [dialogPage, setDialogPage] = useState(0);

  //// console.log(categories);

  const [imgPreview, setImgPreview] = useState(
    "https://img.icons8.com/color/344/gallery.png"
  );
  const [imgCatPreview, setImgCatPreview] = useState(
    "https://img.icons8.com/color/344/gallery.png"
  );

  const [progress, setProgress] = useState(0);

  const onCategoryImgChange = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    let url;
    // 	//
    if (!file) return;
    // 	const sotrageRef = ref(storage, `image/${file.name}`);
    // 	const uploadTask = uploadBytesResumable(sotrageRef, file);

    // 	uploadTask.on(
    // 		"state_changed", null,
    // 		(error) => // console.log(error),
    // 		() => {
    // 				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    // 					// console.log(downloadURL);
    // 				});
    // 			}
    // 	);

    // 	// () => {
    // 	// 	getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    // 	// 		// console.log(downloadURL);
    // 	// 	});
    // 	// }
    // // const {url} = imageUploader(newFileList.at(-1))

    const storageRef = projectStorage.ref(`imageProduct/${file.name}`);
    const collectionRef = projectFirestore.collection("images");

    storageRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // console.log(prog);
        setProgress(prog);
      },
      (err) => {
        // console.log(err);
      },
      async () => {
        url = await storageRef.getDownloadURL();

        setImgCatPreview(url);
        const createdAt = timestamp();
        await collectionRef.add({ url, createdAt });
        // console.log(url);
        setCategoryData({
          ...categoryData,
          categoryImg: url,
        });
      }
    );
    // console.log('url: ' + url);
  };

  const onChange = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    let url;
    if (!file) return;

    const storageRef = projectStorage.ref(`imageProduct/${file.name}`);
    const collectionRef = projectFirestore.collection("images");

    storageRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // console.log(prog);
        setProgress(prog);
      },
      (err) => {
        // console.log(err);
      },
      async () => {
        url = await storageRef.getDownloadURL();
        setImgPreview(url);
        const createdAt = timestamp();
        await collectionRef.add({ url, createdAt });
        // console.log(url);
        setProductData({
          ...productData,
          productImg: url,
        });
      }
    );
    // console.log('url: ' + url);
  };

  // const onPreview = async file => {
  // 	let src = file.url;
  // 	if (!src) {
  // 		src = await new Promise(resolve => {
  // 			const reader = new FileReader();
  // 			reader.readAsDataURL(file.originFileObj);
  // 			reader.onload = () => resolve(reader.result);
  // 		});
  // 	}
  // 	const image = new Image();
  // 	image.src = src;
  // 	const imgWindow = window.open(src);
  // 	imgWindow.document.write(image.outerHTML);
  // };

  //for selecting brand

  // const [brands, setBrands] = useState([
  // 		"Samsung","Apple" ,"LG" , "TCL" , "Nokia" , "Oppo" , "Techno"
  // ]);
  const [newBrand, setNewBrand] = useState("");

  const onBrandChange = (event) => {
    setNewBrand(event.target.value);
  };

  // const addBrandItem = e => {
  // 		//reloads only the brand list view so checkout when api is done
  // 	e.preventDefault();
  // 	if(newBrand === ""){
  // 			alert("No Brand inserted");
  // 	}
  // 	else{
  // 			setBrands([...brands, newBrand]);
  // 			setNewBrand('');
  // 	}
  // };

  //for selecting category
  const [category, setCategory] = useState([
    "TV",
    "Smart-Phone",
    "Smart-Watch",
    "PS",
    "Moniter",
    "Computer",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const onCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const addCategoryItem = (e) => {
    //reloads only the brand list view so checkout when api is done
    e.preventDefault();
    if (newCategory === "") {
      alert("No Category inserted");
    } else {
      setCategory([...category, newCategory]);
      setNewCategory("");
    }
  };

  const { TextArea } = Input;
  //add product button loading state

  const handleSubmit = () => {
    // console.log("validating all the product inputs")
    // console.log(productData);

    if (productData.productName === "") {
      message.error("Product Name is missing");
    } else if (productData.productBrand === "") {
      message.error("Select Product Brand");
    } else if (productData.productCategory === "") {
      message.error("A Product Requires Category");
    } else if (productData.productImg === "") {
      message.error("Product Image is missing");
    } else if (productData.productPrice === "") {
      message.error("Product Price is missing");
    } else if (productData.amount === "") {
      message.error("Product Amount missing");
    } else if (productData.productDetail === "") {
      message.error("Product Details is required");
    } else if (!/(?=.*[A-Za-z]).{2,}/.test(productData.productName)) {
      message.error("Invalid product Name");
    } else if (!/(?=.*[A-Za-z]).{2,}/.test(productData.productBrand)) {
      message.error("Invalid Product Brand");
    } else if (!/(?=.*[A-Za-z]).{15,}/.test(productData.productDetail)) {
      message.error("Invalid product Detail ");
    } else if (fileList?.length) {
      // console.log("this is the product data so far")
      // console.log(productData)
      dispatch(createProduct(productData));
      window.location.reload(true);
      message.success("New Product Created");
    }

    // if(fileList?.length){
    // 	// console.log(productData);
    // 	// console.log(fileList);
    // 	dispatch(createProduct(productData));
    // 	setProductData({
    // 		productName: "",
    // 		productBrand: "",
    // 		productCategory: "",
    // 		productImg: "",
    // 		productPrice: 0,
    // 		productCostPrice: 0,
    // 		amount: '',
    // 		productDetail: ""
    // 	})
    // 	setImgPreview('https://img.icons8.com/color/344/gallery.png')
    // }else {
    // 	// console.log('no photo');
    // }
  };

  const handleAddCategory = () => {
    // // console.log(categoryData);
    if (categoryData.categoryName === "") {
      message.error("Category Name is missing");
    } else if (categoryData.categoryImg === "") {
      message.error("Category Image is missing");
    } else if (categoryData.categoryValue === "") {
      message.error("Category value is missing");
    } else if (!/(?=.*[A-Za-z]).{2,}/.test(categoryData.categoryName)) {
      message.error("Invalid Category Name");
    } else if (!/(?=.*[A-Za-z]).{2,}/.test(categoryData.categoryValue)) {
      message.error("Invalid Category Brand");
    } else if (fileList?.length) {
      // console.log("this is the product data so far")
      // console.log(categoryData)
      dispatch(
        createCategory(
          categoryData.categoryName,
          categoryData.categoryValue,
          categoryData.categoryImg
        )
      );
      handleClose();
      // categoryData.location.reload(true)
      message.success("New Category Created");
    }
  };

  return (
    <div className="add_product">
      <div className="add_product_wrapper">
        <div className="information">
          <div className="form_side">
            <div className="form_wrapper">
              <div className="tops">
                <Button
                  onClick={() => {
                    onMorePage(0);
                  }}
                >
                  {" "}
                  <ArrowBack fontSize="large" />{" "}
                </Button>
                <h3>Add Product</h3>
              </div>

              <div className="aboutProduct_holder">
                <div className="aboutProduct_container">
                  <p className="title">Name </p>
                  <input
                    className="product_name_input"
                    type="text"
                    placeholder="Product Name"
                    value={productData.productName}
                    onChange={(e) => {
                      setProductData({
                        ...productData,
                        productName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="aboutProduct_container">
                  <p className="title">Description</p>
                  <textarea
                    className="product_detail_input"
                    placeholder="Product Description"
                    type="text"
                    rows={8}
                    value={productData.productDetail}
                    onChange={(e) => {
                      setProductData({
                        ...productData,
                        productDetail: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="productPricing_holder">
                <div className="productPricingCalculator_holder">
                  <div className="productPricing_container">
                    <p className="title">Price </p>
                    <input
                      type="number"
                      min={0}
                      className="product_price"
                      placeholder="Price"
                      value={productData.productPrice}
                      onChange={(e) => {
                        setProductData({
                          ...productData,
                          productPrice: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="productPricing_container">
                    <p className="title">Cost per items </p>
                    <input
                      type="number"
                      min={0}
                      className="product_price"
                      placeholder="Price"
                      value={productData.productCostPrice}
                      onChange={(e) => {
                        setProductData({
                          ...productData,
                          productCostPrice: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="productPricing_container">
                    <p className="title">Margin</p>
                    <span>
                      {productData.productPrice === 0 ||
                      productData.productPrice === 0 ||
                      productData.productPrice === ""
                        ? 0
                        : (
                            (productData.productCostPrice /
                              productData.productPrice) *
                            100
                          ).toFixed(2) > 100
                        ? "Unbalanced"
                        : (
                            (productData.productCostPrice /
                              productData.productPrice) *
                            100
                          ).toFixed(2)}{" "}
                      %
                    </span>
                  </div>
                  <div className="productPricing_container">
                    <p className="title">Profit</p>
                    <span>
                      {productData.productPrice - productData.productCostPrice <
                      0
                        ? "Unbalanced"
                        : productData.productPrice -
                          productData.productCostPrice}{" "}
                      ETB
                    </span>
                  </div>
                </div>
              </div>

              <div className="productInventory_holder">
                <div className="productInventory_container">
                  <p className="title">Stock Keeping Unit</p>
                  <input
                    type="number"
                    min={0}
                    className="product_price"
                    placeholder="SKU"
                    value={productData.amount}
                    onChange={(e) => {
                      setProductData({
                        ...productData,
                        amount: e.target.value,
                      });
                    }}
                  />
                  <br />
                  <Checkbox>
                    {" "}
                    <p> Keep track of inventory </p>
                  </Checkbox>
                </div>
              </div>

              <div className="productBrand_holder">
                <div className="productBrand_container">
                  <p className="title">Category</p>
                  <div className="select">
                    <Select
                      value={productData.productCategory}
                      onChange={(e) => {
                        setProductData({
                          ...productData,
                          productCategory: e.target.value,
                        });
                      }}
                      label="Category"
                      labelId="demo-simple-select-label"
                    >
                      {categories?.map((item) => {
                        return (
                          <MenuItem value={item.ctgr_value}>
                            {item.ctgr_title}
                          </MenuItem>
                        );
                      })}
                    </Select>

                    <Button
                      style={{ margin: "10px 20px" }}
                      className="selectButton"
                      onClick={handleClickOpen}
                    >
                      Add Category
                    </Button>
                  </div>
                </div>

                <div className="productBrand_container">
                  <h3 className="title">Brand</h3>
                  <input
                    type="text"
                    className="product_brand"
                    placeholder="Brand"
                    value={productData.productBrand}
                    onChange={(e) => {
                      setProductData({
                        ...productData,
                        productBrand: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="productMedia_holder">
                <h3>Media</h3>
              </div>
              <div className="productMedia_container">
                <input type="file" onChange={onChange} />
                <Box sx={{ width: "100%" }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                {progress} %
                <div className="productMediaImage_container">
                  <div className="imagePreviewHolder">
                    <img src={imgPreview} alt={productData.productName} />
                  </div>
                </div>
              </div>

              <div className="buttonHolder">
                <button className="add_product_btn" onClick={handleSubmit}>
                  Add Product
                </button>
                <button className="add_product_cancel_btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <div className="dialog_userInfoHolder">
              <h2>Categories</h2>
            </div>
          </DialogTitle>

          <DialogContent>
            <div className="dialog_category">
              <div className="dialog_category_wraper">
                <div>
                  <h3 className="title">Title</h3>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Title"
                    value={categoryData.categoryName}
                    onChange={(e) => {
                      setCategoryData({
                        ...categoryData,
                        categoryName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="">
                  <h3 className="title">Value</h3>
                  <input
                    type="text"
                    className="product_brand"
                    placeholder="value"
                    value={categoryData.categoryValue}
                    onChange={(e) => {
                      setCategoryData({
                        ...categoryData,
                        categoryValue: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="productMedia_holder">
                  <h3>Media</h3>
                </div>
                <div className="productMedia_container">
                  <input type="file" onChange={onCategoryImgChange} />
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>

                  <div className="productMediaImage_container">
                    <div className="imagePreviewHolder">
                      <img src={imgCatPreview} alt={categoryData.productName} />
                    </div>
                  </div>
                </div>
                <Button onClick={handleAddCategory}>Add Category</Button>
                {/* <ul>
								{
									categories?.map((category, index) => {
										return(
											<li>{category.ctgr_title}</li>
										)
									})
								}
							</ul> */}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
