'use client';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button } from '@chakra-ui/react';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  transferAmount: string;
  setTransferAmount: React.Dispatch<React.SetStateAction<string>>;
  transferTo: string;
  setTransferTo: React.Dispatch<React.SetStateAction<string>>;
  handleTransfer: () => void;
}

const TransferModal = ({
  isOpen,
  onClose,
  transferAmount,
  setTransferAmount,
  transferTo,
  setTransferTo,
  handleTransfer
}: TransferModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transferência</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Valor da transferência"
            mb={4}
          />
          <Input
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
            placeholder="Conta de destino"
            mb={4}
          />
          <Button colorScheme="teal" onClick={handleTransfer}>
            Transferir
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransferModal;
