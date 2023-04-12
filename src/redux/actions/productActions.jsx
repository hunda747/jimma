import * as actionType from "../constants/productConstant";
import * as api from "../api/index";

export const getFiveProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_TOP_FIVE_PRODUCTS_REQUEST,
    });
    const { data } = await api.fetchFiveProducts();
    dispatch({
      type: actionType.GET_TOP_FIVE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_TOP_FIVE_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const submitComment =
  (comment, userId, productId, productName) => async (dispatch) => {
    try {
      dispatch({
        type: actionType.COMMENTING_REQUEST,
      });
      const { data } = await api.addReview(
        comment,
        userId,
        productId,
        productName
      );

      dispatch({
        type: actionType.COMMENTING_SUCCESS,
        // payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.COMMENTING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const fetchComments = () => async (dispatch)=>{
//     try {

//         dispatch({
//             type: actionType.FETCH_COMMENT_REQUEST,
//         })
//         const {data} = await api.getComments();
//         dispatch({
//             type: actionType.FETCH_COMMENT_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type:actionType.FETCH_COMMENT_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                 ?error.response.data.message:error.message,
//         });
//     }
// }

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_PRODUCTS_REQUEST,
    });
    const { data } = await api.fetchProducts();

    dispatch({
      type: actionType.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//get all the products for the admin to see
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.GET_ALL_PRODUCTS_REQUEST,
    });
    const { data } = await api.fetchAllProducts();

    dispatch({
      type: actionType.GET_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsByCategory = (catagory) => async (dispatch) => {
  // console.log('in actioning: ' + catagory);
  try {
    dispatch({
      type: actionType.GET_PRODUCTS_BY_CATEGORY_REQUEST,
    });
    const { data } = await api.fetchProductsByCategory(catagory);

    dispatch({
      type: actionType.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCTS_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsById = (id) => async (dispatch) => {
  // console.log('in actioning: ' + id);
  try {
    dispatch({
      type: actionType.GET_PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await api.fetchProductsById(id);

    dispatch({
      type: actionType.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: actionType.GET_PRODUCT_DETAILS_RESET,
    });
  }
};

//delete products

export const deleteProductById = (id) => async (dispatch) => {
  // console.log('in deleting: ' + id);
  try {
    dispatch({
      type: actionType.PRODUCT_DELETE_REQUEST,
    });
    const { data } = await api.deleteProductById(id);
  } catch (error) {
    dispatch({
      type: actionType.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: actionType.GET_PRODUCT_DETAILS_RESET,
    });
  }
};

export const editProduct = (editValues) => async (dispatch) => {
  // console.log("im edting action");
  try {
    dispatch({
      type: actionType.PRODUCT_EDIT_REQUEST,
    });
    const { data } = await api.editProduct(editValues);

    dispatch({
      type: actionType.PRODUCT_EDIT_SUCCESS,
      loading: false,
    });
  } catch (error) {
    dispatch({
      type: actionType.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsBySearch = (name, category) => async (dispatch) => {
  // // console.log('in actioning: ' + id);
  try {
    dispatch({
      type: actionType.GET_PRODUCTS_BY_SEARCH_REQUEST,
    });
    const { data } = await api.fetchProductsBySearch(name, category);

    dispatch({
      type: actionType.GET_PRODUCTS_BY_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.GET_PRODUCTS_BY_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const recordProductSearch = (name, category) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.RECORD_PRODUCT_SEARCH_REQUEST,
    });

    await api.productSearchRecord(name, category);
  } catch (error) {
    dispatch({
      type: actionType.RECORD_PRODUCT_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const recordProductVisit = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.RECORD_PRODUCT_VISIT_REQUEST,
    });
    const { data } = await api.productVisitRecord(id);

    dispatch({
      type: actionType.RECORD_PRODUCT_VISIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.RECORD_PRODUCT_VISIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.CREATE_PRODUCTS_REQUEST,
    });
    const { data } = await api.createProduct(product);

    dispatch({
      type: actionType.CREATE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.CREATE_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sellProduct = (id, qty) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.SELL_PRODUCT_REQUEST,
    });
    const { data } = await api.sellingProduct(id, qty);
    dispatch({
      type: actionType.SELL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.SELL_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const returnProduct = (id, qty) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.RETURN_PRODUCT_REQUEST,
    });
    const { data } = await api.retruningProduct(id, qty);
    dispatch({
      type: actionType.RETURN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.RETURN_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const getProductsDetails = (id) => async (dispatch)=>{
//     try {
//         dispatch({
//             type: actionType.GET_PRODUCT_DETAILS_REQUEST,
//         });
//         const {data} = await axios.get(`/api/getProductDetail/${id}`);

//         dispatch({
//             type: actionType.GET_PRODUCT_DETAILS_SUCCESS,
//             payload: data,
//         });

//     } catch (error) {
//         dispatch({
//             type:actionType.GET_PRODUCTS_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                 ?error.response.data.message:error.message,
//         });

//     }
// };

// export const createProduct = (product) => async (dispatch) => {
// 	try{
//         dispatch({
//             type: actionType.CREATE_PRODUCTS_REQUEST,
//         });
// 		const { data } = await  api.createProduct(product);

// 		dispatch({
//             type: actionType.CREATE_PRODUCTS_SUCCESS,
//             payload: data
//         });
// 	} catch (error) {
// 		dispatch({
//             type:actionType.CREATE_PRODUCTS_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                 ?error.response.data.message:error.message,
//         });
// 	}
// };

// export const removeProductDetails = ()=> (dispatch)=>{
//     dispatch({
//         type:actionType.GET_PRODUCT_DETAILS_RESET,
//     });
// };
