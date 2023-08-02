import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./BestBooks.css";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      newBook: {
        title: "",
        author: "",
        description: "",
        status: [],
        coverImageUrl: "",
      },
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({newBook: {...this.state.newBook, [event.target.name]: event.target.value}});
  } 

  handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3001/books", {
      method: "POST", // Changed 'both' to 'POST'
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(this.state.newBook),
    })
    .then(response => response.json())
    .then(data => {
      this.setState({books: [...this.state.books, data]});
      this.setState({newBook: {title: "", author: "", description: "", status: [], coverImageUrl: "" }});
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type ="text" name="title" value={this.state.newBook.title} onChange={this.handleChange} />
          </label>
          <label>
            Author:
            <input type="text" name="author" value={this.state.newBook.author} onChange={this.handleChange} />
          </label>
          <label>
            Description:
          <input type="text" name="description" value={this.state.newBook.description} onChange={this.handleChange} />
          </label>
          <label>
            Cover Image Link:
            <input type="text" name="coverImageUrl" value={this.state.newBook.coverImageUrl} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          </form>
          
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