import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewPost.css";
import { Link } from "react-router-dom";
import PostAge from "../components/PostAge";
import { supabase } from "../client";

const ViewPost = ({ data }) => {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (Array.isArray(data)) {
      const postByID = data.find((item) => item.id === id);
      if (postByID) {
        setPost(postByID);
        setCount(postByID.upvotes);
        console.log(postByID.upvotes);
      }
    } else {
      setPost({
        title: "",
        content: "",
        image_url: "",
        created_at: "",
        upvotes: "",
      });
      setCount(0);
    }
  }, [data, id]);

  const updateCount = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .update({ upvotes: count + 1 })
      .eq("id", post.id);

    setCount((count) => count + 1);
  };

  return (
    <div className="ViewPost">
      <Link to="/">
        <button className="go-back">Go Back</button>
      </Link>
      <Link to={"../edit/" + id}>
        <div className="view-card">
          <div className="view-card-header">
            <div>
              <PostAge date={post.created_at} />
              <h2 className="title">{post.title}</h2>
            </div>
            <button className="view-upvotes" onClick={updateCount}>
              <img
                className="create-post-icon"
                src="../src/assets/tabler-icon-thumb-up.svg"
              />{" "}
              {count}
            </button>
          </div>
          <div className="view-card-img-container">
            <img className="view-card-img" src={post.image_url} />
          </div>

          <div>
            <p>{post.content}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ViewPost;
