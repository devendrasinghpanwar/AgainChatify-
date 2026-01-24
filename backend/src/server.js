// const express = require('express');
import express from "express"; // 
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import messageRoute from './routes/messageRoute.js'
const app= express();

dotenv.config(); // configuration for .env file 
 const PORT = process.env.PORT || 3000;


app.use('/api/auth',authRoutes);
app. use('/api/auth',messageRoute);

app.listen(PORT ,()=>console.log("Server is running on port :"+PORT));  

 