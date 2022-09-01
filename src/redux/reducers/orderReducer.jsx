import * as actionTypes from '../constants/orderConstant';



export const getRecentOrdersReducer = (state= {recentOrders: []}, action)=>{
    switch(action.type){
        case actionTypes.GET_RECENT_ORDER_LOCATION:
            return {
                loading: true,
                recentOrders: []
            }
        case actionTypes.GET_RECENT_ORDER_LOCATION_SUCCESS:
            return {
                loading: false,
                recentOrders: action.payload
            }
        case actionTypes.GET_RECENT_ORDER_LOCATION_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default: 
            return state
    }
}

export const getOrdersReducer = (state = {orders: [] }, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDERS_REQUEST:
        return{
            loading: true,
            orders: []
        }
    case actionTypes.GET_ORDERS_SUCCESS:
        return{
            loading:false,
            orders: action.payload
        }  
    case actionTypes.GET_ORDERS_FAIL:
        return{
            loading:false,
            error: action.payload,
            // products: []
        }
    case actionTypes.GET_ORDERS_INPROGRESS_REQUEST:
        return{
            loading: true,
            orders: []
        }
    case actionTypes.GET_ORDERS_INPROGRESS_SUCCESS:
        return{
            loading:false,
            orders: action.payload
        }  
    case actionTypes.GET_ORDERS_INPROGRESS_FAIL:
        return{
            loading:false,
            error: action.payload,
            // products: []
        }
    case actionTypes.GET_ORDERS_PENDING_REQUEST:
        return{
            loading: true,
            orders: []
        }
    case actionTypes.GET_ORDERS_PENDING_SUCCESS:
        return{
            loading:false,
            orders: action.payload
        }  
    case actionTypes.GET_ORDERS_PENDING_FAIL:
        return{
            loading:false,
            error: action.payload,
            // products: []
        }
    case actionTypes.GET_ORDERS_BY_ID_REQUEST:
        return{
            loading: true,
            orders: []
        }
    case actionTypes.GET_ORDERS_BY_ID_SUCCESS:
        return{
            loading:false,
            orders: action.payload
        }  
    case actionTypes.GET_ORDERS_BY_ID_FAIL:
        return{
            loading:false,
            error: action.payload,
            // products: []
        }
    case actionTypes.CREATE_ORDERS_REQUEST:
        return{
            loading: true,
        }
    case actionTypes.CREATE_ORDERS_SUCCESS:
        return {
            loading:false,
        };
    case actionTypes.CREATE_ORDERS_FAIL:
        return{
            loading:false,
            error: action.payload
        }
    default:
        return state;
  } 
};

export const getOrderDetailsReducer = (state = {orderDetails: [] }, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDER_DETAILS_REQUEST:
        return{
            loading: true,
            orderDetails: []
        }
    case actionTypes.GET_ORDERS_DETAILS_SUCCESS:
        return{
            loading:false,
            orderDetails: action.payload
        }  
    case actionTypes.GET_ORDERS_DETAILS_FAIL:
        return{
            loading:false,
            error: action.payload,
            // products: []
        }
    case actionTypes.CREATE_ORDERS_DETAILS_REQUEST:
        return{
            loading: true,
        }
    case actionTypes.CREATE_ORDERS_DETAILS_SUCCESS:
        return [
            ...state, action.payload
        ];
    case actionTypes.CREATE_ORDERS_DETAILS_FAIL:
        return{
            loading:false,
            error: action.payload
        }
    default:
        return state;
  } 
};

export const getOrderReportsReducer = (state = {orderReports: []}, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDER_REPORTS_REQUEST:
        return{
            loading: true,
            orderReports: []
        }
    case actionTypes.GET_ORDERS_REPORTS_SUCCESS:
        return{
            loading:false,
            orderReports: action.payload
        }  
    case actionTypes.GET_ORDERS_REPORTS_FAIL:
        return{
            loading:false,
            error: action.payload
        }
    default:
        return state;
  } 
};

export const getOrderTotalReducer = (state = {total: []}, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDER_TOTALS_REQUEST:
        return{
            loading: true,
            total: []
        }
    case actionTypes.GET_ORDERS_TOTALS_SUCCESS:
        return{
            loading:false,
            total: action.payload
        }  
    case actionTypes.GET_ORDERS_TOTALS_FAIL:
        return{
            loading:false,
            error: action.payload
        }
    default:
        return state;
  } 
};

export const getOrderReportsByTimeReducer = (state = {orderReportSpecific: []}, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDER_REPORTS_BY_MONTH_REQUEST:
        return{
            loading: true,
            orderReportSpecific: []
        }
    case actionTypes.GET_ORDERS_REPORTS_BY_MONTH_SUCCESS:
        return{
            loading:false,
            orderReportSpecific: action.payload
        }  
    case actionTypes.GET_ORDERS_REPORT_BY_MONTH_FAIL:
        return{
            loading:false,
            orderReportSpecific: action.payload
        }
    case actionTypes.GET_ORDER_REPORTS_BY_YEAR_REQUEST:
        return{
            loading: true,
            orderReportSpecific: []
        }
    case actionTypes.GET_ORDERS_REPORTS_BY_YEAR_SUCCESS:
        return{
            loading:false,
            orderReportSpecific: action.payload
        }  
    case actionTypes.GET_ORDERS_REPORT_BY_YEAR_FAIL:
        return{
            loading:false,
            orderReportSpecific: action.payload
        }
    case actionTypes.GET_ORDER_REPORTS_BY_WEEK_REQUEST:
        return{
            loading: true,
            orderReportSpecific: []
        }
    case actionTypes.GET_ORDERS_REPORTS_BY_WEEK_SUCCESS:
        return{
            loading:false,
            orderReportSpecific: action.payload
        }  
    case actionTypes.GET_ORDERS_REPORT_BY_WEEK_FAIL:
        return{
            loading:false,
            orderReportSpecific: action.payload
        }
    case actionTypes.GET_ORDER_REPORTS_OF_LAST_WEEK_REQUEST:
        return{
            loading: true,
            orderReportSpecific: []
        }
    case actionTypes.GET_ORDERS_REPORTS_OF_LAST_WEEK_SUCCESS:
        return{
            loading:false,
            orderReportSpecific: action.payload
        }  
    case actionTypes.GET_ORDERS_REPORT_OF_LAST_WEEK_FAIL:
        return{
            loading:false,
            orderReportSpecific: action.payload
        }
    default:
        return state;
  } 
};
