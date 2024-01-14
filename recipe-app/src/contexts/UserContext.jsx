import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { MessageContext } from './MessageContext';
import ApiService from './../services/ApiService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] =useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false); // show/hide login modal
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
  }, [showMessage]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() =>{
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
              // update the user context with the new token
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
  }, []);

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
  
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

    return (
      <UserContext.Provider value={{ currentPage, user, isLoggedIn, showLoginModal, setUser, navigateTo, setShowLoginModal, handleLogin, handleLogout }}>
          {children}
      </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);