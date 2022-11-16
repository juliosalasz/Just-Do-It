import { onAuthStateChangedListener } from "../utils/firebase";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  isLoading: false,
  setIsLoading: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const value = { currentUser, setCurrentUser, isLoading, setIsLoading };

  useEffect(() => {
    setIsLoading(true);
    const unsubcribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
    return unsubcribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
