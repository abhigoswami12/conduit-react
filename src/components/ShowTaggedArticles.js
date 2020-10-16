import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import "@reach/dialog/styles.css";
// import ArticleCard from "./ArticleCard";
// import Login from "../Login.js/Login";
// import Register from "../Register.js/Register";
// import useFetch from "../../Hooks/useFetch";
// import { ROOT_URL } from "../../Utils/Constants";
// import Spinner from "../Spinner";
import UserContext from "./Context/UserContext";
import Login from "./Login.js/Login";
import Register from "./Register.js/Register";
import { ROOT_URL } from "../Utils/Constants";
import ArticleCard from "./HomePage.js/ArticleCard";
import Spinner from "./Spinner";

function ShowTaggedArticles(props) {
  let [articles, setArticles] = useState(null);
  let context = useContext(UserContext);

  let { tag } = useParams();
  console.log(tag);

  function SwitchTab(activeModal) {
    switch (activeModal) {
      case "login":
        return <Login close={props.close} />;
      case "signup":
        return <Register close={props.close} />;
      default:
        return <Login close={props.close} />;
    }
  }

  useEffect(() => {
    fetch(ROOT_URL + `articles/?tag=${tag}`)
      .then(res => res.json())
      .then(({ articles }) => {
        setArticles(articles);
      });
  }, []);
  // if (!data.articles) {
  //   return <h1>Loading....</h1>;
  // }

  // let { data } = useFetch(ROOT_URL + "articles");
  // console.log("Data", data);

  // DOUBT: Handling Errors
  // DOUBt: How to destructure articles from data;
  console.log("ARTICLES", articles);
  if (articles) {
    return (
      <>
        <Link to="/articles">
          <button className="btn mt-6">New Article</button>
        </Link>

        <section class="text-gray-700 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-wrap -m-12">
              {articles.map(article => {
                return (
                  <ArticleCard
                    article={article}
                    articles={articles}
                    setArticles={setArticles}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <Dialog isOpen={props.showDialog} onDismiss={props.close}>
          <button onClick={props.close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span
              aria-hidden
              className="close-button close-pos w-10 h-10 text-4xl text-white flex items-center justify-center outline-none border-none border border-gray-800"
            >
              ×
            </span>
          </button>
          {SwitchTab(props.activeModal)}
          {/* <p>{setNotification("you are logged in")}</p> */}
        </Dialog>
      </>
    );
  }
  return <Spinner />;
}

export default ShowTaggedArticles;
