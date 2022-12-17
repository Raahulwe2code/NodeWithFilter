import express from 'express';

import bodyParser from 'body-parser'

import { deleteUser, getAllUser, getUserById, saveUser, searchAPI, updateUser } from '../Controllers/UserController.js';

 const app=express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
 const userRouter= express.Router();

 



 userRouter.post('/user', saveUser)

 userRouter.get('/user', getAllUser)
 userRouter.get('/user/:id', getUserById);
 userRouter.delete('/user/:id', deleteUser);
 userRouter.put('/user/:id', updateUser);
 userRouter.get('/search', searchAPI);
 

 export default userRouter;