import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Error,
  Form,
  GlobalStyle,
  Input,
  Switcher,
  Title,
  Wrapper,
} from '../components/auth-components';
import GithubButton from '../components/github-btn';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || email === '' || password === '') return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <link
          href='https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap '
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <GlobalStyle />
      <Wrapper>
        <Title>Sign In SWITTER</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            value={email}
            name='email'
            placeholder='Email'
            type='email'
            required
          />
          <Input
            onChange={onChange}
            value={password}
            name='password'
            placeholder='Password'
            type='password'
            required
          />
          <Input type='submit' value={isLoading ? 'Loading...' : 'Sign In'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switcher>
          Do you want to create an account?{' '}
          <Link to='/create-account'>Yes I do!!</Link>
        </Switcher>
        <GithubButton />
      </Wrapper>
    </HelmetProvider>
  );
}
