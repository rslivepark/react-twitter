import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Button = styled.span`
  margin-top: 30px;
  background-color: white;
  font-weight: 600;
  font-family: 'sans-serif';
  text-align: center;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
  width: auto;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src='./images/github-mark.svg' />
      Continue with Github
    </Button>
  );
}
