import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    if (tokenValue !== null) {
      setToken(tokenValue);
      getUserInfo();
    }
  }, []);

  function getUserInfo() {
    const userInfo = jwtDecode(localStorage.getItem("token"));
    setUserData(userInfo);
    console.log(userInfo);
  }
  return (
    <authContext.Provider
      value={{ token, setToken, userData, setUserData, getUserInfo }}>
      {children}
    </authContext.Provider>
  );
}
