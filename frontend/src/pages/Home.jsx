import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BookCardContainer from "../components/book_cards/BookCardContainer";

const Home = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <Navbar setData={setData} />
      <div className="alert alert-danger ml-5 mr-5 mt-5">This app may have faulty links, use at your own descretion</div>
      <BookCardContainer data={data} />
    </div>
  );
};

export default Home;
