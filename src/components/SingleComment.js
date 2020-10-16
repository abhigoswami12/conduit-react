import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { ROOT_URL } from "../Utils/Constants";
import UserContext from "./Context/UserContext";
function SingleComment(props) {
  let comment = props.comment;

  let context = useContext(UserContext);

  // console.log("COMMENT", comment);
  // console.log("CONTEXT", context.user);

  // DOUBT: We can directly access comment id from comment.id.No need to send from handleDelete??

  function handleDelete(commentId) {
    fetch(ROOT_URL + `articles/${props.article.slug}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.token
      }
    })
      .then(res => {
        let newComments = props.comments.filter(
          comment => comment.id !== commentId
        );
        console.log(newComments, "afer delete", comment);
        props.setComments(newComments);
      })
      .catch(error => console.log(error));
  }

  return (
    <article className="py-6 mx-6 border-b border-gray-300 flex justify-between">
      <div>
        <h2 className="text-lg text-gray-800 font-bold capitalize">
          {comment.body}
        </h2>
        {comment.author ? (
          <span className="text-gray-500 font-bold">
            By {comment.author.username}
          </span>
        ) : (
          <span className="text-gray-500 font-bold">By Anonymous</span>
        )}
        <span className="ml-3 text-gray-500 font-semibold">
          {new Date(comment.createdAt).toDateString().slice(4)}
        </span>
      </div>

      <div className="flex items-center">
        {comment.author.username === context.user && context.user.username ? (
          <>
            <MdDelete
              className="w-10 h-6 hover:cursor-pointer"
              onClick={event => handleDelete(comment.id, event)}
            />
          </>
        ) : (
          ""
        )}
      </div>
    </article>
  );
}

export default SingleComment;
