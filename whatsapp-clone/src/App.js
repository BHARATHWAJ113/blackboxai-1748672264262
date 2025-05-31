import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'messages'),
        orderBy('createdAt', 'asc')
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let msgs = [];
        querySnapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() });
        });
        setMessages(msgs);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        createdAt: serverTimestamp(),
        uid: user.uid,
        email: user.email,
      });
      setMessage('');
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-4">
        <h1 className="text-3xl font-bold mb-6">WhatsApp Clone Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="mb-4 p-2 rounded text-black w-64"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 rounded text-black w-64"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex space-x-4">
          <button
            onClick={handleLogin}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">WhatsApp Clone</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Logout
        </button>
      </header>
      <main className="flex-1 overflow-auto mb-4">
        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded max-w-xs ${
                msg.uid === user.uid ? 'bg-white text-black self-end' : 'bg-gray-700 text-white self-start'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs opacity-50">{msg.email}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="flex space-x-2">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 rounded text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
}

export default App;
