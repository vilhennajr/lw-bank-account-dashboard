import { FormLabel } from '@chakra-ui/react';

interface LabelProps {
  children: React.ReactNode;
}

const Label = ({ children }: LabelProps) => {
  return <FormLabel>{children}</FormLabel>;
};

export default Label;
