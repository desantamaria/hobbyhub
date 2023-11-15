import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const ReadPosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setPosts(props.data);
    setFilteredResults(props.filteredData);
  }, [props]);

  const sortByDate = () => {
    const sortedFilteredResults = [...filteredResults].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    const sortedPosts = [...posts].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    setFilteredResults(sortedFilteredResults);
    setPosts(sortedPosts);
  };

  const sortByLikes = () => {
    const sortedFilteredResults = [...filteredResults].sort(
      (a, b) => b.upvotes - a.upvotes
    );

    const sortedPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes);

    setFilteredResults(sortedFilteredResults);
    setPosts(sortedPosts);
  };

  return (
    <div className="ReadPosts">
      <div className="dropdown-container">
        <div className="dropdown">
          <button className="dropbtn">Sort By</button>
          <div className="dropdown-content">
            <p className="dropdown-option" onClick={sortByDate}>
              Date Created
            </p>
            <p className="dropdown-option" onClick={sortByLikes}>
              Likes
            </p>
          </div>
        </div>
      </div>
      <div className="posts-container">
        {posts && posts.length > 0 ? (
          props.searchInput.length > 0 && filteredResults.length > 0 ? (
            filteredResults.map((post, index) => (
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
          )
        ) : (
          <h2>{"No Posts Yet"}</h2>
        )}
      </div>
    </div>
  );
};

export default ReadPosts;
