import React, { useEffect, useState } from "react";
import axios from "axios";
import random from "lodash";
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
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDA3NzkxNzk2NzU3YmMzMzVkMzA5NDRlODk2ZGNkMiIsInN1YiI6IjY0ZTQ3NjJhYzNjODkxMDBjNjgwY2Q1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GOVuj74nun9U9vVbFKErnNBz_xqCLe8QuZU3BsjZYC0'
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
    axios
      .request(options)
      .then((res) => {
        console.log(res.data.results);
        setMovie(res.data.results)
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const movies=random.sampleSize(movie,4)

  return(
    <>
    <h1 id="browse-head">Super App</h1>
    <p id="browse-para">Entertainment according to your choice</p>
    <span id="genre-title">
      {titles.map((title,index) => (
        <p key={index}>{title}</p>
      ))}</span>
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

    </>
  )
}
