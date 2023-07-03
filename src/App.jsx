import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CollectionProvider } from "./CollectionContext";
import HomePage from "./HomePage";
import CollectionCreatePage from "./CollectionCreatePage";
import MoviesCollectionsPage from "./MoviesCollectionsPage";

const App = () => {
  return (
    <CollectionProvider>
      <Router>
        <nav className="bg-gray-300">
          <ul className="flex p-4">
            <li className="mr-4">
              <Link to="/" className="text-black hover:text-white">
                Home
              </Link>
            </li>
            <li className="mr-4">
              <Link to="/create-collection" className="text-black hover:text-white">
                Create Collection
              </Link>
            </li>
            <li>
              <Link to="/collections" className="text-black hover:text-white">
                Collections
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/create-collection"
            element={<CollectionCreatePage />}
          />
          <Route path="/collections" element={<MoviesCollectionsPage />} />
        </Routes>
      </Router>
    </CollectionProvider>
  );
};

export default App;
