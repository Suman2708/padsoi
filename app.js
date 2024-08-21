require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const conn=require('./db/conn');
const port=process.env.PORT ||5000;
 const Defaultdata=require('./defaultdata');
const Products=require('./models/productSchema');
const cors=require('cors');
const router=require('./rotues/route');
const cookieParser=require('cookie-parser');
const Razorpay=require("razorpay") ;
app.use(express.json()); //whatever data export to frontend is in form of json
app.use(cookieParser(""));
app.use(cors());
app.use(router);
const path = require('path');
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
 
app.get("/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);




app.listen(port,()=>{
    console.log(`server is running on port number ${port}`);
});

Defaultdata();