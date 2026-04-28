import  mongoose  from "mongoose";

//Creating SChema to store data , i.e data will be stored in this format only
const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    sizes:{type:Array,required:true},
    date:{type:Number,required:true},
    bestseller:{type:Boolean},
    
})
//creating Model to store data in the form that schema describes

const productModel=mongoose.models.product || mongoose.model("product",productSchema);

export default productModel