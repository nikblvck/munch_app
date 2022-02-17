import React, {useState} from 'react';
import {Modal} from '../../../context/Modal';
import NewPostForm from './NewPostForm'

function NewPost() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewPostForm />
        </Modal>
      )}
    </>
  );
}

export default NewPost;
