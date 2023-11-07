import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import ReadPosts from "./pages/ReadPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { Link } from "react-router-dom";
import { supabase } from "./client";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [posts, setPosts] = useState({
    id: "",
    title: "",
    author: "",
    description: "",
  });

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts} />,
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

  return (
    <div className="App">
      <div className="navbar">
        <ul className="navlinks">
          <li>
            <h5> HobbyHub</h5>
          </li>
          <li className="link">
            <Link to="/">
              <h6>Explore Feed</h6>
            </Link>
          </li>
          <li className="link">
            <Link to="/new">
              <h6> Create Post </h6>
            </Link>
          </li>
        </ul>
      </div>
      {element}
    </div>
  );
};

export default App;
