import * as actionType from '../constants/wishlistConstants';


export const wishlistReducer = (state = {wishlistItems: []}, action)=>{
    switch(action.type){
        case actionType.ADD_TO_WISHLIST:
        
            const item = action.payload;
            
            return{
                // spread the state
                ...state,
                wishlistItems: [...state.wishlistItems , item],
            };    
        
            case actionType.REMOVE_FROM_WISHLIST:
                // if the action is to remove the item from the cart then filter through the array and map the item and remove it
                return{
                    ...state,
                    // filter through the cartItem and select every item which is not the item selected leaving the item from the new array
                    wishlistItems: state.wishlistItems.filter((x)=> x.product !== action.payload)

                };
            default:
                return state;
    }
}