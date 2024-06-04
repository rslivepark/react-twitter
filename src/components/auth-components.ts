import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  body {
  margin: 0;
	padding: 0;
	border: 0;
  font-family: 'Syncopate', sans-serif;
  box-sizing: border-box;

  }
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
  font-weight: 800;
  font-family: 'Syncopate';
  text-align: center;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #dee2e6;
  width: 100%;
  font-size: 16px;
  font-family: 'Reddit Mono';
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 800;
  color: #5cb85c;
  font-family: 'sans-serif';
`;

export const Switcher = styled.span`
  margin-top: 20px;
  font-family: 'sans-serif';
  a {
    color: #58dd94;
    text-decoration: none;
  }
`;
