import { addDoc, collection, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  border: 1px solid #58dd94;

  width: 100%;
  resize: none;
  font-family: 'sans-serif';
  &::placeholder {
    font-weight: 800;
    font-size: 16px;
    color: #58dd94;
  }
  &:focus {
    outline: none;
    border-color: #58dd94;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const AttatchFileButton = styled.label`
  padding: 10px 0px;
  color: #58dd94;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #58dd94;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  height: 34px;
`;

const AttatchFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #58dd94;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  height: 36px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || loading || tweet === '' || tweet.length > 180) return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || 'Anonymous',
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }

      setTweet('');
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder='What is happening..?'
      />
      <AttatchFileButton htmlFor='file'>
        {file ? 'Photo added ✅' : 'Add photo'}
      </AttatchFileButton>
      <AttatchFileInput
        onChange={onFileChange}
        type='file'
        id='file'
        accept='image/*'
      />
      <SubmitBtn type='submit' value={loading ? 'Posting...' : 'Post Tweet'} />
    </Form>
  );
}
