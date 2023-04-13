import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  let {id ,mediaType}=useParams();
  const [Details, setDetails] = useState({})
async function getDetails(id ,mediaType){
  let {data}=await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=680d2d9b8d27d0116e89b6a3a2853212&language=en-US'`)
 setDetails(data)
 console.log(data);
}
useEffect(()=>{
  getDetails(id,mediaType)
},[])

  return<>
  <div className="row pt-4">
    <div className="col-md-4">
    {Details.poster_path?        <img src={'https://image.tmdb.org/t/p/w500/'+Details.poster_path} className='w-100' alt="" />
        :        
        <img src={'https://image.tmdb.org/t/p/w500/'+Details.profile_path} className='w-100' alt="" />
}
       
    </div>
    <div className="col-md-8 d-flex align-items-center">
      <div className="col-md-8 ">
    <h2 className='h2 pt-2 pb-4 text-center text-warning'>{Details.title} {Details.name}</h2>
    <p className=' pt-2 my-3 text-info'>{Details.overview} {Details.biography}</p>
    {Details.status?<h4 className='text-success'>status  : {Details.status}</h4>:""}
    {Details.birthday?<h4 className='text-success'>birthday  : {Details.birthday}</h4>:""}
    {Details.vote_average?<h4 className='text-success'>Vote Avreage : {Details.vote_average.toFixed(1)}</h4>:""}
    {Details.vote_count?<h4 className='text-success'>Vote count : {Details.vote_count.toFixed(1)}</h4>:""}
    {Details.popularity?<h4 className='text-success'>popularity : {Details.popularity.toFixed(1)}</h4>:""}

    </div>
    </div>
  </div>
  </>


}
