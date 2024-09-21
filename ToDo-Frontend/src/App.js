import './App.css';
import React from "react";
import TodosContainer from './components/TodosContainer';
import Home from './components/Home';
import TaskDetailed from './components/TaskDetailed';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/todoManager' element={<TodosContainer />}></Route>
        <Route exact path="/todo/:id" element={<TaskDetailed />}></Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
