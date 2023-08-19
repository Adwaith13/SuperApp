import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./category.css";

export default function Category() {
  const [genres] = useState([
    {
      title: "Action",
      image: "/action.png",
      color: "#FF5209",
    },
    {
      title: "Drama",
      image: "/drama.png",
      color: "#D7A4FF",
    },
    {
      title: "Romance",
      image: "/romance.png",
      color: "#148A08",
    },
    {
      title: "Thriller",
      image: "/thriller.png",
      color: "#84C2FF",
    },
    {
      title: "Western",
      image: "/western.png",
      color: "#902500",
    },
    {
      title: "Horror",
      image: "/horror.png",
      color: "#7358FF",
    },
    {
      title: "Fantasy",
      image: "/fantasy.png",
      color: "#FF4ADE",
    },
    {
      title: "Music",
      image: "/music.png",
      color: "#E61E32",
    },
    {
      title: "Fiction",
      image: "/fiction.png",
      color: "#6CD061",
    },
  ]);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const[error,setError]=useState(false)
  
  const selectGenre = (genre) => {
    setSelectedGenres(prevSelectedGenres => {
      if (prevSelectedGenres.includes(genre)) {
        return prevSelectedGenres.filter(select => select !== genre);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
    setError(false)
  };

  const selected = (genre) => {
    return selectedGenres.includes(genre);
  };

  const deleteGenre= (genre) => {
    setSelectedGenres(prevSelectedGenres =>
      prevSelectedGenres.filter(selected => selected !== genre)
    );
  };

  const navigate=useNavigate()  

  const nextPage=()=>{
    if(selectedGenres.length < 3){
      setError(true)
    }
    else{
      setError(false)
      navigate('/homepage')
    }
  }
  localStorage.setItem('selected genres',JSON.stringify(selectedGenres))
  return (
    <div className="category-app">
      <h1 id="super-app">Super App</h1>
      <div className="text">
        <span id="page-text1">Choose your</span>
        <br></br>
        <span id="page-text2">entertainment</span>
        <br></br>
        <span id="page-text3">category</span>
      </div>
      {selectedGenres.length > 0 && (
        <div className="selected-genres">
            {selectedGenres.map((genre, i) => (
              <li key={i} id="genres-display">{genre.title} <img src="/remove.svg" id="remove-icon" alt="delete-icon" onClick={()=>deleteGenre(genre)}></img></li>
              ))}
        </div>
      )}
      <span id="genre-error">{error ?<img src="error.svg" alt="err" id="error-icon"/>:''}{error?'Minimum 3 category required':''}</span>

      <div className="container">
        {genres.map((genre, i) => (
          <div
            key={i}
            className={`card ${selected(genre) ? "selected" : ""}`}
            style={{ backgroundColor: genre.color }}
            onClick={() => selectGenre(genre)}
          >
            <h2 id="title">{genre.title}</h2>
            <img src={genre.image} alt="title-img" id="img" />
          </div>
        ))}
      </div>
      <button onClick={nextPage} id="button">Next Page</button>
    </div>
  );
}
