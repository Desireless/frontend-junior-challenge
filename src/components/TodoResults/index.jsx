import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { countChecked } from "utils/countChecked";
import "./styles.css";


const TodoResults = () => {
  // Fix an ability to calculate completed tasks // FIXED
  const {todos} = useSelector( state => state.todo);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let todosChecked = countChecked(todos); 

    setCount(todosChecked);
    
  }, [todos]);


  return <div className="todo-results">Done: {count}</div>;
};

export default TodoResults;
