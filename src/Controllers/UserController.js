import {StatusCodes} from 'http-status-codes'

import userModel from "../Models/UserSchema.js";


 export async function  saveUser( req, res){
         
   try {
        const reqData= req.body
        console.log("data"+reqData)

        req.body['dob']= new Date(req.body.dob);
      const user= new  userModel(reqData )
   
      const SavedUser= await user.save();
      res.status(StatusCodes.OK).json(SavedUser)

   } catch (error) {
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
      const data=req.body;
      
     const updateduser= await userModel.findByIdAndUpdate(id, data);
   
     
     res.status(StatusCodes.OK).json(updateduser)

 } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}


export async function searchAPI(req, res){
   var searchBar;
  var total;
   
   try {
     
      var username=req.query.name
      var usercity=req.query.city
      var userhobbies= req.query.hobbies
      var usergender= req.query.gender
      var sortBy= req.query.sortBy

            
     const page= req.query.page ;
     const limit= req.query.limit
      const skip= (page-1)*limit

      if(username==undefined){
         username=""
      }
      if(usercity==undefined){
         usercity=""
      }
      if(userhobbies==undefined){
         userhobbies=""
      }
      if(usergender==undefined){
         usergender=''
      }
      if(sortBy==undefined){
         sortBy="name"
      }

      const sort={}
      sort[sortBy]=1;
      
  
         searchBar= await userModel.find({$or:[{city:{$regex:usercity},name:{$regex:username} ,hobbies:{$regex:userhobbies} ,gender:{$regex:usergender}}]}).sort(sort).skip(skip).limit(limit) ;
      
         total= await userModel.find().countDocuments()

      res.status(StatusCodes.OK).json({data:searchBar, totalCount:total})
     
      
        
      
     
      
   } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
   }
}







