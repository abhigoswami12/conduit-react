import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./components/HomePage.js/HomePage";
import Header from "./components/Header/Header";
import UserContext from "./components/Context/UserContext";
import useFetch from "./Hooks/useFetch";
import { ROOT_URL } from "./Utils/Constants";
import SingleArticle from "./components/SingleArticle";
import CreateArticle from "./components/CreateArticle";
import ShowTaggedArticles from "./components/ShowTaggedArticles";
import Profile from "./components/Profile";
import Login from "./components/Login.js/Login";

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  let [activeModal, setActiveModal] = useState("");

  let [user, setUser] = useState(null);
  // console.log(user, "USER");
  // console.log(showDialog, "showDialog");

  // let [showNotification, setShowNotification] = useState(false);
  let [notification, setNotification] = useState("");
  // console.log(notification, "NOTIFICATION");

  let { data } = useFetch(ROOT_URL + "user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.token,
    },
  });

  if (data && data.user && data.user._id !== (user && user._id)) {
    // console.log("calledin", data.user, user);
    setUser(data.user);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ user, setUser, notification, setNotification }}
      >
        <Header open={open} setActiveModal={setActiveModal} />
        {user ? (
          <>
            {/* {console.log("entered in private rooute with user", user)} */}
            <PrivateRoute
              showDialog={showDialog}
              close={close}
              activeModal={activeModal}
            />
          </>
        ) : (
          <PublicRoute
            showDialog={showDialog}
            close={close}
            activeModal={activeModal}
          />
        )}
      </UserContext.Provider>
    </BrowserRouter>
  );
}

function PrivateRoute(props) {
  // console.log("props of private route", props);
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage
          showDialog={props.showDialog}
          close={props.close}
          activeModal={props.activeModal}
        />
      </Route>
      <Route path="/articles" exact>
        <CreateArticle />
      </Route>
      <Route
        path="/articles/:slug"
        exact
        render={(renderProps) => <SingleArticle {...renderProps} />}
      />
      <Route path="/articles/tags/:tag" exact>
        <ShowTaggedArticles
          showDialog={props.showDialog}
          close={props.close}
          activeModal={props.activeModal}
        />
      </Route>
      <Route path="/profiles/:username" exact>
        <Profile />
      </Route>

      <Route component={FourOFour}></Route>
    </Switch>
  );
}

function PublicRoute(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage
          showDialog={props.showDialog}
          close={props.close}
          activeModal={props.activeModal}
        />
      </Route>
      <Route path="/articles" exact>
        <Redirect to="/" component={<Login />} />
      </Route>
      <Route
        path="/articles/:slug"
        exact
        render={(renderProps) => <SingleArticle {...renderProps} />}
      />
      <Route path="/articles/tags/:tag" exact>
        <ShowTaggedArticles
          showDialog={props.showDialog}
          close={props.close}
          activeModal={props.activeModal}
        />
      </Route>

      <Route component={FourOFour}></Route>
    </Switch>
  );
}

function FourOFour() {
  return <h1>Page not Found</h1>;
}

export default App;
