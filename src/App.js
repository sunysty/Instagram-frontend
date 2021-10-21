import React from "react";
import { Redirect, Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter, Switch } from "react-router-dom";

import { Cookies } from "react-cookie";
import { history } from "./redux/configStore";

import PostModal from "./components/PostModal";
import { Login, Signup, Main } from "./pages/index";
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Main from './pages/Main';

function App() {
  const cookies = new Cookies();
  const loginState = cookies.get("is_login");

  return (
    <ConnectedRouter history={history}>
      <Route path="/" exact component={Main}>
        {!loginState ? <Redirect to="/login" /> : <Main />}
      </Route>
      <Route path="/login" exact component={Login}>
        {loginState ? <Redirect to="/" /> : null}
      </Route>
      <Route path="/signup" exact component={Signup}>
        {loginState ? <Redirect to="/" /> : null}
      </Route>
      <Route path="/postmodal" exact component={PostModal} />
    </ConnectedRouter>
  );
}

export default App;
