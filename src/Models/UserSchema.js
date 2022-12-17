import mongoose  from 'mongoose' 
  const UserSchema=new mongoose.Schema({
    name:{type:String},
    dob:{type:Date},
    city:{type:String },
    desc:{type:String },
    email:{type:String },
    mobile:{type:String },
    gender:{type:String},
    hobbies:{type:Array},
 

  })

  const userModel= mongoose.model("user", UserSchema)
  export default userModel;

  