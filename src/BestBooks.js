import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./BestBooks.css";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3001/books")
    .then(response => response.json())
    .then(data => this.setState({books:data}))
    .catch(error => console.error("Error", error))
  }

  render() {

    return (
      <div className="best-books-container">
        <h2 className="title">My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
          <Carousel className="book-carousel">
            {this.state.books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.coverImageUrl} alt={book.title} className="book-cover"></img>
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <p className="book-description">{book.description}</p>
            </div>
            ))}
          </Carousel>
          ) : (
            <h3 className="no-books-found">"No Books Found :</h3>
          )
        }
      </div>
    )
  }
}

export default BestBooks;