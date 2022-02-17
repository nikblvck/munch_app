import React, {useState} from 'react';
import {Modal} from '../../context/Modal';
import EditPostForm from './EditPostForm';


function EditPost() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Post</button>
      {showModal &&
      (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm />
        </Modal>
      )}
    </>
  );
}

export default EditPost;
