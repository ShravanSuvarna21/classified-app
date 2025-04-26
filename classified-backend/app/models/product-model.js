import {Schema,model}  from "mongoose";
// import User from '../modules/user-schema-module.js';

const productSchema = new Schema({
    name:{
        type: String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    images:{
        type:String
    },
    category:{
        type: Schema.Types.ObjectId
    },
    seller:{
        type:Schema.Types.ObjectId
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    enquires:[{
        buyer: Schema.Types.ObjectId,
        message: String,
        response: String        
}],
    views:{
        type:Number
    }
},{timestamps:true});

const Product = model('Product',productSchema);

export default Product;