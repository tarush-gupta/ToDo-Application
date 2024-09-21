import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/taskAction';
import { toast } from 'react-toastify';


const TodosContainer = () => {

    const API_URL = "http://localhost:3000/tasks";

    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos();
    }, [])

    const getTodos = () => {
        axios.get(API_URL)
            .then(response => {
                setTodos(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const createTodo = (e) => {
        e.preventDefault();
        const title = e.target.elements.taskTitle.value;
        const body = e.target.elements.taskDesc.value;

        axios.post(API_URL, { title: title, body: body, status: false })
            .then(response => {
                getTodos();
                e.target.reset();
                toast.success("Task Created Successfully")
            })
            .catch(error => console.log(error))
    }

    const updateTodo = (e, id) => {
        axios.put(API_URL + `/${id}`, { status: e.target.checked })
            .then((response) => {
                getTodos();
                if(!e.target.checked){
                    toast.success("Task Done")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const confirmDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteTodo(id);
        }
    }

    const deleteTodo = (id) => {
        axios.delete(API_URL + `/${id}`)
            .then(response => {
                getTodos();
                toast.error("Task Deleted")
            })
            .catch(error => console.log(error))
    }
    return (
        <div className="container">
            <div className="headerTop">
                <h1>Todo</h1>
            </div>
            <div>
                <form className="form" onSubmit={createTodo}>
                    <div className="title">
                        <input
                            className="form-input"
                            type="text"
                            placeholder="Add a task"
                            maxLength="50"
                            name="taskTitle" required />
                    </div>
                    <div className="description">
                        <textarea
                            className="form-input form-description"
                            placeholder="Write the description"
                            name="taskDesc" />
                    </div>
                    <button type="submit" className="form-button">Add Task</button>
                </form>


                <div className="listWrapper">
                    <ul className="taskList">
                        {todos.map((todo) => {
                            return (
                                <li className="task" todo={todo} key={todo.id}>
                                    <div className='task-container'>
                                        <div className='task-section task-name'>
                                            <input className="taskCheckbox" type="checkbox"
                                                checked={todo.status}
                                                onChange={(e) => updateTodo(e, todo.id)} />
                                            <label className="taskLabel">{todo.title}</label>
                                        </div>
                                        <label className="date task-section">{formatDate(todo.created_at)}</label>
                                        <div className='task-section'>
                                            <Link to={`/todo/${todo.id}`} className='view-button'>View</Link>
                                        </div>
                                        <span className="deleteTaskBtn task-section"
                                            onClick={(e) => confirmDelete(todo.id)}>X</span>
                                    </div>

                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodosContainer;