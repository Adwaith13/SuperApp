import React, { useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TimerComponent from "./TimerComponent";

export default function Homepage() {
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const weatherapiURL =
      "https://api.weatherapi.com/v1/forecast.json?key=88ed971ebc3944fa82c134455231808&q=Mumbai&days=1&aqi=no&alerts=yes";
    axios
      .get(weatherapiURL)
      .then((response) => {
        setWeather(response.data.current);
      })
      .catch((error) => {
        alert("something is wrong");
      });

    const newsApi =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b3bdb1f3b04f424c920a5ded32e3c3ec";
    axios
      .get(newsApi)
      .then((response) => {
        const randomNews = Math.floor(
          Math.random() * response.data.articles.length
        );
        setNews(response.data.articles[randomNews]);
      })
      .catch((error) => {
        alert("something wrong");
      });
  }, []);

  const localStorageGenredata = localStorage.getItem("selected genres");
  const jsonparse = JSON.parse(localStorageGenredata);
  const genreTitle = jsonparse.map((genre) => genre.title);

  const localStorageData = localStorage.getItem("values");
  const valuesObject = JSON.parse(localStorageData);

  const name = valuesObject.name;
  const username = valuesObject.username;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const date = `${month}-${day}-${year}`;
  const time = `${hours}:${minutes} ${ampm}`;

  const[text,setText]=useState('')
  const textChangeHandle=(e)=>{
    const textchange=e.target.value;
    localStorage.setItem('textarea',textchange)
    setText(textchange)
  }
  console.log(text)

  const navigate=useNavigate();
  const btnHandle=()=>{
    navigate('/browse')
  }

  return (
    <>
      <div className="news">
          <img src={news.urlToImage} alt="News Article" id="news-img" />
          <div className="news-title-display">
            <p id='title'>{news.title}</p>
            <br></br>
            <p>{news.publishedAt}</p>
          </div>
          <div className="news-display">
            <p>{news.description}</p>
          </div>
      </div>

      <div className="text-area">
        <h1 id="notes-head">All Notes</h1>
        <textarea id="textarea" rows="33" cols="50" onChange={textChangeHandle} style={{ overflowY: 'auto' }}></textarea>
      </div>

      <div className="user-card">
        <img src="/profile.png" alt="user-profile" id="profile-icon"></img>
        <p id="user-name">{name}</p>
        <p id="user-email">{localStorage.getItem("email")}</p>
        <p id="user-username">{username}</p>
        <div className="genres">
        {genreTitle.map((title,index) => (
        <span key={index} id='user-genre'>{title}</span>
      ))}
        </div>
      </div>

      {weather && (
        <div className="weather">
          <div className="date-time">
            <p id="current-date">
              {date} {time}
            </p>
          </div>
          <div className="weather-data">
            <img
              src={weather.condition.icon}
              alt="Weather Icon"
              id="weather-icon"
            />
            <p id="weather-condition">{weather.condition.text}</p>
            <span id="horizontal-line-1"></span>
            <p id="temperature">{weather.temp_c}°C</p>
            <img
              src="/pressure.svg"
              alt="pressure-icon"
              id="pressure-icon"
            ></img>
            <p id="wind-pressure">{weather.pressure_mb} mbar</p>
            <span id="pressure">Pressure</span>
            <span id="horizontal-line-2"></span>
            <img
              src="/windspeed.svg"
              alt="wind-speed-icon"
              id="wind-icon"
            ></img>
            <p id="wind-speed">{weather.wind_kph} km/h Wind</p>
            <img
              src="/humidity.svg"
              alt="humidity.svg"
              id="humidity-icon"
            ></img>
            <p id="humidity-data"> {weather.humidity} %</p>
            <br />
            <span id="humidity">Humidity</span>
          </div>
        </div>
      )}
      <TimerComponent></TimerComponent>
      <button id="browse-btn" onClick={btnHandle}>Browse</button>
    </>
  );
}
