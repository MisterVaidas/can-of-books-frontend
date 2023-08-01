import "./App.css";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from "./About";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { Nav } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </Nav>

          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<BestBooks />} />
          </Routes>
      
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
