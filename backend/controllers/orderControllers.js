import asyncHandler from "express-async-handler"
import Order from '../models/orderModel.js'

const addOrderItems= asyncHandler( async(req,res)=>{

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
     }=req.body


    if(orderItems && orderItems.length===0){
        res.status(401)
        throw new Error('No Order Items')
        return

    }
    else{

        
    
         const order=new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
    
         })
    
         const createdOrder=await order.save()
         console.log(createdOrder)
         res.status(201).json(createdOrder)

       
    

    }
    




})

const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')
    if (order){
        res.json(order)
    }
    else{
        res.status(404)
        throw new Error('Order Not Found')
    }
})


const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)

    if(order){

        order.isPaid=true
        order.paidAt=Date.now()
    
        const updatedOrder=await order.save()
    
        res.json(updatedOrder)
    

    }
    else{
        res.status(404)
        throw new Error('Not Found the Order')
    }
   
})

export  {addOrderItems,getOrderById,updateOrderToPaid}