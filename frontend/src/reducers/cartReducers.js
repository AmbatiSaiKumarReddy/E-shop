import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"; 


export const cartReducer=(state={cartItems:[]},action)=>{
   
    console.log(state)
    switch(action.type){

        
        case CART_ADD_ITEM:
            
            const item=action.payload
            
            const existItem=state.cartItems.find(x=>x.product===item.product)
            if(existItem){
                
                

                return {
                    ...state,
                    cartItems:state.cartItems.map(x=>x.product===existItem.product?item:x)
                }

            }

            else{
                console.log(40)
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }

        case CART_REMOVE_ITEM:
            const itemId=action.payload
            return{
                ...state,
                cartItems:state.cartItems.filter((each)=>each.product!==itemId)
            }
            
        default:
            return state
        

    }
}