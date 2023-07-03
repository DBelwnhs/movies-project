import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CollectionContext } from "./CollectionContext";
import Modal from "react-modal";
import axios from "axios";

const MoviesCollectionsPage = () => {
  const { collections } = useContext(CollectionContext);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (collection) => {
    setSelectedCollection(collection);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCollection(null);
    setIsModalOpen(false);
  };

  const handleGetMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=85204a8cc33baf447559fb6d51b18313`
      );
      const movieDetails = response.data;
      console.log(movieDetails);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status); 
        console.log(error.response.data); 
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request); 
      } else {
        console.log("Error", error.message); 
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Movie Collections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="bg-white shadow-md p-4 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => openModal(collection)}
          >
            <h3 className="text-lg font-bold mb-2">{collection.title}</h3>
            <p className="text-gray-600">{collection.description}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Movie Details"
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
      >
        {selectedCollection && (
          <div className="bg-white p-4 rounded-lg max-w-4xl	w-4/5	overflow-scroll	">
            <h2 className="text-xl font-bold mb-4">{selectedCollection.title}</h2>
            <ul className="flex gap-10">
              {selectedCollection.movies.map((movie) => (
                <li
                  
                  key={movie.id}
                  onClick={() => handleGetMovieDetails(movie.id)}
                >
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="mb-2 max-w-xs	 "
                    />
                    <h4 className="text-lg font-bold">{movie.title}</h4>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Link
        to="/create-collection"
        className="block mt-4 text-center text-blue-500 hover:text-blue-700"
      >
        Create New Collection
      </Link>
    </div>
  );
};

export default MoviesCollectionsPage;