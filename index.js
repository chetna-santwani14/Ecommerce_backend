import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './Routes/userRoutes.js'
import productRouter from './Routes/productRoutes.js'

//App config
const app=express()
const port =process.env.PORT || 4000
connectDB();
connectCloudinary();
//middleware 
app.use(cors()); // backend can be accessed
app.use(express.json()); // requests will be parsed into json than reach server 
app.use(express.urlencoded({extended: true}));

// API Endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)

// starting the express server 

app.listen(port,()=>{
    console.log(`Server is running at Port http://localhost:${port}`)
})
export default app