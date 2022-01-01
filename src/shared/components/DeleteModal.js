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
  Text
} from '@chakra-ui/react';


const DeleteModal = ({ isOpen, onClose}) => {

    const handleDelete = () => {
        onClose();
        //TODO: enviar request de delete al servidor
    }

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
            Back up
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
