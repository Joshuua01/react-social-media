import React, { useState } from "react";
import Navbar from "./Navbar";
import { addTodo, selectTodos } from "../features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";
import Todo from "./Todo";
import { AppDispatch } from "../tools/store";

const TodosPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectCurrentUser);
  const userTodos = useSelector(selectTodos).filter(
    (todo) => todo.userId === currentUser?.id
  );
  const [todoTitle, setTodoTitle] = useState("");

  const handleTodoAdd = () => {
    if (todoTitle) {
      dispatch(
        addTodo({
          userId: currentUser?.id,
          title: todoTitle,
          completed: false,
        })
      );
      setTodoTitle("");
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-900">
      <Navbar />
      <div className="w-full flex justify-center items-center mt-5">
        <div className="w-7/12 flex">
          <div className="w-4/5 min-w-0">
            <input
              type="text"
              placeholder="Enter title..."
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              className="relative block w-full rounded-l-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            />
          </div>
          <button
            type="button"
            onClick={handleTodoAdd}
            className="min-w-0 flex-1 relative items-center gap-x-1.5 rounded-r-md px-3 py-1.5 text-sm font-semibold text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
          >
            Add Todo
          </button>
        </div>
      </div>

      <div className="flex justify-center p-8 w-full">
        <div className="flex flex-col justify-center items-start w-1/2 gap-2">
          {userTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
