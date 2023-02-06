import React, { useState } from "react";
import { BEURL } from "..";

const Navbar = ({ setData }) => {
  // NOTE: when searching use .toLower() for all options
  const [searchIn, setSearchIn] = useState("Search In");
  const [sortBy, setSortBy] = useState("Sort By");
  const [query, setQuery] = useState("");

  const submitSearch = async (e) => {
    e.preventDefault();

    if (query.length < 3) {
      $(".toast").toast("show");
      return;
    }

    fetch(
      BEURL +
        "search?" +
        new URLSearchParams({
          query: query,
          count: 10,
          offset: 0,
        })
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand">LIBGENWEB</a>

        <div className="collapse navbar-collapse">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn btn-primary my-2 my-sm-0"
              type="submit"
              onClick={(e) => submitSearch(e)}
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      <div
        className="toast position-absolute"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header bg-danger text-light">
          <h2>INVALID SEARCH</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// ! DEPRECATED
/*
<ul className="navbar-nav mr-auto">
            <li className="btn btn-secondary dropdown">
              <a
                className="dropdown-toggle "
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {searchIn}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item btn"
                  onClick={() => setSearchIn("Title")}
                >
                  Title
                </a>
                <a
                  className="dropdown-item btn"
                  onClick={() => setSearchIn("Author")}
                >
                  Author
                </a>
                <a
                  className="dropdown-item btn"
                  onClick={() => setSearchIn("Series")}
                >
                  Series
                </a>
                <a
                  className="dropdown-item btn"
                  onClick={() => setSearchIn("Search In")}
                >
                  Any
                </a>
              </div>
            </li>
          </ul>

          <ul className="navbar-nav mr-3">
            <li className="nav-item dropdown">
              <a
                className="dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {sortBy}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item btn"
                  onClick={() => setSortBy("Relevance")}
                >
                  Relevance
                </a>
                <a
                  className="dropdown-item btn"
                  onClick={() => setSortBy("Title")}
                >
                  Title
                </a>
                <a
                  className="dropdown-item btn"
                  onClick={() => setSortBy("Year")}
                >
                  Year
                </a>
              </div>
            </li>
          </ul>
*/
