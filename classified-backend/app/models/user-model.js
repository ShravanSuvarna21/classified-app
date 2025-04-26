import { Schema,model } from "mongoose";

const userRegisterSchema = new Schema({
     name:{
        type: String
     },
     email:{
        type: String
     },
     password:{
        type: String
     },
     role:{
         type:String,
        enum:['admin','seller','buyer']
     },
     isActive:{
        type: Boolean,
        default: 'true'
     },
         
},{timestamps:true});

const User = model('User',userRegisterSchema);

export default User;