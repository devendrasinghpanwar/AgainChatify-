 // const express = require('express');
import express from "express"; // 
import cookieParser from 'cookie-parser' ;
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import messageRoute from './routes/messageRoute.js'
import {connectDB} from './lib/db.js';
import { ENV } from "./lib/env.js";

const app= express();


const __dirname=path.resolve();

// console.log(dotenv.config());
 const PORT = ENV.PORT || 3000;
 app.use(express.json()); // req.body , middleware
 app.use(cookieParser()); // use cookie-parser , for parse the cookies  

app.use("/api/auth", authRoutes);
app.use('/api/messages',messageRoute);




app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});



// make  ready for deployement 
if(ENV.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist"))); // basically this path is used for fetching the dist file(deployable) from frontend

    app.get("*",(_,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html")); // this path is resolve the problem 
    })
}

 app.listen(PORT,()=>{
    console.log("server is running on port: "+PORT);  
    connectDB(); 
})