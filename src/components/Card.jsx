import React from "react";
import { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const Card = (props) => {
  const [count, setCount] = useState(props.upvotes);

  const updateCount = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .update({ upvotes: count + 1 })
      .eq("id", props.id);

    setCount((count) => count + 1);
  };

  return (
    <Link to={"edit/" + props.id}>
      <div className="Card">
        <div className="card-text">
          <p className="timestamp">{"Posted: " + props.created_at}</p>
          <h2 className="title">{props.title}</h2>
        </div>

        <img className="card-img" src={props.image_url} />
        <button className="upvotes" onClick={updateCount}>
          <img
            className="create-post-icon"
            src="src/assets/tabler-icon-thumb-up.svg"
          />{" "}
          {count}
        </button>
      </div>
    </Link>
  );
};

export default Card;
