import React from 'react';
import './MoviePopup.css';

const MoviePopup = ({ selectedMovie, setSelectedMovie }) => {
  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="popup">
      <div className="popup-content" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.poster_path})` }}>
        <button className="close-button" onClick={handleClosePopup}>X</button>
        <h2>{selectedMovie.title}</h2>
        <p>{selectedMovie.overview}</p>
        <div className="additional-info">
          <p>Release Date: {selectedMovie.release_date}</p>
          <p>Vote Average: {selectedMovie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default MoviePopup;
