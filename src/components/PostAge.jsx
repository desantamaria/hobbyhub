import React from "react";
import "./PostAge.css";

const PostAge = (props) => {
  const originalDate = new Date(props.date);

  const currentDate = new Date();

  // Calculate the difference in years
  const ageInMilliseconds = currentDate - originalDate;
  const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
  const ageInMinutes = Math.floor(ageInSeconds / 60);
  const ageInHours = Math.floor(ageInMinutes / 60);
  const ageInDays = Math.floor(ageInHours / 24);
  const ageInYears = Math.floor(ageInDays / 365.25); // Accounting for leap years

  //   console.log(ageInHours);

  return <p className="PostAge">{ageInDays} days ago</p>;
};

export default PostAge;
