import FormInput from './FormInput';

interface TransferFormProps {
  transferAmount: string;
  transferTo: string;
  setTransferAmount: (value: string) => void;
  setTransferTo: (value: string) => void;
}

const TransferForm = ({
  transferAmount,
  transferTo,
  setTransferAmount,
  setTransferTo,
}: TransferFormProps) => {
  return (
    <div>
      <FormInput
        value={transferAmount}
        onChange={(e) => setTransferAmount(e.target.value)}
        label="Valor para transferência"
      />
      <FormInput
        value={transferTo}
        onChange={(e) => setTransferTo(e.target.value)}
        label="Conta de destino"
      />
    </div>
  );
};

export default TransferForm;
