import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const Right = ({iteam}) => {



  
        const [price, setPrice] = useState(0);
    
        useEffect(() => {
            totalAmount();
        }, [iteam]);
    
        const totalAmount = () => {
            let price = 0
            iteam.map((item) => {
                price += item.price.cost
            });
            setPrice(price)
        }

        const checkoutHandler=async(price)=>{
            const { data: { key } } = await axios.get("/getkey");
            const { data: { order } } = await axios.post("/checkout", {
                price
            })
        //     const res= await fetch("/checkout",{
        //         method:"POST",
        //         headers:{
        //          "Content-Type":"application/json"
        //         },
        //         body:JSON.stringify({
        //            price
        //         })
        //    });

        //    const order=res.json();
        //   console.log(order.amount);
            

           const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Kaushal kumar sahani",
            description: "Tutorial of RazorPay",
            image: "./k.png",
            order_id: order.id,
            callback_url: "/paymentverication",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#a7f38b"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
        

           
    }
        
        
  return (
    <div className="right_buy">
            <img src="nk.png" alt="rightimg" />
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                <h3>Subtotal ({iteam.length} items): <span style={{ fontWeight: "700" }}> ₹{price}.00</span></h3>
                <button className="rightbuy_btn" onClick={()=>checkoutHandler(price)} >Proceed to Buy</button>
                <div className="emi" >
                    Emi available
                    
                </div>
                <span className= "show" > Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
                    Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
            </div>
        </div>
  )
}

export default Right
