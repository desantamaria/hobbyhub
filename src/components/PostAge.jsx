import React, { useEffect, useState } from "react";
import "./PostAge.css";

const PostAge = (props) => {
  const [postAge, setPostAge] = useState("");

  const originalDate = new Date(props.date);
  const currentDate = new Date();

  // Calculate the difference in years
  const ageInMilliseconds = currentDate - originalDate;
  const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
  const ageInMinutes = Math.floor(ageInSeconds / 60);
  const ageInHours = Math.floor(ageInMinutes / 60);
  const ageInDays = Math.floor(ageInHours / 24);
  // const ageInYears = Math.floor(ageInDays / 365.25); // Accounting for leap years

  useEffect(() => {
    if (ageInDays < 1) {
      setPostAge(`${ageInHours} hours ago`);
    } else if (ageInHours < 1) {
      setPostAge(`${ageInMinutes} minutes ago`);
    } else {
      setPostAge(`${ageInDays} days ago`);
    }

    if (ageInDays > 30) {
      setPostAge(`${Math.floor(ageInDays / 30)} months ago`);
    }
  }, [ageInDays, ageInHours, ageInMinutes]);

  return <p className="PostAge">{postAge}</p>;
};

export default PostAge;
