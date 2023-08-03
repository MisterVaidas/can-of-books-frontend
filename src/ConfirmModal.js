function ConfirmModal({ show, onConfirm, onCancel }) {
    if (!show) return null;
    
    return (
      <div className="confirm-modal">
        <p>Are you sure you want to delete this book?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    );
  }

  export default ConfirmModal;