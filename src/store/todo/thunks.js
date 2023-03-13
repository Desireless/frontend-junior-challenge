import { toast } from 'react-toastify';
import { getNewId } from 'utils/getNewId';
import { startLoadingTodos, setTodos, addTodo, updateTodo, removeTodo, setCustomMessage } from './todoSlice'

const responseMessages = {
    200: 'OK',
    201: 'Created',
    404: 'Not Found',
}

const showErrorToast = (error) => toast.error(error, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;

export const getTodos = () => {
    return async(dispatch, getState) => {
        dispatch( startLoadingTodos() );
        
        try{
            
            const response = await fetch('https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos');
            const data = await response.json();
            
            if(response.status === 200){
                dispatch( setTodos( {todos: data} ) );
            }
            
            if(!response.ok){
                showErrorToast(responseMessages[response.status] || 'Error');
                toast.info('Look like we couldn\'t load the data from API', {
                    position: "bottom-right",
                    autoClose: 15000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                dispatch(setCustomMessage({isLoading: false, message: 'Look like we couldn\'t load the data from API'}));
            }

        }catch (err){
            throw(err);
        }
    }
}

export const postTodo = (todo) => {
    return async(dispatch, getState) => {
        // generate new id for the new todo
        let newId = getNewId(getState().todo.todos);

        let body = {
            id: newId,
            label: todo,
            checked: false,
        }

        try{
            const response = await fetch('https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if(response.status === 201){
                dispatch( addTodo(body))
            }

            if(!response.ok){
                showErrorToast(responseMessages[response.status] || 'Error');
            }

        }catch (err){
            throw(err);
        }

    }
}

export const patchTodo = (todoId, isChecked) => {
    return async(dispatch, getState) => {

        try{
            const response = await fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({checked: isChecked}),
            });

            if(response.status === 200){
                dispatch( updateTodo({todoId, isChecked}))
            }

            if(!response.ok){
                showErrorToast(responseMessages[response.status] || 'Error');
            }

        }catch (err){
            throw(err);
        }

    }
}

export const deleteTodo = (todoId) => {
    return async(dispatch, getState) => {

        try{
            const response = await fetch(`https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos/${todoId}`, {
                method: 'DELETE',
            });

            if(response.status === 200){
                dispatch( removeTodo({todoId}))
            }
            
            if(!response.ok){
                showErrorToast(responseMessages[response.status] || 'Error');
            }

        }catch (err){
            throw(err);
        }

    }
}