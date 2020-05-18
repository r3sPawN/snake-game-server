import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./components/Board";
import { Board } from "./components/Board";

function Home() {
  return <div className="home-page">Welcome to our home page</div>;
}

function App() {
  return (
    <Router>
      <div className="nav-bar">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/board">Play</Link>
        </div>
      </div>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/board">
          <Board />
        </Route>
        <Route path="/404" component={pageNotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  );
}

function pageNotFound() {
  return <h1>Page not found!</h1>;
}

export default App;
