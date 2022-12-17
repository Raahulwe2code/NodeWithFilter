import Jwt from 'jsonwebtoken'
import'dotenv/config';
import {StatusCodes} from 'http-status-codes'

 export function VerifyToken(req, res,next){
 const authHeader= req.get('Authorization');
 console.log(authHeader);
 if(authHeader){
 const token= authHeader.replace("Bearer ", "" )
 Jwt.verify(token,process.env.PRIVATE_KEY,(error, payload)=>{
if(error){
    return res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid token"})

}
else{
    next()
}
 })
 }
 else{
    return res.status(StatusCodes.UNAUTHORIZED).json({message:"Access denied , please Login first"})
 }
}