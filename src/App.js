





import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from "./About";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link
} from "react-router-dom";
import { Nav } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <nav>
            <ul>
              <li><link to="/">Home</link></li>
              <li><link to="/about">About</link></li>
            </ul>
          </nav>

            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/">
                <BestBooks />
            </Route>
            <Route 
              exact path="/About.js"
              element={<About />}
            >
            </Route>
      
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
