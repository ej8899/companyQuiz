import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';

export default function AddUser({ isOpen, onClose, companyIdent }) {
  const [openModal, setOpenModal] = useState(isOpen);
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');

  useEffect(() => {
    setOpenModal(isOpen);
  }, [isOpen]);

  function handleCloseModal() {
    setOpenModal(false);
    setEmail('');
  }

  function handleAddUser() {
    // Make API call here to send the user data
    // Replace 'YOUR_API_URL' with your actual API endpoint
    fetch('https://erniejohnson.ca/apps/cquiz-api/users.php', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        cid: companyIdent,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
        // Close the modal after successfully adding the user
        handleCloseModal();
        // You can perform additional actions here if needed
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        // Handle error state or display error message to the user
      });
  }

  return (
    <Modal show={openModal} size="md" onClose={onClose || handleCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add employee to company account:</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Users&apos; Name" />
            </div>
            <TextInput
              id="username"
              placeholder="John Doe"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Users&apos; Email" />
            </div>
            <TextInput
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          
          <div className="w-full">
          <Button onClick={handleAddUser}>Add User</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
