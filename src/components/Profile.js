import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ROOT_URL } from "../Utils/Constants";
import Spinner from "./Spinner";
import ArticleCard from "./HomePage.js/ArticleCard";

function Profile() {
  let { username } = useParams();
  console.log(username);
  let [profile, setProfile] = useState(null);
  console.log(profile);
  let [activeTab, setActiveTab] = useState("myPosts");
  let [articles, setArticles] = useState(null);

  // function switchTab(value) {
  //   switch (value) {
  //     case "myPosts":
  //       setActiveTab("myPosts");
  //       break;
  //     case "myFavorites":
  //       setActiveTab("myFavorites");
  //       break;
  //     default:
  //       setActiveTab("myPosts");
  //   }
  // }

  useEffect(() => {
    fetch(ROOT_URL + `/profiles/${username}`)
      .then(res => res.json())
      .then(({ profile }) => {
        setProfile(profile);
      })
      .catch(error => console.log(error));
    // if (activeTab === "myPosts" && profile) {
    // if (profile) {
    console.log("entered");

    if (activeTab === "myFavorites") {
      fetch(ROOT_URL + `articles/?favorited=${username}`)
        .then(res => res.json())
        .then(({ articles }) => setArticles(articles));
    } else {
      fetch(ROOT_URL + `articles/?author=${username}`)
        .then(res => res.json())
        .then(({ articles }) => setArticles(articles));
    }
    // }
  }, [activeTab]);

  // function handleClick(value) {
  //   switchTab(value);
  // }

  if (!profile) {
    return <Spinner />;
  }
  return (
    <section class="text-gray-700 body-font bg-gray-300">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col ">
          {/* <div class="h-1 bg-gray-200 rounded overflow-hidden">
            <div class="w-24 h-full bg-indigo-500"></div>
          </div> */}
          <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <img src={profile.image} alt="user-image" />
            <div>
              <div className="flex items-center justify-center">
                <span className="text-xl ml-48">Name: </span>
                <span className="text-2xl ml-3 capitalize">
                  {profile.username}
                </span>
              </div>

              {profile.bio ? (
                <div className="flex items-center justify-center">
                  <span className="text-xl ml-48">Bio: </span>
                  <span className="text-2xl ml-3">{profile.bio}</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <button className="btn">
              {!profile.following
                ? `follow ${profile.username}`
                : `unfollow ${profile.username}`}
            </button>
          </div>
        </div>
        <div className="">
          <button
            className={`bg-transparent border-0 outline-none focus:outline-none ${
              activeTab === "myPosts" ? " active" : ""
            }`}
            onClick={() => setActiveTab("myPosts")}
          >
            My Posts
          </button>
          <button
            onClick={() => setActiveTab("myFavorites")}
            className={`bg-transparent border-none ml-8 outline-none focus:outline-none ${
              activeTab === "myFavorites" ? " active" : ""
            }`}
          >
            My Favorites
          </button>
        </div>
        {articles ? (
          <section class="text-gray-700 body-font overflow-hidden">
            <div class="container px-5 py-16 mx-auto">
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
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
}

export default Profile;
