import React, { useEffect } from 'react'
import Banner from './Banner';
import './home.css';
import Slide from './Slide';
import '../home/slide.css';
import { getProducts } from '../redux/actions/action';
import { useDispatch,useSelector } from 'react-redux';
const Maincomp = () => {
  const {products}=useSelector(state=>state.getproductsdata);
  // console.log(products);
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(getProducts());
  },[dispatch]);

  
  return (
    <div className='home_section'>
      <div className='banner_part'>
        <Banner />
      </div>
      <div>
        <div className='slide_part'>
          <div className='left_slide'>
            <Slide title="Deal of the day"/>
          </div>
          <div className='right_slide'>
            <h4>Festive latest launches</h4>
            <img src='https://rukminim1.flixcart.com/image/416/416/kl6wx3k0/sandwich-maker/8/r/d/sandwich-01-flipkart-smartbuy-original-imagydds4zthxt8z.jpeg?q=70' alt='festival' />
            <a href='#'>See more</a>

          </div>
        </div>

      </div>
      <Slide title="Today's Deal"/>
      <Slide title="Best Seller" />
      
     



    </div>
  )
}

export default Maincomp