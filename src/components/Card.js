import React from 'react';
import './Card.css';

const Card = ({ movie, setSelectedMovie }) => {
  const handleMovieClick = () => {
    setSelectedMovie(movie);
    console.log('Selected movie:', movie); // Add this line to check if the correct movie is selected
  };

  const { title, overview, poster_path } = movie;
  const imageUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'path/to/placeholder/image.jpg';

  return (
    <div className="card" onClick={handleMovieClick}>
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-overview">{overview}</p>
      </div>
    </div>
  );
};

export default Card;
