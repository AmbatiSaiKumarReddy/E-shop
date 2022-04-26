import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails:productDetailsReducer,
  cart:cartReducer
})




let cartItemsFromStorage=localStorage.getItem('cartItems') 

if (cartItemsFromStorage){
  console.log(22)
  cartItemsFromStorage=JSON.parse(localStorage.getItem('cartItems') )
  
  
}
else{
  

  console.log(21)
  cartItemsFromStorage=[]
  
  
}


const initialState = {
  cart:{cartItems:cartItemsFromStorage}
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)


export default store
