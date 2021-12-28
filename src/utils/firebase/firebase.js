/*
import { initializeApp } from 'firebase/app';
import {
  collection, getFirestore, doc, getDoc, setDoc, addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAsamsPEHnZdNXs6Bd5QW4bkkIjqAgZeOA',
  authDomain: 'chat-335420.firebaseapp.com',
  projectId: 'chat-335420',
  storageBucket: 'chat-335420.appspot.com',
  messagingSenderId: '1041216059107',
  appId: '1:1041216059107:web:dec3c338d16dc9ac7b37d6',
};
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const firestore = getFirestore();

const users = collection(firestore, 'users');
const messages = collection(firestore, 'messages');

const addUser = async (res) => {
  try {
    await setDoc(doc(users, res.googleId), {
      id: res.googleId,
      name: res.givenName,
      email: res.email,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
const addMessage = async (res) => {
  try {
    await addDoc(messages, {
      user: res.user,
      message: res.message,
    });
  } catch (e) {
    console.log(e);
  }
};

const checkUser = async (res) => {
  const userRef = doc(firestore, 'users', res.googleId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) addUser(res);
};

export {
  app, firestore, checkUser, addMessage,
};
*/
