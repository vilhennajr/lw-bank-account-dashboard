import FormInput from './FormInput';

interface DepositFormProps {
  depositAmount: string;
  setDepositAmount: (value: string) => void;
}

const DepositForm = ({ depositAmount, setDepositAmount }: DepositFormProps) => {
  return (
    <div>
      <FormInput
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        label="Valor para depósito"
      />
    </div>
  );
};

export default DepositForm;
