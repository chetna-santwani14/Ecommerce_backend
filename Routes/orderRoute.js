import express from 'express'
import orderController from '../controller/orderController'
import adminAuth from '../middleware/adminAuth.js'

import authUser from '../middleware/auth.js'

const orderRouter=express.Router()

//Admin Features

orderRouter.post('/list',orderController.allOrders)

orderRouter.post('/status',orderController.updateStatus)

//payment features

orderRouter.post('/place',authUser,orderController.placeOrder)

orderRouter.post('/stripe',authUser,orderController.placeOrderStripe)

orderRouter.post('/razorpay',authUser,orderController.placeOrderRazorpay)

//user feature

orderRouter.post('/userorders',authUser,orderController.userOrders)

export default orderRouter