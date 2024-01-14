import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { MessageContext } from './MessageContext';
import ApiService from './../services/ApiService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // show/hide login modal
  const [showCreateAccount, setShowCreateAccount] = useState(false); // show/hide create account modal  
  const { showMessage } = useContext(MessageContext);          // save the message context
  const [currentPage, setCurrentPage] = useState('home');
  const handleLogout = useCallback(async () => {
    try {
      await ApiService.logout();
      setIsLoggedIn(false);
      setUser(null);
      showMessage('success', 'Logged out successfully');
      navigateTo('home');
    } catch (error) {
      showMessage('error', 'Failed to log out');
    }
  }, [showMessage]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await ApiService.fetchCurrentUser();
        setIsLoggedIn(true);
        setUser(response);
        if (response.message === 'Access denied') {
          handleLogout();
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkLoginStatus();
  }, [handleLogout]);

  useEffect(() => {
    const tokenRefreshInterval = 15 * 60 * 1000; // 15 minutes

    const intervalId = setInterval(async () => {
      try {
        const response = await ApiService.refreshToken();
        setIsLoggedIn(true);
        setUser(response);
        if (response.message === 'Access denied') {
          handleLogout();
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    }, tokenRefreshInterval);

    return () => clearInterval(intervalId); // cleanup
  }, [handleLogout]);

  const handleLogin = async (email, password) => {
    try {
      const response = await ApiService.login({ email, password });
      showMessage('success', 'Login successful');
      setTimeout(() => {
        setIsLoggedIn(true);
        setShowLoginModal(false);
        setUser(response.user);
      }, 2000);
    } catch (error) {
      showMessage('error', 'Failed to login');
      setUser(null);
    }
  };

  const handleOpenCreateAccount = () => {
    setShowLoginModal(false);
    setShowCreateAccount(true);
  };

  const handleCreate = async (newUser) => {
    await ApiService.createUser(newUser)
      .then(addedUser => {
        showMessage('success', 'User created successfully');
      })
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <UserContext.Provider value={{ currentPage, user, isLoggedIn, showLoginModal, showCreateAccount, setUser, handleCreate, navigateTo, setShowLoginModal, setShowCreateAccount, handleLogin, handleLogout, handleOpenCreateAccount }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);