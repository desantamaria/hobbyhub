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
    image_url: "",
    content: "",
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
          <Link className="link" to="/">
            <li>
              <h6>Explore Feed</h6>
            </li>
          </Link>
          <li>
            <Link to="/new">
              <div className="create-post">
                <h6> Create Post</h6>
                <img
                  className="create-post-icon"
                  src="src/assets/tabler-icon-message-plus.svg"
                />
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
