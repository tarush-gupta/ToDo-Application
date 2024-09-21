import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/taskAction';
import { toast } from 'react-toastify';


const TaskDetailed = () => {
  const { id } = useParams();

  const API_URL = "http://localhost:3000/tasks";

  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBody, setEditedBody] = useState({
    body: "",
    status: ""
  });

  const getTodo = () => {
    axios.get(API_URL + `/${id}`)
      .then(response => {
        setTodo(response.data.data)
        setEditedBody({
          body: response.data.data.body,
          status: response.data.data.status
        })
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    getTodo();
  }, [])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    console.log("event", e.target.value)
    setEditedBody({
      ...editedBody,
      body: e.target.value
    });
  };
  console.log("edited", editedBody)

  const handleSetStatus = (e) => {
    console.log("first", e.target.value)
    setEditedBody({
      ...editedBody,
      status: e.target.value
    })
  }

  const handleEditSubmit = () => {
    console.log("Body", editedBody)
    axios.put(API_URL + `/${todo.id}`, { body: editedBody.body, status: editedBody.status })
      .then((response) => {
        //setTodo({ ...todo, body: editedBody });
        setIsEditing(false);
        getTodo();
        toast.info("Task Updated")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    }
  };

  const navigate = useNavigate();

  const deleteTodo = (id) => {
    axios.delete(API_URL + `/${id}`)
      .then(response => {
        navigate('/todoManager');
        toast.error("Task Deleted")
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && <div className="task-detailed-container">
          <h2 className="task-title">{todo.title}</h2>
          {isEditing ? (
            <div className='edited-field'>
              <input
                type="text"
                value={editedBody.body}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <select onChange={handleSetStatus} value={editedBody.status} name="status" id="status">
                <option value="true">Completed</option>
                <option value="false">Incomplete</option>
              </select>
            </div>
          ) : (
            <p className="task-body">{todo.body}</p>
          )}

          <p className="task-status">Status: {todo.status ? 'Completed' : 'Incomplete'}</p>
          <div>Created at: {formatDate(todo.created_at)}</div>
          <div>Updated at: {formatDate(todo.updated_at)}</div>
          {!isEditing ? <button onClick={handleEditClick} className='edit-button'>
            Edit Task
          </button> :
            <button onClick={handleEditSubmit} className='edit-button'>
              Save Task
            </button>}
          <button onClick={() => deleteTodo(todo.id)} className='delete-button'>
            Delete Task
          </button>
        </div>
      }
    </>
  )
}

export default TaskDetailed