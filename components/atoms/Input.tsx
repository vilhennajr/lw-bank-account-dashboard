import { Input as ChakraInput, FormControl, FormLabel } from '@chakra-ui/react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: string;
}

const Input = ({ value, onChange, label, type = 'text' }: InputProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <ChakraInput type={type} value={value} onChange={onChange} />
    </FormControl>
  );
};

export default Input;
