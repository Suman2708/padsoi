import React, { useContext, useEffect, useState } from 'react'
import '../cart/cart.css';
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
const Cart = () => {

    const {id}=useParams("");
  const history=useNavigate("");
    const[inddata,setInddata]=useState([]);
     const{account,setAccount}=useContext(Logincontext);

    const getindata=async()=>{
        const res=await fetch(`/productone/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
          const data=await res.json();
           console.log(data);
        if (res.status !== 201) {
            alert("no data available")
        } else {
            // console.log("ind mila hain");
            setInddata(data);
        }
    }

    useEffect(() => {
        setTimeout(getindata, 1000)
    }, [id]);

    const addToCart=async(id)=>{

        const checkres=await fetch(`/addcart/${id}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
                
            },
            body:JSON.stringify({
                inddata
            }),
            credentials:"include"
        });

        const data1=await checkres.json();
        console.log(data1);

        if(checkres.status===401 || !data1){
          alert("data invalid");
          console.log("data invalid");
        }else{
            alert("data is added to carts");
            history("/buynow");
            setAccount(data1);
        }

    }
 


    return (
        <div className='cart_section'>
          {inddata && Object.keys(inddata).length &&
            <div className='cart_container'>
                <div className='left_cart'>
                    <img src={inddata.url} alt='section' />
                    <div className='cart_btn'>
                        <button className='cart_btn1' onClick={()=>addToCart(inddata.id)}>Add to cart</button>
                        <button className='cart_btn2' >Buy now</button>
                    </div>
                </div>
                <div className='right_cart'>
                    <h3>{inddata.title.shortTitle}</h3>
                    <h4>{inddata.title.longTitle}</h4>
                    <Divider />
                    <p className="mrp">M.R.P. : <span>₹{inddata.price.mrp}</span></p>
                    <p>Deal of the day : <span style={{ color: '#B12704' }}>₹{inddata.price.cost}.00</span></p>
                    <p>You save : <span style={{ color: "#B12704" }}> ₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount}) </span></p>
                    <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{inddata.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{inddata.description}</span></p>
                    </div>
            </div>
          }
        </div>
    )
}

export default Cart