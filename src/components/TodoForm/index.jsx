import React, { useRef } from "react";
import {useDispatch} from 'react-redux';
import { postTodo } from "store/todo";
import "./styles.css";

const TodoForm = () => {

    const inputRef = useRef();
    const buttonRef = useRef();

    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(inputRef.current.value === '') return;

        dispatch(postTodo(inputRef.current.value))
        inputRef.current.value = '';
    }

    return (

        <form onSubmit={handleSubmit} className="todo-form">
            <input
            className="todo-form-input"
            type="text"
            placeholder="Code some tests for TodoForm component..."
            onKeyDown={(e) => { if(e.key === 'Enter')  handleSubmit(e)} }
            ref={inputRef}
            />
            <button
            className="todo-form-button"
            ref={buttonRef}
            >ADD TO DO</button>
        </form>
    )
}

export default TodoForm;