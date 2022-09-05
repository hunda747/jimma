import * as actionType from '../constants/cartConstant';


export const cartReducer = (state = {cartItems: []}, action)=>{
	switch(action.type){
		case actionType.ADD_TO_CART:
			const item = action.payload;
			
			const existItem = state.cartItems.find((x) => x.id ===item.id);

			if(existItem){
				console.log(state.cartItems);
				const objIndex = state.cartItems.findIndex((obj => obj.id === existItem.id));
				console.log(objIndex);
					state.cartItems[objIndex].qtyCounter += 1;
				
				return{
					//spread the state 
					...state,
					//go to cartItems and set the item to new cartItems which sets it to a new array
					// and check if its the same with the existing item if so add the item in the array else set it to the current item in the array
					// cartItems: state.cartItems.map((x) => x.id === existItem.id ? item: x),
				};
			}else{
				//else it means the item is new so we just push it to the cartItems array
				return{
					// spread the state
					...state,
					cartItems: [...state.cartItems , item],
				};
			}
		case actionType.CHANGE_TO_CART:
			const change = action.payload;
			
			console.log(state.cartItems);
			const objIndex = state.cartItems.findIndex((obj => obj.id === change.id));
			console.log(objIndex);

			state.cartItems[objIndex].qtyCounter = change.qtyCounter;
			console.log(state.cartItems[objIndex]);
			console.log(state.cartItems);
			return {
				...state,
				cartItems: [...state.cartItems]
			};
		case actionType.REMOVE_FROM_CART:
			// if the action is to remove the item from the cart then filter through the array and map the item and remove it
			return{
				...state,
				// filter through the cartItem and select every item which is not the item selected leaving the item from the new array
				cartItems: state.cartItems.filter((x)=> x.id !== action.payload)
			};
		case actionType.CART_RESET:
			return{
				cartItems:[]
			}
		default:
			return state;
	}
}