import React, { useEffect, useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { ROOT_URL } from "../Utils/Constants";
import Spinner from "./Spinner";
import AllComments from "./AllComments";
import CreateComment from "./CreateComment";
import UserContext from "./Context/UserContext";
// import useFetch from "../Hooks/useFetch";

function SingleArticle(props) {
  console.log("single article is called");
  let [article, setArticle] = useState(null);
  console.log(article);

  let [comments, setComments] = useState(null);
  console.log("COMMENT IN SINGLE ARTICLE", comments);

  // let[profile, setProfile] = useState(null);

  let context = useContext(UserContext);
  console.log("USER OF SINGLE ARTICLE", context.user);

  let slug = props.match.params.slug;

  console.log(props);

  function fetchComments() {
    fetch(ROOT_URL + `articles/${slug}/comments`)
      .then(res => res.json())
      .then(({ comments }) => {
        console.log(comments, "after fetching");
        setComments(comments);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    console.log(slug);
    fetch(ROOT_URL + `articles/${slug}`)
      .then(res => res.json())
      .then(({ article }) => {
        console.log(article);
        setArticle(article);
      })
      .catch(error => console.log(error));

    fetchComments();
  }, []);

  // function handleDelete(articleSlug) {
  //   fetch(ROOT_URL + `articles/${slug}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Token " + context.user.token
  //     }
  //   });
  // }

  function handlefavorite(type) {
    fetch(ROOT_URL + `articles/${slug}/favorite`, {
      method: type === "favorite" ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + context.user.token
      }
    })
      .then(res => res.json())
      .then(({ article }) => {
        console.log(article, "artilce after favorite");
        setArticle(article);
      })
      .catch(error => console.log(error));
  }

  function handleFollow(type) {
    fetch(ROOT_URL + `profiles/${article.author.username}/follow`, {
      method: type === "follow" ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + context.user.token
      }
    })
      .then(res => res.json())
      .then(({ profile }) => {
        setArticle({
          ...article,
          author: profile
        });
        console.log(profile, "PROFILE");
      });
  }

  // TODO: optimize image
  // how to show spinner while the page is loading
  if (!article) {
    return <Spinner />;
  }

  // DOUBT: How to implement delete in single article
  return (
    <>
      <section className="bg-bg-grey font-nunito">
        <div className="w-2/3 mx-auto my-0 py-32">
          <div className="">
            <h2 className="text-4xl text-gray-700 font-bold capitalize">
              {article.title}
            </h2>
            <div className="flex items-center">
              {article.author ? (
                <>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={article.author.image}
                    alt=""
                  />
                  <p className="text-gray-600 font-bold ml-4">
                    by: {article.author.username}
                  </p>
                </>
              ) : (
                <>
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://dummyimage.com/104x104"
                    alt=""
                  />
                  <p className="text-gray-600 font-bold">by: Anonymous</p>
                </>
              )}

              <p className="ml-3 text-gray-500 font">
                {new Date(article.createdAt).toDateString().slice(4)}
              </p>
              {console.log(article.author, "AUTHOR OF THE ARTICLE")}
              {console.log(article.author.following)}
              <div className="text-left">
                <button
                  onClick={
                    article.author.following
                      ? () => handleFollow("unfollow")
                      : () => handleFollow("follow")
                  }
                  className="text-white px-2 tracking-wide py-1 bg-gradient-to-bl from-ipl-blue to-blue rounded cursor-pointer outline-none ml-8 hover:text-gray-400"
                >
                  {article.author.following ? "Unfollow" : "Follow"}
                </button>
              </div>
              <div className="text-left">
                <button
                  onClick={
                    article.favorited
                      ? () => handlefavorite("unfavorite")
                      : () => handlefavorite("favorite")
                  }
                  className="text-white px-2 tracking-wide py-1 bg-gradient-to-bl from-ipl-blue to-blue rounded cursor-pointer outline-none ml-8 hover:text-gray-400"
                >
                  {article.favorited ? "unfavorite" : "favorite"}
                </button>
                <span className="ml-4">{article.favoritesCount} likes</span>
              </div>
            </div>
            <p className="py-10 leading-8 tracking-wider text-gray-800 text-lg">
              {article.body}
            </p>
          </div>
          <div>
            <CreateComment
              article={article}
              comments={comments}
              setComments={setComments}
            />
          </div>

          <AllComments
            article={article}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </section>
    </>
  );
}

export default SingleArticle;
