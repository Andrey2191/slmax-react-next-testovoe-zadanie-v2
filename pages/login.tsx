import React, { useEffect, useState } from 'react';
import AuthModal from '../components/AuthModal';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    console.log('isAuthenticated changed:', isAuthenticated);
  }, [isAuthenticated]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogin = (username: string, password: string) => {
    login();
    localStorage.setItem('user', username)
    console.log(`Login: ${username} - ${password}`);

  };

  return (
    <div className={styles.home}>
      <Header />
      <h2>Login Page</h2>
      <button className={styles.favBtn} onClick={openModal}>Open Login Modal</button>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;