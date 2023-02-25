export const foodState = {
  foods: [],
  loader: false
};

export const editFoodReducer = (state, action) => {
  switch (action.type) {
    case "fetchFoodAndChangeState":
      return {
        ...state,
        foods: action.payload
      };
    case "changeLoader":
      return {
        ...state,
        loader: action.payload
      }
    default:
      return state;
  }
};
