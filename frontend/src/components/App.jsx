import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./Nav/Nav"
import Splash from "./Splash/Splash";
import TodoDisplay from "./TodoDisplay/TodoDisplay";

import "../App.css";

function App() {
  return (
  <BrowserRouter>
    <Nav />
    <Switch>
      <Route path="/" exact={true}>
        <Splash />
      </Route>
      <Route path="/my-todos">
      <TodoDisplay />
      </Route>
    </Switch>
  </BrowserRouter>
  )

}

export default App;
