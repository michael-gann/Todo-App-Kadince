import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./Nav/Nav";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import TodoDisplay from "./TodoDisplay/TodoDisplay";
import PageNotFound from "./PageNotFound/PageNotFound";

import "../App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route path="/login" exact={true}>
          <Login
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/signup" exact={true}>
          <Signup />
        </Route>
        <Route path="/todos" exact={true}>
          <TodoDisplay authenticated={authenticated} />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
