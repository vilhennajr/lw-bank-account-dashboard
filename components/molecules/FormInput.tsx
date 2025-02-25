import Input from '../atoms/Input';

interface FormInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const FormInput = ({ value, onChange, label }: FormInputProps) => {
  return <Input value={value} onChange={onChange} label={label} />;
};

export default FormInput;
