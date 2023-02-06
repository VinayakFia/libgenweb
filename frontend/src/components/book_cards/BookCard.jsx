import React, { useEffect, useState } from "react";
import { BEURL } from "../..";

const genKey = () => Math.round(Math.random() * 99999999);
const DOWNLOAD_LINK = "https://libgen.rocks/ads.php?md5=";

const BookCard = ({ title, author, description, imageLinks }) => {
  const [link, setLink] = useState(null);
  const key = genKey();

  const fetchLink = (e) => {
    e.preventDefault();

    fetch(
      BEURL +
        "link?" +
        new URLSearchParams({
          query: title,
        })
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLink(res === undefined ? null : DOWNLOAD_LINK + res.md5);
      });
  };

  useEffect(() => {
    $('.collapse').collapse('hide');
    setLink(null);
  }, [title]);

  return (
    <div>
      <a
        className="btn text-left list-group-item d-flex p-0 bg-light"
        style={{ height: "15rem" }}
        data-toggle="collapse"
        role="button"
        href={`#linkExpand${key}`}
        aria-expanded="false"
        aria-controls={`linkExpand${key}`}
        onClickCapture={(e) => fetchLink(e)}
      >
        <img
          className="w-25 img-fluid"
          style={{ objectFit: "contain" }}
          src={
            imageLinks === undefined
              ? `https://source.unsplash.com/random/900×700/?${title}`
              : imageLinks.thumbnail
          }
          alt="Card image cap"
        />
        <div className="card-body w-75 overflow-auto">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle">{author}</h6>
          <p className="card-text">{description}</p>
        </div>
      </a>
      <div className="collapse" id={`linkExpand${key}`}>
        <div class="card card-body">
          <h5>Link:</h5>
          {link === null ? (
            <div class="spinner-border spinner-border-md m-1" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <a href={link}>{link}</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
