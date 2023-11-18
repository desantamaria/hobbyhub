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

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const postByID = data.find((item) => item.id === id);
      if (postByID) {
        setPost(postByID);
        setCount(postByID.upvotes);
        setComments(postByID.comments);
      }
    } else {
      setPost({
        title: "",
        content: "",
        image_url: "",
        created_at: "",
        upvotes: "",
        comments: [],
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

  const addComment = async (event) => {
    event.preventDefault();

    if (newComment != "") {
      const timestamp = Date.now();
      const currentDate = new Date(timestamp);

      await supabase
        .from("Posts")
        .update({
          comments: [...comments, { comment: newComment, date: currentDate }],
        })
        .eq("id", post.id);

      setComments((comments) => [
        ...comments,
        { comment: newComment, date: currentDate },
      ]);
      setNewComment("");
      console.log(comments);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewComment(value);
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
              <div className="time">
                <PostAge date={post.created_at} />
              </div>
              <h2 className="title">{post.title}</h2>
            </div>
            <button className="view-upvotes" onClick={updateCount}>
              <img
                className="create-post-icon"
                src="https://cdn-icons-png.flaticon.com/512/25/25297.png"
              />{" "}
              {count}
            </button>
          </div>
          <div className="view-card-img-container">
            <img className="view-card-img" src={post.image_url} />
          </div>

          <div>
            <p className="post-content">{post.content}</p>
          </div>
        </div>
      </Link>

      <div className="create-comment">
        <textarea
          className="comment-field"
          placeholder="Enter Comment"
          name="newComment"
          onChange={handleChange}
        ></textarea>
        <button onClick={addComment}>Post Comment</button>
      </div>

      <div className="comments-container">
        {comments.length == 0 ? (
          <div>No Comments Yet</div>
        ) : (
          <div>
            {" "}
            <h2>Comments</h2>
            {comments.map((comment, index) => (
              <div className="comments">
                {" "}
                <PostAge date={comment.date} />
                <p>{comment.comment}</p>
              </div>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPost;
