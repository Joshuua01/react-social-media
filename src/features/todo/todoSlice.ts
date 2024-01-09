import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITodo } from "../../entities/ITodo";

export interface TodoState {
  todos: ITodo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return data;
});

const findHighestTodoId = (todos: ITodo[]) => {
  let highestId = 0;
  todos.forEach((todo) => {
    if (todo.id > highestId) {
      highestId = todo.id;
    }
  });
  return highestId;
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        id: findHighestTodoId(state.todos) + 1,
      };
      state.todos.unshift(newTodo);
    },
    removeTodo: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index, 1);
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index] = action.payload;
    },
    removeTodosByUserId: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.userId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const selectTodos = (state: { todos: TodoState }) => state.todos.todos;

export const { addTodo, removeTodo, editTodo, removeTodosByUserId } =
  todoSlice.actions;

export default todoSlice.reducer;
