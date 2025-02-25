"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import {
  deposit,
  withdraw,
  transfer,
  fetchBalance
} from "../../store/actions/balanceActions";
import DashboardLayout from "../../components/templates/DashboardLayout";
import DepositModal from "../../components/organisms/DepositModal";
import WithdrawModal from "../../components/organisms/WithdrawModal";
import TransferModal from "../../components/organisms/TransferModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { balance, loading, error, accountId } = useSelector((state: any) => state.balance);

  useEffect(() => {
    const userId = 1; // Substitua pelo ID da conta correta
    dispatch(fetchBalance(userId));
  }, [dispatch]);




  // Controle dos modais
  const [isDepositOpen, setDepositOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);
  const [isTransferOpen, setTransferOpen] = useState(false);

  // States para os inputs dos modais
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");

  // Funções para chamar as ações de Redux
const handleDeposit = () => {
  if (!accountId) {
    console.error("Erro: accountId não encontrado", accountId);
    return;
  }

  dispatch(deposit({ accountId, type: "deposit", amount: Number(depositAmount) }));
  setDepositOpen(false);
};


  const handleWithdraw = () => {
     if (!accountId) {
    console.error("Erro: accountId não encontrado", accountId);
    return;
  }

  dispatch(withdraw({ accountId, type: "withdraw", amount: Number(withdrawAmount) }));
  setWithdrawOpen(false);
  };

  const handleTransfer = () => {
      if (!accountId) {
    console.error("Erro: accountId não encontrado", accountId);
    return;
  }

    dispatch(transfer({ accountId, type: "transfer", targetAccountId: transferTo, amount: Number(transferAmount) }));
    setTransferOpen(false); // Fecha o modal após a operação
  };

  return (
    <DashboardLayout
      isDepositOpen={isDepositOpen}
      setDepositOpen={setDepositOpen}
      isWithdrawOpen={isWithdrawOpen}
      setWithdrawOpen={setWithdrawOpen}
      isTransferOpen={isTransferOpen}
      setTransferOpen={setTransferOpen}
      depositAmount={depositAmount}
      setDepositAmount={setDepositAmount}
      handleDeposit={handleDeposit}
      withdrawAmount={withdrawAmount}
      setWithdrawAmount={setWithdrawAmount}
      handleWithdraw={handleWithdraw}
      transferAmount={transferAmount}
      setTransferAmount={setTransferAmount}
      transferTo={transferTo}
      setTransferTo={setTransferTo}
      handleTransfer={handleTransfer}
    >
      <Text fontSize="xl" mb={4}>
        Saldo: R$ {balance}
      </Text>

      {loading && <Spinner size="lg" />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          Ocorreu um erro: {error}
        </Alert>
      )}

      {/* Botões para abrir os modais */}
      <Button colorScheme="teal" onClick={() => setDepositOpen(true)}>
        Depósito
      </Button>
      <Button colorScheme="red" onClick={() => setWithdrawOpen(true)} ml={4}>
        Saque
      </Button>
      <Button colorScheme="blue" onClick={() => setTransferOpen(true)} ml={4}>
        Transferência
      </Button>

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
    </DashboardLayout>
  );
};

export default Dashboard;