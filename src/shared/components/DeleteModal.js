import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';
import { Authcontext } from '../context/auth-context';
import { useContext } from 'react';
import axios from 'axios';

const DeleteModal = ({ isOpen, onClose, placeId }) => {

  const auth = useContext(Authcontext);
  
  const handleDelete = () => {
    onClose();

    const config = {
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    };

    axios.delete(process.env.REACT_APP_BACKEND_URL + '/places/' + placeId,config).then(response => {
      /* console.log(response) */
      window.location.reload(); //to update page
    }).catch(error => {
      console.log(error);
    })
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete this place</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="md">Are you sure you want to delete this place?</Text>
          <Text fontSize="md">This action won't be reversible.</Text>
        </ModalBody>

        <ModalFooter mt="20px">
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
