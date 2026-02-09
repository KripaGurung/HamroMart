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
  console.log("AuthProvider current user state:", user);

  const login = (userData: User) => {
    console.log("Login function called with:", userData);
    setUser(userData);
    console.log("User set in AuthProvider:", userData);
  };

  const logout = () => {
    console.log("Logout function called");
    setUser(null);
    console.log("User cleared");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;