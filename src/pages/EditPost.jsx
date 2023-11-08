import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditPost.css";
import { supabase } from "../client";

const EditPost = ({ data }) => {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (Array.isArray(data)) {
      const postByID = data.find((item) => item.id === id);
      if (postByID) {
        setPost(postByID);
      }
    } else {
      setPost({ title: "", author: "", description: "" });
    }
  }, [data, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    console.log(post);
  };

  // UPDATE post
  const updatePost = async (event) => {
    event.preventDefault();

    await supabase
      .from("Posts")
      .update({
        title: post.title,
        author: post.author,
        description: post.description,
      })
      .eq("id", id);

    window.location = "/";
  };

  // DELETE post
  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from("Posts").delete().eq("id", id);

    window.location = "http://localhost:5173/";
  };

  return (
    <div className="EditPost">
      <form>
        <label htmlFor="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="author">Author</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          defaultValue={post.author}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          defaultValue={post.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <input type="submit" value="Submit" onClick={updatePost} />
        <button className="deleteButton" onClick={deletePost}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditPost;
