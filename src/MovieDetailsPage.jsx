import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "./styles.css";

Modal.setAppElement("#root");

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
};

const MovieDetailsPage = ({ movieId, closeModal }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const API_KEY = "85204a8cc33baf447559fb6d51b18313";

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [movieId]);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  const {
    title,
    overview,
    poster_path,
    budget,
    release_date,
    revenue,
    vote_average,
    vote_count,
    spoken_languages,
  } = movieDetails;

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      style={modalStyles}
      contentLabel="Movie Details"
    >
      <div className="flex">
        <div className="mr-4 flex justify-center items-center">
          <img
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            alt={title}
            className="max-h-full w-auto"
          />
        </div>
        <div className="w-3/4 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p>{overview}</p>
          <div className="flex mt-6 justify-start gap-10">
            <div>
              <p>Budget: ${budget}</p>
              <p>Release Date: {release_date}</p>
              <p>Revenue: ${revenue}</p>
            </div>
            <div>
              <p>Vote Average: {vote_average}</p>
              <p>Vote Count: {vote_count}</p>
              <p>
                Spoken Languages:{" "}
                {spoken_languages.map((language) => language.name).join(", ")}
              </p>
            </div>
            

            
          </div>
        </div>
      </div>
    </Modal>
  );
};

MovieDetailsPage.propTypes = {
  movieId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default MovieDetailsPage;