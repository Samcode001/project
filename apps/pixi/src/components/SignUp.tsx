import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

interface IUserData {
  name: string;
  username: string;
  password: string;
}

const SignUp = () => {
  const [userData, setUserData] = useState<IUserData>({
    name: "",
    username: "",
    password: "",
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // axios.post("http://localhost:3000/signup", userData);
      signUp(userData.name, userData.username, userData.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }

    // alert(JSON.stringify(userData));
    setUserData({
      name: "",
      username: "",
      password: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="name">Alias</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUp;
