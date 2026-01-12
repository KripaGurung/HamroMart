import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { allUserURL } from "../../api";
import { AuthContext} from '../../context/auth/AuthContext';
import { useNavigate  } from 'react-router-dom';
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
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

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

  const handleLogin = (user: UserData) => {
    authContext?.login(user);
    console.log("User logged in from Login page: ",user);
    navigate('/home')
  }

  return (
    <div className="loginContainer">
      <h2>Log In</h2>

      <div className="loginGrid">
        {users.map((user) => (
          <div className="loginCard" key={user.id} onClick = {() => handleLogin(user)}>
                <img src={user.image} alt={user.firstName} />
                <div className="loginDetails">
                    <h3>{user.firstName} {user.lastName}</h3>
                    <p>{user.email}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Login;