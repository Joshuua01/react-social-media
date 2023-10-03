import { User } from "../entites/User";

export const getAllUsers = (): Promise<User[]> => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users: User[]) => {
      return users;
    });
};
