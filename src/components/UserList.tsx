import { useSelector } from "react-redux";
import {
  selectUsers,
  selectError,
  selectLoading,
} from "../features/user/userSlice";
import { User } from "../entities/User";

const UserList: React.FC = () => {
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}> {user.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
