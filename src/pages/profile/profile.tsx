import React, { useEffect, useState } from "react";
import axios from "axios";
import { userDelURL } from "../../api";
import "./Profile.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  company: {
    title: string;
    name: string;
  };
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(userDelURL);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
    
        };

        fetchUserDetails();
    }, []);

    if (!user) return <p className="loading">Loading...</p>;

    return (
        <div className="profilePage">
            <div className="profileCard">
        
                <div className="profileHeader"></div>
                
                <img src={user.image} alt="profile" className="profileImg" />
                <h2>{user.firstName} {user.lastName}</h2>
                <p className="job">{user.company.title} at {user.company.name}</p>
                <span className="memberId">Member ID #{user.id}</span>

                <div className="infoSection">
                    <div className="infoBox">
                         <h4>Contact Info</h4>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                    </div>

                    <div className="infoBox">
                        <h4>Address</h4>
                        <p>{user.address.address}</p>
                        <p>{user.address.city}, {user.address.state}</p>
                        <p>{user.address.postalCode}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;