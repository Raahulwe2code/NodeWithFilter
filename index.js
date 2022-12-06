import express from 'express'
import 'dotenv/config'
import { DbConfigs } from './src/Configs/DbConfigs.js';
import userRouter from './src/Routers/UserRouter.js';
import cors from 'cors'


const app=express();
app.use(express.json())
app.use(cors())
DbConfigs();
app.use(userRouter)
 

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`server is running at ${process.env.SERVER_PORT}`)
})



