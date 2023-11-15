import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const ReadPosts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.data);
  }, [props]);

  return (
    <div className="ReadPosts">
      <div className="dropdown-container">
        <div className="dropdown">
          <button className="dropbtn">Sort By</button>
          <div className="dropdown-content">
            <p className="dropdown-option">Date Created</p>
            <p className="dropdown-option">Likes</p>
          </div>
        </div>
      </div>
      <div className="posts-container">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <Card
              key={post.id}
              id={post.id}
              created_at={post.created_at}
              title={post.title}
              image_url={post.image_url}
              content={post.content}
              upvotes={post.upvotes}
            />
          ))
        ) : (
          <h2>{"No Posts Yet"}</h2>
        )}
      </div>
    </div>
  );
};

export default ReadPosts;
