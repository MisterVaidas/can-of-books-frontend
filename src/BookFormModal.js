import React from 'react';
import Modal from 'react-modal';
import './modal.css';

class BookFormModal extends React.Component {
    constructor() {
        super();
        this.state = { 
          showModal: false,
          title: "",
          author: "",
          description: "",
          status: "",
          coverImageUrl: ""
        };
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
      <div className="modal-container">
        <button className="open-modal-button" onClick={this.handleOpenModal}>Add Book</button>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Add Book"
           onRequestClose={this.handleCloseModal}
           shouldCloseOnOverlayClick={false}
           className="book-modal"
        >
          <form className="modal-form" onSubmit={this.handleSubmit}>
            <label className="modal-form-label">
              Title:
              <input type="text" name="title" className="modal-form-input" value={this.state.title} onChange={this.handleChange} required />
            </label>
            <label className="modal-form-label">
              Author:
              <input type="text" name="author" className="modal-form-input" value={this.state.author} onChange={this.handleChange} required />
            </label>
            <label className="modal-form-label">
              Description:
              <textarea name="description" className="modal-form-textarea" value={this.state.description} onChange={this.handleChange} required />
            </label>
            <label className="modal-form-label">
              Status:
              <input type="text" name="status" className="modal-form-input" value={this.state.status} onChange={this.handleChange} required />
            </label>
            <label className="modal-form-label">
              Cover Image URL:
              <input type="text" name="coverImageUrl" className="modal-form-input" value={this.state.coverImageUrl} onChange={this.handleChange} required />
            </label>
            <button type="submit" className="modal-form-submit">Submit</button>
            <button onClick={this.handleCloseModal} className="modal-close-button">Close</button>
          </form>
        </Modal>
      </div>
    );
  }
};

export default BookFormModal;