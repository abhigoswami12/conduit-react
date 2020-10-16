import React, { useEffect, useState, useContext } from "react";
import { ROOT_URL } from "../Utils/Constants";
import UserContext from "./Context/UserContext";

function CreateComment({ article, comments, setComments }) {
  let slug = article.slug;
  let [commentBody, setCommentBody] = useState("");

  let context = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (context.user && context.user.token) {
      // console.log(localStorage.token, "token");
      fetch(ROOT_URL + `articles/${slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + context.user.token
        },
        body: JSON.stringify({ comment: { body: commentBody } })
      })
        .then(res => res.json())
        .then(comment => {
          // console.log("after creating comment", comment);
          let newComments = [...comments, comment.comment];
          setComments(newComments);
          // fetch(ROOT_URL + `articles/${slug}/comments`)
          //   .then(res => res.json())
          //   .then(({ comments }) => {
          //     console.log(comments, "after fetching");
          //     setComments(comments);
          //   })
          //   .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
      setCommentBody("");
    }
  }

  function handleChange(e) {
    let value = e.target.value;
    setCommentBody(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* {console.log("COMMENTBODY", commentBody)}
      {console.log("COMMENT", comment)} */}
      <textarea
        name="answer"
        id=""
        cols="90"
        rows="10"
        onChange={handleChange}
        value={commentBody}
        className="w-full bg-transparent border border-ipl-blue resize-none p-4 mb-2 mt-6"
      ></textarea>
      <input type="submit" className="btn m-initial" value="Add Comment" />
    </form>
  );
}

export default CreateComment;
