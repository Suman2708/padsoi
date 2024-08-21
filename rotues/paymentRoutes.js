const express= require("express") ;
const {
    checkout,
    paymentVerification,
  }=require("../controllers/paymentController.js") ;
  

const router = express.Router();



export default router;