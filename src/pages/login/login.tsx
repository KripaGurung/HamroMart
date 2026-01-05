import React, { useEffect, useState } from "react";
import axios from "axios";
import { allUserURL } from "../../api";
import "./Login.css";
interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

const Login: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(allUserURL);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="loginContainer">
      <h2>Log In</h2>

      <div className="loginGrid">
        {users.map((user) => (
          <div className="loginCard" key={user.id}>
                <img src={user.image} alt={user.firstName} />
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Login;