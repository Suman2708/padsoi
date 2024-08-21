import React, { useState } from 'react'
import '../signup/signup.css'
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {

  const [data,setdata]=useState({
    name:"",
    email:"",
    mobile_no:"",
    password:"",
    confirm_password:""
  });
  
  const addData=(e)=>{

    const {name,value}=e.target;

    setdata(()=>{
        return{
          ...data,
          [name]:value
        }
    })
  };
  console.log(data);
 
  const sendData=async(e)=>{
      e.preventDefault();
      const{name,email,mobile_no,password,confirm_password}=data;
      const res= await fetch("/register",{
           method:"POST",
           headers:{
            "Content-Type":"application/json"
           },
           body:JSON.stringify({
            name,email,mobile_no,password,confirm_password 
           })
      });
      const userdata=res.json();
      console.log(userdata);
      if(res.status===422 ||!userdata){
        // alert("error");
        toast.warning("invalid detail",{
          position:"top-center"
        })
      }else{
        // alert("data successfully submited");

        toast.success("data successfully added",{
          position:"top-center"
        })
        setdata({...data,name:"",email:"",mobile_no:"",password:"",confirm_password:""});
      }
  }

  return (
    <section>
     <div className='sign_container'>
        <div className='sign_header'>
        <img  src='/nk.png'  alt='neighbourKartLogo'  />
         </div>
        <div className='sign_form'>
          <form  method='POST'>
          <h1>Create account</h1>
          <div className='form_data'>
            <label htmlFor='name'>Your name</label>
            <input type='text' name='name' id='name'  onChange={addData} value={data.name} />
          </div>
          <div className='form_data'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email'  placeholder='At least 8 character' onChange={addData} value={data.email}/>
          </div>
          
          <div className='form_data'>
            <label htmlFor='mobile_no'>Mobile no</label>
            <input type='number' name='mobile_no' id='mobile_no'  onChange={addData} value={data.mobile_no}/>
          </div>
          <div className='form_data'>
            <label htmlFor='mobile_no'>password</label>
            <input type='password' name='password' id='password'  placeholder='At least 8 character' onChange={addData} value={data.password}/>
          </div>
          <div className='form_data'>
            <label htmlFor='mobile_no'>confirm password</label>
            <input type='password' name='confirm_password' id='confirm_password'  placeholder='At least 8 character' onChange={addData} value={data.confirm_password}/>
          </div>
          <button className='signin_btn' onClick={sendData}>
            continue
          </button>

          </form>
        </div>
        <ToastContainer />
        <div className='signin_info'>
            <p>Already have a account?<NavLink to='/login'>sign in</NavLink></p>
        </div>
        
     </div>  

   </section>
  )
}

export default Signup