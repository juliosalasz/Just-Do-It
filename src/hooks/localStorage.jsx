import { useState } from "react";

export const UseLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const items = window.localStorage.getItem(key);
      return items ? JSON.parse(items) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log(err, "There has been an error");
    }
  };
  return [storedValue, setValue];
};
