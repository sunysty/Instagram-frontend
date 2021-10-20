import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";
import { Cookies } from "react-cookie";

import login from "./pages/login";
import signup from "./pages/signup";
import test from "./pages/test";

function App() {
  const cookies = new Cookies();
  const loginState = cookies.get("is_login");

  return (
    <ConnectedRouter history={history}>
      {loginState ? (
        <Route path="/" exact component={test} />
      ) : (
        <Route path="/login" exact component={login} />
      )}
      <Route path="/signup" exact component={signup} />
    </ConnectedRouter>
  );
}

export default App;
