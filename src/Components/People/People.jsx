import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';




export default function People() {

  const [People, setPeople] = useState([])
  let nums=new Array(10).fill(1).map((elem,index)=>index+1)
  let mediaType='person'

  async function getPeople(page){
    let {data}=await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=680d2d9b8d27d0116e89b6a3a2853212&language=en-US&page=${page}`)
  setPeople(data.results)
  }
  useEffect(()=>{
    getPeople(1)
    },[])

  return<>
  {People[0]?  
    <>
    
<div className="row pt-3">
{People.map((People,index)=>
  <div key={index} className="col-md-3">
  <Link className='text-decoration-none text-white' to={`/moviedetails/${People.id}/${mediaType}`}>
  <div className='position-relative scale' id='scale'>
      <img src={'https://image.tmdb.org/t/p/w500/'+People.profile_path} className='w-100' alt="" />
      <h3 className='h5 pt-2 pb-4 text-center'>{People.name}</h3>
  </div>
  </Link>
</div>  
)}
<nav className='py-5'>
 <ul className='pagination pagination-sm d-flex justify-content-center'>
 {nums.map((page)=><li key={page} onClick={()=>getPeople(page)} className='page-item p-1'>
 <Link className='page-link bg-transparent text-white'>
 {page}
 </Link>
 </li>) 
 }

 </ul>
</nav>
</div>
   
     </>:<div className='d-flex vh-100 align-items-center justify-content-center'>
       <i className='fas fa-spinner fa-spin fa-8x'></i>
     </div>}
 
     </>
}



