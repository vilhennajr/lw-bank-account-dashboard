'use client';

import { Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <Box p={4}>
      <Text fontSize="2xl">Bem-vindo ao painel bancário</Text>
      <Button mt={4} colorScheme="blue" onClick={() => router.push('/login')}>
        Acessar Conta
      </Button>
    </Box>
  );
}
