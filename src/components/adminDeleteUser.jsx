import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DeleteUserModal({ isOpen, onClose, userName }) {
  const [openModal, setOpenModal] = useState(isOpen);
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');

  useEffect(() => {
    setOpenModal(isOpen);
    setEmail('');
    setUserName('');
  }, [isOpen]);

  function handleCloseModal() {
    setOpenModal(false);
    setEmail('');
    setUserName('');
  }

  function handleDeleteUser() {
    // Make API call here to DELETE  the user data
  
  }

  return (
    // <Modal show={openModal} size="md" onClose={onClose || handleCloseModal} popup>
    <Modal show={openModal} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove <br/>{userName}?
              <br/>
              (disabled for demo)
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
    </Modal>
  );
}
