 // const express = require('express');
import express from "express"; // 
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import messageRoute from './routes/messageRoute.js'

const app= express();


const __dirname=path.resolve();

dotenv.config(); // configuration for .env file 
// console.log(dotenv.config());
 const PORT = process.env.PORT || 3000;

app.use('/api/auth',authRoutes);
app. use('/api/auth',messageRoute);

// make  ready for deployement 
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist"))); // basically this path is used for fetching the dist file(deployable) from frontend

    app.get("*",(_,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html")); // this path is resolve the problem 
    })

}

app.listen(PORT ,()=>console.log("Server is running on port :"+PORT));  



/*
import path from "path";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", messageRoute);

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "frontend/dist"))
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "frontend", "dist", "index.html")
    );
  });
}

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

*/