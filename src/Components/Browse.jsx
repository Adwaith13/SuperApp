import React, { useEffect, useState } from "react";
import axios from "axios";
import random from "lodash";
import { useNavigate } from "react-router-dom";
import "./browse.css"

export default function Browse() {
  const [movie, setMovie] = useState(null);
  const localStorageGenredata = localStorage.getItem("selected genres");
  const jsonparse = JSON.parse(localStorageGenredata);
  const titles = jsonparse.map((genre) => genre.title);
  
  useEffect(() => {    
  const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  params: {
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc',
    genre:`${titles}`
  },
  headers: {
    accept: 'application/json',
    Authorization:process.env.REACT_APP_API_KEY,
  }
};

    axios
      .request(options)
      .then((res) => {
        setMovie(res.data.results)
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const movies=random.sampleSize(movie,4)

  const navigate=useNavigate();
  const homepageNavigate=()=>{
    navigate('/category')
  }

  return(
    <>
    <h1 id="browse-head">Super App</h1>
    <p id="browse-para">Entertainment according to your choice</p>
    <div className="titles">
      {titles.map((title,index) => (
        <span key={index} id="genre-title">{title}</span>
      ))}
    </div>
    <div className="movies">
    {movies.map((movie, index) => (
        <div id="poster" key={index}>
          <img id="movie-poster"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
      ))}
    </div>
    <button id="homepage-btn" onClick={homepageNavigate}>HomePage</button>

    </>
  )
}
