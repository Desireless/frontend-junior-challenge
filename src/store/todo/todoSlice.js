import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        isLoading: false,
        errorMessage: null,
    },
    reducers: {
        startLoadingTodos: (state) => {
            state.isLoading = true;
        },
        setCustomMessage:(state, action) => {
            state.isLoading = action.payload.isLoading;
            state.errorMessage = action.payload.message;
        },
        setTodos: (state, action) => {
            state.isLoading = false;
            state.todos = action.payload.todos;
        },
        addTodo: (state, action) => {
            // Redux toolkit allows the use of push
            state.todos.push(action.payload);

        },
        updateTodo: (state, action) => {
            // get the todo to update
            const todoDetected = state.todos.find( todo => todo.id === action.payload.todoId);
            // if todoDetected isn't undefined, update
            if(todoDetected){
                todoDetected.checked = action.payload.isChecked;
            }

        },
        removeTodo: (state, action) => {
            // get the todo to update
            const todoDetected = state.todos.find( todo => todo.id === action.payload.todoId);
            // if todoDetected isn't undefined, update
            if(todoDetected){
                // Redux toolkit allows the use of splice
                state.todos.splice(state.todos.indexOf(todoDetected), 1);
            }

        },

    },
})

export const { startLoadingTodos, setTodos, addTodo, updateTodo, removeTodo, setCustomMessage } = todoSlice.actions;