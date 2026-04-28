// Route for user logic
import validator from "validator";
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body
        
        const user=await userModel.findOne({email});

        if(!user){
            // wrong email address then user doesnot exists
           return res.json({success:false,message:"User Does Not Exists"})
        }
    
        const isMatch=await bcrypt.compare(password,user.password)
         if(isMatch){
            const token=createToken(user._id)
            return res.json({success:true,token})
    }
        // Incorrect credentials 
        else {
            return res.json({success:false,message:"Invalid Credentials"})
        }


        }
   

    catch(error){
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

// Route for user register
const registerUser= async (req,res)=>{
   
    try{
        const {name,email,password}=req.body;
        
        // checking if the user already exists or not 
        const exists=await userModel.findOne({email});
        if (exists){
            return res.json({success:false,message:"User already exists"})

        }
        //validating strong password and email format 
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a Valid email Address"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please Enter strong password"})
        }
        // hashing password 
        const salt =await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        
        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user=await newUser.save()

        const token=createToken(user._id)
        res.json({success:true,token})

    }
        catch(error){
            console.log(error)
            res.json({success:false,message:error.message})
    }
}
// Route for admin login 
const adminLogin=async (req,res)=>{
try {
    const {email,password}=req.body;
    const E_Admin=process.env.ADMIN_EMAIL;
    const P_Admin=process.env.ADMIN_PASS;
    if(!E_Admin || !P_Admin){
        return res.json({success:false,message:"ENV NOt FOUND"})
    }
    if(email===E_Admin && password===P_Admin){
        
        const token=jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
    }
    else{
        res.json({success:false,message:"Invalid Credentials"})
    }
} catch (error) {
    res.status(500).json({message:error.message})
}
}

export {loginUser,registerUser,adminLogin}