import * as actionType from '../constants/wishlistConstants';
import * as api from '../api/index';


export const addToWishlist =  (id) => async (dispatch,getState)=>{
    
    const {data} = await api.fetchProductsById(id);
    const date = new Date();
    console.log("comming from  add to wishlist action");
    console.log(data);
  //  console.log(qtyCounter ," is the ammount being added to cart");
    console.log(data[0].productBrand);
   
    dispatch({
        type: actionType.ADD_TO_WISHLIST,
        payload:{
            product:data[0].id,
            productName:data[0].productName,
            imageUrl:data[0].productImg,           
            brand:data[0].productBrand,
            date: date           
        },
    });
   
    //store the cartItem in the localstorage to save in case of refreshed page or changed tab screen
    localStorage.setItem('wishlist' , JSON.stringify(getState().wishlist.wishlistItems));
    // localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};


export const removeFromWishlist = (id) => (dispatch,getState) =>{
    dispatch({
        type: actionType.REMOVE_FROM_WISHLIST,
        payload: id
    })

    localStorage.setItem('wishlist' , JSON.stringify(getState().wishlist.wishlistItems));
};