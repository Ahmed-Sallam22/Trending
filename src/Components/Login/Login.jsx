import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';


export default function Login({saveUserData}) {
  const notify = (mess,type) =>{ 
    toast[type](mess);
  };
let Navigate=useNavigate ();
const [isloading, setisloading] = useState(false)
const [messageErrors,setmessageErrors] = useState('')

  async function handelRegesiter(values){ 
    setisloading(true);
  let { data } =await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).then((data)=>{
  if(data.status === 200){
      localStorage.setItem('userToken', data.data.token)
      saveUserData()
      setisloading(false);
      notify('success','success')
      Navigate('/')    
    }
  }).catch((errors)=>{
    if(errors.response.status === 401){
      notify(errors.response.data.message,'error')
      setisloading(false);
    }
    console.log(errors);
  })
  }

  let validationSchema=Yup.object({
    email:Yup.string().required('email is required').email('email invalid'),
    password:Yup.string().required('password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"password Invalid"),
  })

  let formik= useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema,
    onSubmit:handelRegesiter
  });
  function forget()
  {
    notify('اعمل حساب معلش','warning')
  }




  return <>
  <div className="container">
<h3>Login Now</h3>
{messageErrors.length>0 ?<div className="alert alert-danger">{messageErrors}</div>:null}
<form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>


<label htmlFor="email">email</label>
<input onChange={formik.handleChange} className='form-control mb-2' onBlur={formik.handleBlur} value={formik.values.email} name='email' id='email' type="email" />
{formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}


<label htmlFor="password">password</label>
<input onChange={formik.handleChange} className='form-control mb-2' onBlur={formik.handleBlur} value={formik.values.password} name='password' id='password' type="password" />
{formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}



  {isloading?  <button className='btn bg-primary text-white mb-3' type='button'><i className='fas fa-spinner fa-spin'></i></button>:
   <button  className='btn btn-outline-primary text-white mb-3' type='submit'>Login</button>
  }

</form>
<div className="col-md-8 mx-auto mb-2">
  <div className="brdr"></div>
  <p className='text-center pt-2 text-decoration-underline text-primary cursor' onClick={forget}>Forget Password</p>
  <p className='text-center text-muted my-3'> Not a member yet? <Link className='text-decoration-none text-primary' to={'/register'}>  Create Account <i class="so fa-solid fa-chevron-right fa-xs"></i></Link></p>
  </div>
  </div>
  </>
}
