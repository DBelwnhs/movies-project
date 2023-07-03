import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchValidation from "./SearchValidation";
import Modal from "react-modal";
import MovieDetailsPage from "./MovieDetailsPage";
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
    maxWidth: "600px",
    width: "90%",
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

const HomePage = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(8);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [featuredMovies, setFeaturedMovies] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchSubmit = (searchInput) => {
    const API_KEY = "85204a8cc33baf447559fb6d51b18313";

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        setSearchInput(searchInput);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = searchResults.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const Pagination = ({
    currentPage,
    moviesPerPage,
    totalMovies,
    onPageChange,
  }) => {
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    if (totalPages === 1) {
      return null;
    }

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-4">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const API_KEY = "85204a8cc33baf447559fb6d51b18313";

    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setFeaturedMovies(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search for movies</h1>
      <SearchValidation onSearch={handleSearchSubmit} />

      {searchResults.length === 0 && searchInput !== "" ? (
        <p className="text-center mt-4 text-lg bg-red-200">No results found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
            {currentMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg p-4 shadow-md max-w-xs my-4 cursor-pointer"
                onClick={() => handleMovieClick(movie.id)}
              >
                <Link to={`/movies/${movie.id}`}>
                  <h3 className="text-xl font-bold h-20">{movie.title}</h3>
                </Link>
                <p className="text-blue-400">
                  Vote Average: {movie.vote_average}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className="mt-3 min-w-full max-h-100 object-cover"
                />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            moviesPerPage={moviesPerPage}
            totalMovies={searchResults.length}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {searchResults.length === 0 && searchInput === "" && (
        <>
          <h2 className="text-2xl font-bold mt-8">Featured Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
            {featuredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg p-4 shadow-md max-w-xs my-4 cursor-pointer"
                onClick={() => handleMovieClick(movie.id)}
              >
                <Link to={`/movies/${movie.id}`}>
                  <h3 className="text-xl font-bold h-20">{movie.title}</h3>
                </Link>
                <p className="text-blue-400">
                  Vote Average: {movie.vote_average}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className="mt-3 min-w-full max-h-100 object-cover"
                />
              </div>
            ))}
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        {selectedMovieId && (
          <MovieDetailsPage movieId={selectedMovieId} closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default HomePage;