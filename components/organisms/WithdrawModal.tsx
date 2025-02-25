'use client';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, Button } from '@chakra-ui/react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  withdrawAmount: string;
  setWithdrawAmount: React.Dispatch<React.SetStateAction<string>>;
  handleWithdraw: () => void;
}

const WithdrawModal = ({
  isOpen,
  onClose,
  withdrawAmount,
  setWithdrawAmount,
  handleWithdraw
}: WithdrawModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Saque</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Valor do saque"
            mb={4}
          />
          <Button colorScheme="teal" onClick={handleWithdraw}>
            Sacar
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WithdrawModal;
