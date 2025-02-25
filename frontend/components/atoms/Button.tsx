import { Button as ChakraButton } from '@chakra-ui/react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  colorScheme: string;
}

const Button = ({ onClick, children, colorScheme }: ButtonProps) => {
  return (
    <ChakraButton colorScheme={colorScheme} onClick={onClick}>
      {children}
    </ChakraButton>
  );
};

export default Button;
