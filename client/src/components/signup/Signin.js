import React, { useContext, useState } from 'react'
import '../signup/signup.css';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from '../context/Contextprovider';
const Signin = () => {
  
  const [data,setdata]=useState({
    email:"",
    password:""
  });
   

  const{account,setAccount}=useContext(Logincontext);
  const addData=(e)=>{
    
    const {name,value}=e.target;
     setdata(()=>{
        return{
            ...data,
            [name]:value
        }
     })
  };
 
const recievedata=async(e)=>{
    e.preventDefault();
    const {email,password}=data;
    const res=await fetch("/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,password
        })
    });

    const udata=await res.json();
   
    console.log(udata);

    if(res.status===400 || !udata){
        console.log("invalid details");
        toast.warning("invalid detail",{
          position:"top-center"
        })

    }else if(res.status===422){
      toast.warning("fill the data",{
        position:"top-center"
      })
    }else if(res.status===415){
      toast.warning("OOPs wrong data or Signup first",{
        position:"top-center"
      })
    }
    
    
    
    else{
      console.log('data added successfully');
      setdata({...data,email:"",password:""});
      toast.success(" successfully login",{
        position:"top-center"
      });
      setAccount(udata);
    }
     


}
 


  return (
   <section>
     <div className='sign_container'>
        <div className='sign_header'>
        <img  src='/nk.png'  alt='neighbourKartLogo'  />
         </div>
        <div className='sign_form'>
          <form method='POST' >
          <h1>Sign-In</h1>
          <div className='form_data'>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' id='email' onChange={addData}  value={data.email}  />
          </div>
          <div className='form_data'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password'  placeholder='At least 8 character' onChange={addData} value={data.password}/>
          </div>
          <button className='signin_btn' onClick={recievedata}  >
            continue
          </button>

          </form>
        </div>
        <ToastContainer />
        <div className='create_accountinfo'>
            <p>New to neighbourKart?</p>
          <NavLink to='/register'>
            <button>Create your neighbourKart account</button>
            </NavLink>
        </div>
     </div>  

   </section>
  )
}

export default Signin