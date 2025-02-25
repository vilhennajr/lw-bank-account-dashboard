import FormInput from './FormInput';

interface WithdrawFormProps {
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
}

const WithdrawForm = ({ withdrawAmount, setWithdrawAmount }: WithdrawFormProps) => {
  return (
    <div>
      <FormInput
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        label="Valor para saque"
      />
    </div>
  );
};

export default WithdrawForm;
