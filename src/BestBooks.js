import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./BestBooks.css";
import BookFormModal from './BookFormModal';
import ConfirmModal from './ConfirmModal';

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
      toBeDeleted: null,
      showConfirm: false,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateNewBook = this.updateNewBook.bind(this)
    this.deleteBook = this.deleteBook.bind(this)
  }
  

  updateNewBook(newBook) {
    this.setState({ newBook });
  }

  handleChange(event) {
    this.setState({newBook: {...this.state.newBook, [event.target.name]: event.target.value}});
  } 

  handleSubmit(newBookData) {
    fetch("http://localhost:3001/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookData),
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

  updateBook = (event) => {
    this.setState({
      newBook: { ...this.state.newBook, [event.target.name]: event.target.value },
    });
  };

  deleteBook = (bookId) => {
    fetch(`http://localhost:3001/books/${bookId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        this.setState(prevState => ({
            books: prevState.books.filter(book => book._id !== bookId)
        }));
        this.setState({
          toBeDeleted: null,
          showConfirm: false
        });
    })
    .catch(error => console.error('Error:', error));
};

confirmDelete = (bookId) => {
  this.setState({
    toBeDeleted: bookId,
    showConfirm: true
  });
};


  
  render() {

    return (
      <div className="best-books-container">
        <h2 className="title">My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <BookFormModal 
          newBook={this.state.newBook}
          updateBook={this.updateBook}
          handleSubmit={this.handleSubmit}
        />

<ConfirmModal 
  show={this.state.showConfirm} 
  onConfirm={() => this.deleteBook(this.state.toBeDeleted)} 
  onCancel={() => this.setState({ showConfirm: false, toBeDeleted: null })}
/>

 
        {this.state.books.length > 0 ? (
          <Carousel className="book-carousel">
            {this.state.books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.coverImageUrl} alt={book.title} className="book-cover"></img>
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <p className="book-description">{book.description}</p>
              <button onClick={() => this.confirmDelete(book._id)}>Delete</button>
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
};

export default BestBooks;