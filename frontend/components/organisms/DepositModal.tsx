import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import DepositForm from '../molecules/DepositForm';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  depositAmount: string;
  setDepositAmount: (value: string) => void;
  handleDeposit: () => void;
}

const DepositModal = ({ isOpen, onClose, depositAmount, setDepositAmount, handleDeposit }: DepositModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Depositar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DepositForm depositAmount={depositAmount} setDepositAmount={setDepositAmount} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleDeposit}>Confirmar Depósito</Button>
          <Button variant="ghost" onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DepositModal;
