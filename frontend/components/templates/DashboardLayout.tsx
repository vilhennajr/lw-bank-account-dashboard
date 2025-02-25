import { Box, Text, Container } from '@chakra-ui/react';
import DepositModal from '../organisms/DepositModal';
import WithdrawModal from '../organisms/WithdrawModal';
import TransferModal from '../organisms/TransferModal';

const DashboardLayout = ({
  children,
  isDepositOpen,
  setDepositOpen,
  isWithdrawOpen,
  setWithdrawOpen,
  isTransferOpen,
  setTransferOpen,
  depositAmount,
  setDepositAmount,
  handleDeposit,
  withdrawAmount,
  setWithdrawAmount,
  handleWithdraw,
  transferAmount,
  setTransferAmount,
  transferTo,
  setTransferTo,
  handleTransfer
}: {
  children: React.ReactNode;
  isDepositOpen: boolean;
  setDepositOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isWithdrawOpen: boolean;
  setWithdrawOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTransferOpen: boolean;
  setTransferOpen: React.Dispatch<React.SetStateAction<boolean>>;
  depositAmount: string;
  setDepositAmount: React.Dispatch<React.SetStateAction<string>>;
  handleDeposit: () => void;
  withdrawAmount: string;
  setWithdrawAmount: React.Dispatch<React.SetStateAction<string>>;
  handleWithdraw: () => void;
  transferAmount: string;
  setTransferAmount: React.Dispatch<React.SetStateAction<string>>;
  transferTo: string;
  setTransferTo: React.Dispatch<React.SetStateAction<string>>;
  handleTransfer: () => void;
}) => {
  return (
    <Box bg="white" p={4} minHeight="100vh" fontFamily="'Inter', sans-serif">
      <Container maxW="container.xl">
        <Text fontSize="3xl" fontWeight="bold" color="purple.600" mb={6}>
          Painel de Conta Bancária
        </Text>
        <Box
          bg="white"
          p={6}
          rounded="lg"
          shadow="lg"
          border="1px solid"
          borderColor="gray.200"
          mb={6}
        >
          {/* Aqui é onde o conteúdo da Dashboard vai */}
          {children}
        </Box>

        {/* Modais */}
        <DepositModal
          isOpen={isDepositOpen}
          onClose={() => setDepositOpen(false)}
          depositAmount={depositAmount}
          setDepositAmount={setDepositAmount}
          handleDeposit={handleDeposit}
        />

        <WithdrawModal
          isOpen={isWithdrawOpen}
          onClose={() => setWithdrawOpen(false)}
          withdrawAmount={withdrawAmount}
          setWithdrawAmount={setWithdrawAmount}
          handleWithdraw={handleWithdraw}
        />

        <TransferModal
          isOpen={isTransferOpen}
          onClose={() => setTransferOpen(false)}
          transferAmount={transferAmount}
          setTransferAmount={setTransferAmount}
          transferTo={transferTo}
          setTransferTo={setTransferTo}
          handleTransfer={handleTransfer}
        />
      </Container>
    </Box>
  );
};

export default DashboardLayout;
