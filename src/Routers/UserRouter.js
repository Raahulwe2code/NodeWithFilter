import express from 'express';
import { deleteUser, getAllUser, getUserById, saveUser, updateUser } from '../Controllers/UserController.js';
 const userRouter= express.Router();
 userRouter.post('/user', saveUser)
 userRouter.get('/user', getAllUser)
 userRouter.get('/user/:id', getUserById);
 userRouter.delete('/user/:id', deleteUser);
 userRouter.put('/user/:id', updateUser);

 export default userRouter;