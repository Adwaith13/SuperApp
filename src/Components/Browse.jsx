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
      method: "GET",
      url: "https://ott-details.p.rapidapi.com/advancedsearch",
      params: {
        genre: `${titles}`,
        type: "movie",
      },
      headers: {
        "X-RapidAPI-Key": "f6fc683e1bmshe738e6d6a53df25p159b6ejsn1cc2621a2f86",
        "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => {
        console.log(res.data.results);
        setMovie(res.data.results)
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
            src={movie.imageurl}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
      ))}
    </div>

    </>
  )
}
