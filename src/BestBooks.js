import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    fetch("http://localhost:3001/books")
    .then(response => response.json())
    .then(data => this.setState({books:data}))
    .catch(error => console.error("Error", error))
  }

  render() {
/* TODO: render all the books in a Carousel */
    

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      
        {this.state.books.length > 0 ?  (
          <Carousel>
            {this.state.books.map((book, index) => (
            <div key={index}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </div>
          ))}
          </Carousel>
          ) : (
            <h3>"No Books Found :</h3>
          )
        }
      </>
    )
  }
}

export default BestBooks;
