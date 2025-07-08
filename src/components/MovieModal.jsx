import React, { useEffect, useState } from "react";
import "./Modal.css";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/movie/${movieId}`,
          API_OPTIONS
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/movie/${movieId}/videos`,
          API_OPTIONS
        );
        const data = await res.json();
        const trailer = data.results.find(
          video => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Failed to fetch trailer", err);
      }
    };

    fetchMovieDetails();
    fetchMovieTrailer();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img
          className="modal-poster"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/No-Poster.png"
          }
          alt={movie.title}
        />
        <div className="modal-details">
          <h2>{movie.title}</h2>
          <p className="modal-overview">{movie.overview}</p>
          <p>
            <strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}
          </p>
          <p>
            <strong>Release:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
          </p>

          {trailerKey && (
            <div className="trailer-container">
              <h3 className="trailer-heading">Watch Trailer</h3>
              <iframe
                className="trailer-video"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
              />
            </div>
          )}
        </div>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
