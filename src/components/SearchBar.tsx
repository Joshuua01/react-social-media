import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../features/user/userSlice";
import { IUser } from "../entities/IUser";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const users = useSelector(selectUsers);
  const [searchResult, setSearchResult] = useState<IUser[]>([]);

  const navigation = useNavigate();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length !== 0) {
      setSearchResult(
        users.filter((user) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setSearchResult([]);
    }
    console.log(searchResult);
  };

  const handleShowUser = (user: IUser): void => {
    navigation(`/users/?user=${user.id}`);
  };

  return (
    <div className="flex flex-col overflow-visible z-50 relative">
      <input
        type="text"
        id="searchQuery"
        className="border text-sm rounded-lg ring-1 ring-gray-600 focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
        placeholder="Search user..."
        value={searchQuery}
        autoComplete="off"
        onChange={handleSearch}
      />
      {searchResult.length > 0 && (
        <div className="flex flex-col gap-2 mt-2 absolute rounded-lg p-2.5 top-10 left-0 right-0 bg-gray-900 border border-indigo-600">
          {searchResult.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-gray-700 p-2 text-white shadow-lg rounded-lg cursor-pointer"
              onClick={() => handleShowUser(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
