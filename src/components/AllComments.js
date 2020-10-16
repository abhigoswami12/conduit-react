import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { ROOT_URL } from "../Utils/Constants";
import SingleComment from "./SingleComment";
import Spinner from "./Spinner";

function AllComments(props) {
  let slug = props.article.slug;
  let comments = props.comments;

  // let [data, setData] = useState(null);

  // let { data, errors } = useFetch(ROOT_URL + `articles/${slug}/comments`);

  // useEffect(() => {
  //   fetch(ROOT_URL + `articles/${slug}/comments`)
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res, "after fetching");
  //       setData(res);
  //     })
  //     .catch(error => console.log(error));
  // }, [props.comments]);

  // console.log("COMMENTS", comments);
  if (!comments) {
    return <Spinner />;
  }

  return (
    <div className="my-48">
      {!comments.length ? (
        <h2 className="text-2xl font-bold text-ipl-blue">
          **No Answers to this Question. Be the First One to Write!!
        </h2>
      ) : (
        <>
          <h2 className="text-ipl-blue font-bold text-2xl underline">
            All Comments:
          </h2>

          <ul className="border border-gray-400 bg-yellow-200 shadow my-4">
            {comments.map(comment => {
              return (
                <li key={comment._id}>
                  <SingleComment
                    comment={comment}
                    setComments={props.setComments}
                    comments={props.comments}
                    article={props.article}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
export default AllComments;
