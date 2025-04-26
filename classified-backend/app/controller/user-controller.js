import User from '../models/user-model.js'
import {validationResult} from 'express-validator';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
const userControl = {};



userControl.register = async(req,res)=>{

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }

    const {name,email,password,role} = req.body;
        console.log("req",req.body)

    try{
        const user = new User({name,email,password,role});
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(password,salt);
        const totalCount = await User.countDocuments();
        console.log("total",totalCount);
        // const roleCheck = await User.findOne({role:'admin'});
        // console.log(roleCheck);
        if(totalCount==0){
            user.role='admin';
            user.password=hash;
            await user.save();
            return res.status(201).json(user);
        } 
        if(totalCount>0 && user.role == 'admin'){
           return res.status(400).json({Error: 'Admin profile already exists'});
        }
        user.password=hash;
        await user.save();
        res.json(user);
        
    }catch(error){
        console.log(error);
        return res.status(500).json({Error: ' Something went wrong'});
    }

}

userControl.login = async(req,res)=>{
 const error = validationResult(req);
 if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()});
 }

 const {email,password} = req.body;
 try{
    const user = await User.findOne({email});
    if(user.isActive ==false){//Since it's boolean value not used string qoute - ''
        return res.status(403).json({Error: 'Account deactivated'})
    }
    if(!user){
        return res.status(404).json({Notice:'Email or Password is invalid'});
    }
    const isVerified = await bcryptjs.compare(password,user.password);
    if(!isVerified){
        return res.status(404).json({Notice:'Email or Passwrod is invalid'});
    }
    

    const payload = {userId: user._id, role:user.role};
    const token =  jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'7d'});
    res.json({token:`${token}`});
 }catch(error){
    return res.status(500).json({Error:'Something went wrong'});
 }
}

userControl.listAccount = async(req,res)=>{
    try{
        const users = await User.findOne();
        console.log("user",users)
        res.json(users);
    }catch (error){
        console.log(error);
        return res.status(500).json({Error:'Somehting Went wrong'});
    }
}

userControl.account= async(req,res)=>{
    try{
        const user = await User.findById(req.userId)
        res.json(user);
    }catch (error){
        console.log(error);
        return res.status(500).json({Error:'Somehting Went wrong'});
    }
}

userControl.deactivateAccount =async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({Error:error.array()});
    }
    const userId = req.params.id;
    // const isActive = false;

   
    try{
        let user;
        if(req.role == "admin"){
         user = await User.findByIdAndUpdate(userId,{isActive : false},{new:true});
        }else if(req.role == "seller" || req.role == "buyer"){
           if(userId != req.userId){
             return res.status(403).json({Notice : "Not Authorized to deactivate other account"})
           }
           user = await User.findOneAndUpdate({_id:userId},{isActive : false},{ new: true })
          console.log("User", user)
       }else{
            return res.status(403).json({error: "Invalid Role"})
        }

        if(!user){
            return res.status(404).json({ error: "User not found or not authorized to deactivate" });
        
        }

        return res.json({message:"Account deactivated Successfully",user});
    }catch(error){
        console.log(error);
        return res.status(500).json({Error: 'Something Went wrong'});
    }
}



userControl.userManage = async(req,res)=>{   
    const userId = req.userId;
    const {email,password,newPassword} = req.body;
    try{
        const user = await User.findOne({email});
        if(!email){
            return res.status(404).json({Error:'Invalid Username'});
        }
        const isVerified = await bcryptjs.compare(password,user.password);
        if(!isVerified){
            return res.status(404).json({Error:'Incorrect password'});
        }
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(newPassword,salt);
        await User.findByIdAndUpdate(userId,{password:hash},{new:true})
        res.json({Notice: 'Password changed successfully'});
    }catch(error){
        console.log(error);
        return res.status(500).json({Error:'Something went wrong'});
    }

}

export default userControl; 