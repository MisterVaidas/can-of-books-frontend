import React from 'react';
import Modal from 'react-modal';

class BookFormModal extends React.Component {
    constructor() {
      super();
      this.state = { showModal: false };
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  } 

  handleSubmit(event) {
    event.preventDefault();
    
    // Define newBookData
    let newBookData = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      status: this.state.status,
      coverImageUrl: this.state.coverImageUrl
    };
    
    // Call updateNewBook prop function
    this.props.handleSubmit(newBookData);
  
    this.setState({
      title: "",
      author: "",
      description: "",
      status: "",
      coverImageUrl: "",
    });
  
    this.handleCloseModal();
  }
  
  
  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Add Book</button>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Add Book"
           onRequestClose={this.handleCloseModal}
        >
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required />
            </label>
            <label>
              Author:
              <input type="text" name="author" value={this.state.author} onChange={this.handleChange} required />
            </label>
            <label>
              Description:
              <textarea name="description" value={this.state.description} onChange={this.handleChange} required />
            </label>
            <label>
              Status:
              <input type="text" name="status" value={this.state.status} onChange={this.handleChange} required />
            </label>
            <label>
              Cover Image URL:
              <input type="text" name="coverImageUrl" value={this.state.coverImageUrl} onChange={this.handleChange} required />
            </label>
            <button type="submit">Submit</button>
            <button onClick={this.handleCloseModal}>Close</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default BookFormModal;