import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    console.log("User logged in from AuthProvider: ",userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;