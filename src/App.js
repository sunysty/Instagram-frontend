import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import PostModal from "./components/PostModal";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/postmodal" exact component={PostModal} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
