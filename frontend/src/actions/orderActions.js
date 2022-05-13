import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"
import axios from 'axios'

export const createOrder=(order)=>async (dispatch,getState)=>{

    try{

        dispatch({
            type:ORDER_CREATE_REQUEST
        })

        const {userLogin:{userInfo}}=getState()
       
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`

            }
            

          
        }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>")

        const {data}=await axios.post('/api/orders/',order,config)

        console.log(data)


        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
    }

    catch(error){
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }

}

export const getOrderDetails=(id)=>async (dispatch,getState)=>{
    const {userLogin:{userInfo}}=getState()

    try{

        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
    
        const {data} =await axios.get(`/api/orders/${id}`,config)
    
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })


    }

    catch(error){

        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    
    
        
        

        })
       
}}

export const payOrder=(id,paymentResult)=>async (dispatch,getState)=>{
    const {userLogin:{userInfo}}=getState()

    try{

        dispatch({
            type:ORDER_PAY_REQUEST
        })

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
    
        const {data} =await axios.put(`/api/orders/${id}/pay`,paymentResult,config)
        console.log(data)
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })


    }

    catch(error){

        dispatch({
            type:ORDER_PAY_FAIL,
            payload:error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    
    
        
        

        })
       
}}