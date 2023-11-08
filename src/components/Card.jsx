import React from "react";
import { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const Card = (props) => {
  console.log(props);

  return (
    <Link to={"edit/" + props.id}>
      <div className="Card">
        <p className="timestamp">{"Posted: " + props.created_at}</p>
        <h2 className="title">{props.title}</h2>
        {/* <h3 className="author">{"by " + props.author}</h3> */}
      </div>
    </Link>
  );
};

export default Card;
