import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CollectionContext } from "./CollectionContext";
import axios from "axios";

const CollectionCreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moviesInput, setMoviesInput] = useState("");
  const { addCollection } = useContext(CollectionContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("Please provide a title and description for the collection.");
      return;
    }

    const movies = moviesInput
      .split(",") 
      .map((movie) => movie.trim()) 
      .filter((movie) => movie !== "");

    const movieDetailsPromises = movies.map((movie) =>
      axios
        .get(`https://api.themoviedb.org/3/movie/${movie}?api_key=85204a8cc33baf447559fb6d51b18313`)
        .catch((error) => ({ error })) 
    );

    try {
      const movieDetailsResponses = await Promise.all(movieDetailsPromises);
      const movieDetails = movieDetailsResponses.map((response) => {
        if (response.error) {
          console.log(`Movie details for ID ${response.error.config.url} not found.`);
          return null; 
        }
        return response.data; 
      });

      const validMovieDetails = movieDetails.filter((details) => details !== null);
      const newCollection = {
        title,
        description,
        movies: validMovieDetails,
      };

      addCollection(newCollection);
      navigate("/collections", { movies: validMovieDetails }); 
    } catch (error) {
      console.log("Error retrieving movie details:", error);
      // Handle the error
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Collection</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="movies" className="block mb-2 font-medium">
            Movies
          </label>
          <input
            type="text"
            id="movies"
            value={moviesInput}
            onChange={(e) => setMoviesInput(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Enter movie titles or IDs separated by commas"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Collection
        </button>
      </form>
    </div>
  );
};

export default CollectionCreatePage;