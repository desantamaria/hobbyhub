import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
      setPost({ title: "", content: "", image_url: "" });
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
  };

  // UPDATE post
  const updatePost = async (event) => {
    event.preventDefault();

    if (post.title == "") {
      alert("Required Fields are empty!");
    } else {
      await supabase
        .from("Posts")
        .update({
          title: post.title,
          image_url: post.image_url,
          content: post.content,
        })
        .eq("id", id);

      window.location = "/";
    }
  };

  // DELETE post
  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from("Posts").delete().eq("id", id);

    window.location = "/";
  };

  return (
    <div className="EditPost">
      <Link to={"../view/" + post.id}>
        <button>Go Back</button>
      </Link>
      <p>
        <span> * Indicates required field</span>
      </p>

      <form>
        <label htmlFor="title">
          Title <span>*</span>
        </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="content">Content</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="content"
          name="content"
          defaultValue={post.content}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <label htmlFor="image_url">Image URL</label>
        <br />
        <input
          type="text"
          id="image_url"
          name="image_url"
          defaultValue={post.image_url}
          onChange={handleChange}
        />
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
