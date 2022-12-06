import {StatusCodes} from 'http-status-codes'
import { userSchema } from '../../validation/SchemaValidation.js';
import userModel from "../Models/UserSchema.js";

 export async function  saveUser( req, res){
   console.log(req.body)
      try {

        const {error, value}= userSchema.validate(req.body)
        if (error){
            res.status(StatusCodes.BAD_REQUEST).json(error)
        }
        else{
               req.body=value;
               req.body['dob']= new Date(req.body.dob)
                  const userEmail= await userModel.findOne({email:req.body.email})
                 if(userEmail){
                    
                    res.status(StatusCodes.BAD_REQUEST).json({message:"Email already exist"}) 
                 }
                 else{
                    const user= new  userModel(req.body)
                    const SavedUser= await user.save();
                    res.status(StatusCodes.OK).json(SavedUser)
                 }
          
        }
      
      } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
      }
}

 export async function getAllUser(req, res){
    try {
       const allUser= await userModel.find();
       res.status(StatusCodes.OK).json(allUser)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
    }
}
export async function getUserById(req, res){
  try {
     const userById= await userModel.findById(req.params.id);
     res.status(StatusCodes.OK).json(userById)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
  }
}

export async function deleteUser(req, res){
 try {
    await userModel.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({})
 } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}

export async function updateUser(req, res){
 try {
    const id= req.params.id
      const data= req.body;
     const updateduser= await userModel.findByIdAndUpdate(id, data);
     res.status(StatusCodes.OK).json(updateduser)

 } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}