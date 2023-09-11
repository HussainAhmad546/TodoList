import React from 'react';
import ReactModal from 'react-modal';
import { modalStyles } from './styles';

const Modal = ({ isOpen, onRequestClose, confirmDelete, cancelDelete }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={modalStyles}
    ariaHideApp={false}
  >
    <h2 className="text-xl font-bold mb-4">Confirmation</h2>
    <p className="mb-4">Are you sure you want to delete this item?</p>
    <div className="flex justify-end">
      <button
        type="button"
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={confirmDelete}
      >
        Yes
      </button>
      <button
        type="button"
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        onClick={cancelDelete}
      >
        No
      </button>
    </div>
  </ReactModal>
);

export default Modal;
