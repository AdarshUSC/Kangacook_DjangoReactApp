import React, {useState, useEffect} from 'react';
import axios from 'axios'

export default function  Todos(){

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        fetchTasks();
    },[]);

    const fetchTasks = async () => {
        try{
            const response = await axios.get('http://localhost:8000/api/todos/');
            setTasks(response.data);
            console.log(response.data);
        } catch(err){
            console.error('error :::: ', err);
        }
    }

    const deleteTask = async (taskId) => {
        try{
            const response = await axios.delete(`http://localhost:8000/api/todos/${taskId}/delete`);
            const updatedTasks = tasks.filter(task => task.id !== taskId)
            setTasks(updatedTasks)
        } catch(err){
            console.error('error :::: ', err);
        }
    }

    const addTask = async () => {
        try{
            if(inputValue.trim() !== ''){
                const response = await axios.post('http://localhost:8000/api/todos/add', {
                    title : inputValue
                });
                setTasks([...tasks, response.data]);
                setInputValue('');
            }
        } catch(err){
            console.error(err);
        }
    }
 
    return (
        <div className="container">
            <div className="todo-app">
                <div className="app-title">
                    <h2 >To-do app</h2>
                    <i className="fa-solid fa-book-bookmark"></i>
                </div>
                <div className="row">
                    <input type="text" id="input-box" 
                        placeholder="add your tasks" 
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button onClick={addTask}>Add</button>
                </div>
                <ul id="list-container">
                
                    {
                        tasks.map( task => {

                            return (
                            <li key={task.id} >{task.title} 
                            <span onClick = {()=> deleteTask(task.id)}> X</span>
                            </li>)
                        })
                    }

                </ul>
            </div>
    </div>
    )
}