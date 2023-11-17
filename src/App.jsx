import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import ReadPosts from "./pages/ReadPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ViewPost from "./pages/ViewPost";

import { Link } from "react-router-dom";
import { supabase } from "./client";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [posts, setPosts] = useState({
    id: "",
    title: "",
    image_url: "",
    content: "",
  });

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: (
        <ReadPosts
          data={posts}
          filteredData={filteredResults}
          searchInput={searchInput}
        />
      ),
    },
    {
      path: "/view/:id",
      element: <ViewPost data={posts} />,
    },
    {
      path: "/edit/:id",
      element: <EditPost data={posts} />,
    },
    {
      path: "/new",
      element: <CreatePost />,
    },
  ]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("Posts").select();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const searchPosts = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      setSearchInput("");
      const filteredData = posts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(posts);
    }

    setSearchInput(searchValue);
  };

  return (
    <div className="App">
      <div className="navbar">
        <div className="site-title">
          <h5> Gaming Hub</h5>
        </div>

        <div>
          <input
            className="search-bar"
            type="text"
            name="title"
            placeholder="Search"
            onChange={(inputString) => searchPosts(inputString.target.value)}
          />
          <div></div>
        </div>

        <ul className="navlinks">
          <Link className="link" to="/">
            <li>
              <h6>Explore Feed</h6>
            </li>
          </Link>
          <li>
            <Link to="/new">
              <div className="create-post">
                <h6> Create Post</h6>
                {/* <img
                  className="create-post-icon"
                  src="src/assets/tabler-icon-message-plus.svg"
                /> */}
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {element}
    </div>
  );
};

export default App;
