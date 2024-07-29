import styled from 'styled-components';
import { signInWithGoogle, signInWithApple } from '../firebase';

// Estilos
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 10px;

  &:hover {
    background-color: #357ae8;
  }
`;

const AppleButton = styled(LoginButton)`
  background-color: #000;
  &:hover {
    background-color: #333;
  }
`;

const LoginTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Login = () => {
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  const handleAppleLogin = async () => {
    await signInWithApple();
  };

  return (
    <LoginContainer>
      <LoginTitle>Faça login</LoginTitle>
      <LoginButton onClick={handleGoogleLogin}>Entrar com Google</LoginButton>
      <AppleButton onClick={handleAppleLogin}>Entrar com Apple</AppleButton>
    </LoginContainer>
  );
};

export default Login;
