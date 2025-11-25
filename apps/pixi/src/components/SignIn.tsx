import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

interface IUserData {
  username: string;
  password: string;
}

const SignIn = () => {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    password: "",
  });

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // axios.post("http://localhost:3000/v1/user/signin", userData);
      login(userData.username, userData.password);
    } catch (error) {
      console.error(error);
    }

    // alert(JSON.stringify(userData));
    setUserData({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignIn;
