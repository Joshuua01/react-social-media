import "./App.css";
import { useState, useEffect } from "react";
import { User } from "./entites/User";
import { getAllUsers } from "./actions/userActions";
import { LoginPage } from "./components/LoginPage/LoginPage";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(true);

  useEffect(() => {
    getAllUsers()
      .then((userList) => {
        setUsers(userList);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  });

  return (
    <div>
      {loginError && (
        <LoginPage
          email={email}
          users={users}
          setEmail={setEmail}
          setLoginError={setLoginError}
        />
      )}
    </div>
  );
};

export default App;
