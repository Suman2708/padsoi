const express = require('express');
const router = new express.Router();
const Products = require('../models/productSchema');
const USER = require('../models/userSchema');
const bcrypt=require('bcryptjs');
const cookie=require('cookie-parser');
const authenticate =require( '../middleware/authenticate');
const crypto=require("crypto") ;
// const checkout=require("../controllers/paymentController")
//payment





const Razorpay=require("razorpay") ;
 const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });



   const checkout = async (req, res) => {
    const options = {
      amount: 5000,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
       console.log(order)
    res.status(200).json({
      success: true,
      order,
    });
  };
//get product data
router.get("/getproducts", async (req, res) => {
  try {
    const productdata = await Products.find();
    //    console.log("data of postman"+productdata);
    res.status(201).json(productdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});
router.post("/checkout", async (req, res) => {
  const options = {
    amount:Number(req.body.price *100) ,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
     console.log(order)
  res.status(200).json({
    success: true,
    order,
  });
}
);

router.post("/paymentverification",async(req,res)=>{
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//   req.body;

// const body = razorpay_order_id + "|" + razorpay_payment_id;

// const expectedSignature = crypto
//   .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//   .update(body.toString())
//   .digest("hex");

// const isAuthentic = expectedSignature === razorpay_signature;

// if (isAuthentic) {
//   // Database comes here

//   await Payment.create({
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//   });

//   res.redirect(
//     `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//   );
// } else {
//   res.status(400).json({
//     success: false,
//   })
// }

console.log(req.body);
res.status(200).json({message:"success"})
});


// console.log(req.body);
// res.status(200).json({message:"success"});
//  })


router.get("/productone/:id", async (req, res) => {
  try {
    const { id } = req.params;


    const individualdata = await Products.findOne({ id: id });

    console.log("individual" + individualdata);
    res.status(201).json(individualdata);

  } catch (error) {
    res.status(400).json(individualdata);
    console.log("error" + error.message);
  }
});

router.post("/register", async (req, res) => {


  const { name,
    email,
    mobile_no,
    password,
    confirm_password } = req.body;
       
    if(!name||
    !email||
    !mobile_no||
   ! password||
    !confirm_password){
      res.status(422).json({error:"fill all data"});
    }

  try {

        const findPreUser=await USER.findOne({email:email});

        if(findPreUser){
          res.status(422).json({error:"email is already present"});
          console.log("email is already available");
        }else if(password!=confirm_password){
          res.status(422).json({error:"password is not matching"});
          console.log("password is not matching");
        }else{
          const finalUserData= new USER({
            name,
            email,
            mobile_no,
            password,
            confirm_password
          });
             const storeData=await finalUserData.save();
             console.log("data is stored");
             res.status(201).json(storeData);
        }

  } catch (error) {
     console.log("error"+error.message);
  }
});

router.post("/login",async(req,res)=>{

  const { email,password } = req.body;
  if(!email|| !password){
      res.status(422).json({error:"fill all data"});
    }
  try{
      const userlogin=await USER.findOne({email:email});
      if(userlogin){
        const isMatch= await bcrypt.compare(password,userlogin.password);
        
        const token=await userlogin.generateAuthTokens();
         console.log(token);
        res.cookie("Neighbourkart", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly:true
      });

      if(!isMatch){
        res.status(400).json({error:"invalid detail"});
      }else{
        res.status(201).json(userlogin);
      }
    }else{
      res.status(415).json({error:"please signup first"});
    }

  }catch(error){
    res.status(400).json({error:"invalid detail"});
  }
});

router.post("/addcart/:id",authenticate,async(req,res)=>{
try{
  const {id}=req.params;
  const carts=await Products.findOne({id:id});
  console.log(carts+"cart value");
  const UserContact=await USER.findOne({_id:req.UserID});
  console.log(UserContact);
  if(UserContact){
    const addCarts=await UserContact.addtocarts(carts);
    await UserContact.save();
    console.log(addCarts);
    res.status(201).json(UserContact);
  }else{
    res.status(401).json({error:"invalid user"});
  }

}catch(error){
  res.status(401).json({error:"invalid user"});
}
  
});

router.get("/cartdetails",authenticate,async(req,res)=>{
  try{
      const buyuser=await USER.findOne({_id:req.UserID});
      res.status(201).json(buyuser);
  }catch(error){
    res.status(401).json({error:"buyuser not found"});
  }
})
router.get("/getvaliduser",authenticate,async(req,res)=>{
  try{
      const validuser=await USER.findOne({_id:req.UserID});
      res.status(201).json(validuser);
  }catch(error){
    res.status(401).json({error:"validuser not found"});
  }
});

router.delete("/remove/:id",authenticate,async(req,res)=>{
  try{
     const {id}=req.params;
     req.rootUser.carts=req.rootUser.carts.filter((curval)=>{
         return curval.id!=id;
     });
     req.rootUser.save();
     res.status(201).json(req.rootUser);
  }catch(error){
     console.log("error"+error);
     res.status(400).json(req.rootUser);
  }
});

router.get("/logout", authenticate, async (req, res) => {
  try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
          return curelem.token !== req.token
      });

      res.clearCookie("Neighbourkart", { path: "/" });
      req.rootUser.save();
      res.status(201).json(req.rootUser.tokens);
      console.log("user logout");

  } catch (error) {
      console.log(error + "jwt provide then logout");
  }
});


module.exports = router;
