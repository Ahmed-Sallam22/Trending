import React from 'react'
import { Link } from 'react-router-dom'


export default function MediaItem(movies) {
  return <>
  <div className="col-md-2">
    <Link className='text-decoration-none text-white' to={`/moviedetails/${movies.movies.id}/${movies.movies.media_type}`}>
    <div className='position-relative scale'id='scale'>
        {movies.movies.poster_path?        <img src={'https://image.tmdb.org/t/p/w500/'+movies.movies.poster_path} className='w-100' alt="" />
        :        
        <img src={'https://image.tmdb.org/t/p/w500/'+movies.movies.profile_path} className='w-100' alt="" />
}
        <h3 className='h5 pt-2 pb-4 text-center'>{movies.movies.title} {movies.movies.name}</h3>

        {movies.movies.vote_average?  <div className="vote position-absolute top-0 end-0 p-1">{movies.movies.vote_average.toFixed(1)}</div>
        :
        <div className="vote position-absolute top-0 end-0 p-1">{movies.movies.popularity.toFixed(1)}</div>}
    </div>
    </Link>
  </div>
  </>
}
