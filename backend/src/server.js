import libgen from "libgen";
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;
const MIRROR = "http://libgen.is";

const search = async (options) => {
  try {
    const data = (await libgen.search(options))[0];
    return JSON.stringify(data);
  } catch (err) {
    console.error(err);
  }
};

app.get("/", (req, res) => {
  res.send(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});

/**
 * @param: query: string
 * @param: count: number, num results, used for pagination
 * @param: offset: number, offset of results, used for pagination
 */
app.get("/search", async (req, res) => {
  let { query, count, offset, sort_by } = req.query;

  console.log("parsing request /search?query=" + query);

  fetch(
    "https://www.googleapis.com/books/v1/volumes?" +
      new URLSearchParams({
        q: query,
        startIndex: offset,
        maxResults: count,
      })
  )
    .then((res) => res.json())
    .then(({ items }) =>
      items.map((item) => {
        return {
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          pages: item.volumeInfo.pages,
          imageLinks: item.volumeInfo.imageLinks,
        };
      })
    )
    .then((data) => res.status(200).send(data));
});

/**
 * @param: query: string
 */
app.get("/link", async (req, res) => {
  let { query } = req.query;

  console.log("parsing request /link?query=" + query);

  const options = {
    mirror: MIRROR,
    query: query,
    count: 1,
  };

  search(options).then((data) => res.status(200).send(data));
});

// Server setup
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
