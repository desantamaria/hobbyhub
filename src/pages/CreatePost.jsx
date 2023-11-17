import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../client";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    image_url: "",
    comments: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = async (event) => {
    event.preventDefault();

    if (post.title == "") {
      alert("Required Fields are empty!");
    } else {
      const { error } = await supabase
        .from("Posts")
        .insert({
          title: post.title,
          content: post.content,
          image_url: post.image_url,
          comments: [],
        })
        .select();

      if (error) {
        console.log(error);
      }

      window.location = "/";
    }
  };

  return (
    <div className="CreatePost">
      <p>
        <span> * Indicates required field</span>
      </p>
      <form>
        <label>
          Title <span>*</span>{" "}
        </label>{" "}
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Content</label>
        <br />
        <textarea
          name="content"
          rows="5"
          cols="50"
          id="content"
          value={post.content}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <label>Image URL</label>
        <br />
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={post.image_url}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" onClick={createPost} />
      </form>
    </div>
  );
};

export default CreatePost;
