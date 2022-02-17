import React, {useState} from 'react';
import {Modal} from '../../context/Modal';
import EditPostForm from './EditPostForm';


function EditPost() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Edit Post</button>
      {isOpen **
      (
        <Modal onClose={() => setIsOpen(false)}>
          <EditPostForm />
        </Modal>
      )}
    </>
  );
}

export default EditPost;
