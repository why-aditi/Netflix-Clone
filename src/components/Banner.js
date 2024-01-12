import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";

const posterBaseUrl = "http://image.tmdb.org/t/p/original";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=007c61023456c077b1c602e15a90ef04"
      );
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    };
    fetchData();
  }, []);
  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "100% 100%",
        backgroundImage: `url(${posterBaseUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My list</button>
        </div>
      </div>
      <h1 className="banner_overview">{truncate(movie?.overview, 300)}</h1>
      <div className="banner_fadeBottom"></div>
    </div>
  );
}
