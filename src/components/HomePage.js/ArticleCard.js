import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import UserContext from "../Context/UserContext";
import { ROOT_URL } from "../../Utils/Constants";

function ArticleCard(props) {
  let article = props.article;
  let context = useContext(UserContext);
  console.log(props);

  function handleDelete(articleSlug) {
    fetch(ROOT_URL + `articles/${articleSlug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + context.user.token
      }
    })
      .then(res => {
        let newArticlesArr = props.articles.filter(
          article => article.slug !== articleSlug
        );
        console.log(newArticlesArr, "newArticlesArr");
        props.setArticles(newArticlesArr);
      })
      .catch(err => console.log(err));
    // .then(res => {
    //   let newArticlesArr = props.articles.filter(
    //     article.slug !== articleSlug
    //   );
    //   console.log(newArticlesArr, "newArticlesArr");
    //   props.setArticles(newArticlesArr);
    // })
    // .catch(error => console.log(error));
  }

  return (
    <div class="p-12 md:w-1/3 flex flex-col items-start shadow-md border border-gray-200 rounded mr-6 my-10">
      <div className="">
        {/* <span class="inline-block py-1 px-1 rounded bg-green-200 text-white text-sm font-medium tracking-widest">
                CATEGORY
              </span> */}
        <div>
          {article.tagList.map(tag => {
            return (
              <Link to={`/articles/tags/${tag}`}>
                <span className="hover:underline inline-block py-1 px-1 mr-4 rounded bg-indigo-100 text-indigo-500 text-sm font-medium tracking-widest">
                  {tag}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <Link to={`/articles/${article.slug}`}>
        <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-2 hover:underline">
          {article.title}
        </h2>
      </Link>

      <p class="leading-relaxed mb-8">
        {article.description.slice(0, 100) + "...Read More"}
      </p>
      <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-200 mt-auto w-full">
        <Link class="text-indigo-500 inline-flex items-center">
          Learn More
          <svg
            class="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>

        {article.author.username === (context.user && context.user.username) ? (
          <MdDelete
            className="w-10 h-6 hover:cursor-pointer"
            onClick={() => handleDelete(article.slug)}
          />
        ) : (
          ""
        )}

        <span class="ml-auto pr-3 text-gray-600 inline-flex items-center leading-none text-sm">
          <svg
            class="w-4 h-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          12k
        </span>
        <span class="text-gray-600 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 pl-3 border-l-2 border-r-2 border-gray-300">
          <svg
            class="w-4 h-4 mr-1"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          1.2K
        </span>
        <span class="text-gray-600 inline-flex items-center leading-none text-sm">
          <svg
            class="w-4 h-4 mr-1"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
          </svg>
          6
        </span>
      </div>
      <Link class="inline-flex items-center">
        <img
          alt="blog"
          src="https://dummyimage.com/104x104"
          class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span class="flex-grow flex flex-col pl-4">
          <Link to={`/profiles/${article.author.username}`} exact>
            <span class="title-font font-medium text-gray-900 hover:underline">
              {article.author.username}
            </span>
          </Link>

          <span class="text-gray-500 text-sm">
            Published On {new Date(article.createdAt).toDateString().slice(4)}
          </span>
        </span>
      </Link>
    </div>
  );
}

export default ArticleCard;
