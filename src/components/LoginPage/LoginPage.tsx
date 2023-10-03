import React from "react";
import { User } from "../../entites/User";

interface LoginPageProps {
  email: string;
  users: User[];
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setLoginError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  email,
  setEmail,
  users,
  setLoginError,
}) => {
  const handleLogin = () => {
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      console.log(`Logged in as ${email}`);
      setEmail(email);
      setLoginError(false);
    }
  };

  return (
    <div>
      <div>Login</div>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
