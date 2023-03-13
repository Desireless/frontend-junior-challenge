import React from "react";
import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo, patchTodo } from "../../store/todo";
import TodoListItem from "../TodoListItem";
import "./styles.css";


const TodoList = () => {

  const dispatch = useDispatch();
  const {todos = [], isLoading} = useSelector( state => state.todo);


  const handleDelete = (todoId) => {
    // Fix an ability to delete task // FIXED
    dispatch( deleteTodo(todoId) )
  };

  const toggleCheck = (todoId, isChecked) => {
    // Fix an ability to toggle task // FIXED
    dispatch(patchTodo(todoId, isChecked));
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch])
  

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      { isLoading && <span>Loading...</span> }
      <div className="todo-list-content">
        {/* Fix an ability to render todos // FIXED*/}
        <ul>
          { 
            todos?.map( ({id, label, checked}) => (
              <TodoListItem  key={id} label={label} checked={checked} onDelete={() => handleDelete(id)} onCheck={(e) => toggleCheck(id, e.target.checked)}/>

            ))
          } 
        </ul>
      </div>
      { isLoading === false && todos.length === 0 && <div className="no-todos">Looks like you&apos;re absolutely free today!</div> }
    </div>
  );
};

export default TodoList;
