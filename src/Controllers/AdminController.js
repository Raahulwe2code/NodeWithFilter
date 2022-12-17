import {StatusCodes} from 'http-status-codes'
import bcrypt from 'bcrypt'
import AdminModel from '../Models/AdminSchema.js';
import { AdminValidation } from '../../validation/AdminValidation.js';
import Jwt from 'jsonwebtoken'
 import 'dotenv/config'
 
 
  export  async function saveAdmin( req, res){
   try {
     const {value, error}=AdminValidation.validate(req.body);
     if(error){
        res.status(StatusCodes.BAD_REQUEST).json(error)
     }
     else{
        req.body=value;
        const hashedPassword=bcrypt.hashSync(req.body.password,10);
        req.body['password']= hashedPassword;
        const admin= new AdminModel(req.body)
        const savedAdmin= await admin.save()
        res.status(StatusCodes.CREATED).json(savedAdmin)

     }
        
   } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Somthing went wrong"})
   }
}


   export async function getAdminbyId(req, res){
 try {
    const Getadmin= await AdminModel.findById(req.params.id)
    res.status(StatusCodes.OK).json(Getadmin)
 } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Failed to fetching admin data"})
 }
}


 export async function getAllAdmin(req, res){
    try {
        const allAdmin= await AdminModel.find()
        res.status(StatusCodes.OK).json(allAdmin)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Failed to fetching admin data"}) 
    }

}

 export async function loginAdmin(req, res){
try {
     const user = await AdminModel.findOne({username:req.body.username});
     if(user){
       if(bcrypt.compareSync(req.body.password, user.password)){
           const token= Jwt.sign({userId:user._id},process.env.PRIVATE_KEY);
           res.status(StatusCodes.OK).json({token})
       }
       else{
         res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid password"})
       }
     }
     else{
      res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid username"})
     }
} catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Failed to fetching admin data"}) 
}
}


