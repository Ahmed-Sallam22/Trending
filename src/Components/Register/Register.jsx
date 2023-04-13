import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
  const notify = (mess,type) =>{ 
  toast[type](mess);
};
let Navigate=useNavigate ();
const [isloading, setisloading] = useState(false)
const [messageErrors,setmessageErrors] = useState('')

  async function handelRegesiter(values){ 
    setisloading(true);
  let {data}=await  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).then((data)=>{
    if(data.status === 201){
      notify('success','success')
      Navigate('/Login')    
    }
  }).catch((errors)=>{
    if(errors.response.status === 409){
      notify(errors.response.data.message,'error')
      setisloading(false);

    }
    console.log(errors);
  })
  }

  let validationSchema=Yup.object({
    name:Yup.string().required('name is required').min(3,'minimum name is 3 letters').max(20,'maximum name is 10 letters'),
    email:Yup.string().required('email is required').email('email invalid'),
    password:Yup.string().required('password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"password must have a Number , UperCase , LowerCase and not less than 8 "),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],"not matches"),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}/,'phone must be Egyptian Number')
  })

  let formik= useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema,
    onSubmit:handelRegesiter
  });




  return <>
  <div className="container">
<h3>Register Now</h3>
{messageErrors.length>0 ?<div className="alert alert-danger">{messageErrors}</div>:null}
<form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
<label htmlFor="name">name</label>
<input onChange={formik.handleChange} className='form-control mb-2' onBlur={formik.handleBlur} value={formik.values.name} name='name' id='name' type="text" />
{formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div>:null}


<label htmlFor="email">email</label>
<input onChange={formik.handleChange} className='form-control mb-2' onBlur={formik.handleBlur} value={formik.values.email} name='email' id='email' type="email" />
{formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}


<label htmlFor="password">password</label>
<input onChange={formik.handleChange} className='form-control mb-2' onBlur={formik.handleBlur} value={formik.values.password} name='password' id='password' type="password" />
{formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}


<label htmlFor="rePassword">rePassword</label>
<input onChange={formik.handleChange} className='form-control mb-2' onBlur={formik.handleBlur} value={formik.values.rePassword} name='rePassword' id='rePassword' type="password" />
{formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:null}


<label htmlFor="phone">phone</label>
<input onChange={formik.handleChange} className='form-control mb-2' onBlur={formik.handleBlur} value={formik.values.phone} name='phone' id='phone' type="tel" />
{formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:null}


  {isloading?  <button className='btn bg-primary mb-3 text-white' type='button'><i className='fas fa-spinner fa-spin'></i></button>:
   <button className='btn mb-4 btn-outline-primary text-white' type='submit'>Regisiter</button>
  }

</form>
<div className="col-md-8 mx-auto mb-2">
  <div className="brdr"></div>
<p id='priv' className='text-center text-muted m-3'>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className='text-decoration-none text-muted'> Privacy Policy </a> and <a href="https://policies.google.com/terms"  className='text-decoration-none text-muted'> Terms of Service </a> apply.</p>
  <div className="brdr"></div>
  <p className='text-center text-muted my-3'>Already a member?<Link className='text-decoration-none text-primary' to={'/login'}> Login <i class="so fa-solid fa-chevron-right fa-xs"></i></Link></p>
  </div>
  </div>
  </>
}
