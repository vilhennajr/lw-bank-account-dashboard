'use client';

import { useState } from 'react';
import { Button, Input, FormControl, FormLabel, Box } from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
import { setAuthToken } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['token']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { username, password });
      setCookie('token', response.data.token, { path: '/', maxAge: 3600 });
      dispatch(setAuthToken(response.data.token));
      router.push('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt="100px">
      <form onSubmit={handleLogin}>
        <FormControl isRequired>
          <FormLabel>Usuário</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Digite seu usuário"
          />
        </FormControl>
        <FormControl isRequired mt={4}>
          <FormLabel>Senha</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Digite sua senha"
          />
        </FormControl>
        {error && <Box color="red.500">{error}</Box>}
        <Button type="submit" mt={4} colorScheme="blue" width="100%">
          Entrar
        </Button>
      </form>
    </Box>
  );
};

export default Login;
