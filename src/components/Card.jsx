import React from "react";
import { useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import PostAge from "./PostAge";

const Card = (props) => {
  const [count, setCount] = useState(props.upvotes);

  const originalDate = new Date(props.created_at);

  const currentDate = new Date();

  // Calculate the difference in years
  const ageInMilliseconds = currentDate - originalDate;
  const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
  const ageInMinutes = Math.floor(ageInSeconds / 60);
  const ageInHours = Math.floor(ageInMinutes / 60);
  const ageInDays = Math.floor(ageInHours / 24);
  const ageInYears = Math.floor(ageInDays / 365.25); // Accounting for leap years

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
          <PostAge date={props.created_at} />
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
