import React, { useEffect, useState } from 'react'
import '../buynow/buynow.css'
import { Divider } from '@mui/material'
import Option from './Option'
import Subtotal from './Subtotal'
import Right from './Right'
const Buynow = () => {


  const [cartdata, setCartdata] = useState("");
  // console.log(cartdata.length);

  const getdatabuy = async () => {
      const res = await fetch("/cartdetails", {
          method: "GET",
          headers: {
              Accept:"application/json",
              "Content-Type": "application/json"
          },
          credentials:"include"
      });

      const data = await res.json();
      // console.log(data.carts);

      if (res.status !== 201) {
          alert("no data available")
      } else {
          // console.log("data cart main hain");
          setCartdata(data.carts);
          console.log(cartdata);
      }
  };



  useEffect(() => {
      getdatabuy();
  }, []);


  return (
    <>
    {cartdata.length ? <div className='buynow_section'>
        <div className='buynow_container'>
          <div className='left_buy'>
            <h1>Shopping Cart</h1>
            <p>select all items</p>
            <span className='leftbuyprice'>
              Price
            </span>
            <Divider />

            {cartdata.map((e, k) => {
              return (
                <>
                  <div className='item_containert'>
                    <img src={e.detailUrl} />
                    <div className='item_details'>
                      <h3>{e.title.longTitle}</h3>
                      <h3>{e.title.shortTitle}</h3>
                      <h3 className="diffrentprice">₹{e.price.cost}.00</h3>
                      <p className="unusuall">Usually dispatched in 8 days.</p>
                      <p>Eligible for FREE Shipping</p>
                      <Option deletedata={e.id} get={getdatabuy}/>

                    </div>
                    <h3 className="item_price">{e.price.cost}.00</h3>
                  </div>
                  <Divider />
                </>
              )
            })}

            <Divider />
            <Subtotal iteam={cartdata}/>

          </div>
          <Right iteam={cartdata}/>
        </div>
      </div> :""}
     
     
    </>
  )
}

export default Buynow