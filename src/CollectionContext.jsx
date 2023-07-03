import React, { createContext, useState } from "react";

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  const addCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
  };

  const addMovieToCollection = (collectionId, movie) => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            movies: [...collection.movies, movie],
          };
        }
        return collection;
      })
    );
  };

  return (
    <CollectionContext.Provider
      value={{ collections, addCollection, addMovieToCollection }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
