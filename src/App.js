import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";

import login from "./pages/login";
import signup from "./pages/signup";

import { history } from "./redux/configStore";

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path="/login" exact component={login} />
      <Route path="/signup" exact component={signup} />
    </ConnectedRouter>
  );
}

export default App;
