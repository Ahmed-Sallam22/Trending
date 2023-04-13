import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MediaItem from '../MediaItem/MediaItem';



export default function Home() {

  const [Movies, setMovies] = useState([])
  const [Tv, setTv] = useState([])
  const [People, setPeople] = useState([])

  async function getTrending(mediaItem ,callBack){
    let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaItem}/week?api_key=680d2d9b8d27d0116e89b6a3a2853212`)
  callBack(data.results)
  console.log(data.results);
  }
  useEffect(()=>{
    getTrending('movie',setMovies)
    getTrending('tv',setTv)
    getTrending('person',setPeople)
    },[])

  return <>
  {Movies[0]?  
   <>
    <div className="row py-4">
      <div className="col-md-4 d-flex align-items-center just">
        <div >
      <div className='brdr w-25 mb-3'></div>
      <h2 className='h3'>Trending <br/>Movies <br />To Watch Now</h2>
      <p className='text-muted'>Most Watched Movies by Week</p>
      <div className='brdr w-100 mt-3'></div>
      </div>
        </div>
        {Movies.slice(0,10).map((movies ,index)=><MediaItem movies={movies} key={index}/>)}
    </div>
    <div className="row py-4">
      <div className="col-md-4  d-flex align-items-center just">
        <div >
      <div   className='brdr w-25 mb-3'></div>
      <h2 className='h3'>Trending <br/>Tv <br />To Watch Now</h2>
      <p className='text-muted'>Most Watched Tv by Week</p>
      <div className='brdr w-100 mt-3'></div>
      </div>
        </div>
        {Tv.slice(0,10).map((movies ,index)=><MediaItem movies={movies} key={index}/>)}
    </div>
    <div className="row py-4">
      <div className="col-md-4  d-flex align-items-center just">
        <div >
      <div className='brdr w-25 mb-3'></div>
      <h2 className='h3'>Trending <br/>People <br />To Watch Now</h2>
      <p className='text-muted'>Most Watched People by Week</p>
      <div className='brdr w-100 mt-3'></div>
      </div>
        </div>
        {People.slice(0,10).map((movies ,index)=><MediaItem movies={movies} key={index}/>)}
    </div>
    </>:<div className='d-flex vh-100 align-items-center justify-content-center'>
      <i className='fas fa-spinner fa-spin fa-8x'></i>
    </div>}

    </>
}
