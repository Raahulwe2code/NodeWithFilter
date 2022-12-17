import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { DbConfigs } from './src/Configs/DbConfigs.js';
import userRouter from './src/Routers/UserRouter.js';

import cors from 'cors'


const PORT= process.env.PORT||3000
const app=express();
app.use(cors())

 app.use(express.json())
app.use(express.static('images'))
DbConfigs();
app.use(userRouter);


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 







app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})



