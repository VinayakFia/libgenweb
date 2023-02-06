import React from "react";
import BookCard from "./BookCard";

const CardContainer = ({ data }) => {
  //console.log(genKey())

  return (
    <div className="list-group justify-content-between ml-5 mr-5">
      {data.map((item) => (
        <BookCard
          title={item.title}
          author={item.author}
          description={item.description}
          imageLinks={item.imageLinks} 
        />
      ))}
    </div>
  );
};

export default CardContainer;
