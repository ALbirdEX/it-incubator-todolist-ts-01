import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string | number
    isDone: boolean
}

export type filterValuesType = "All" | "Active" | "Completed"

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "graphGL", isDone: false},
    ])

    const [filter, setFilter] = useState<filterValuesType>("All")

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks)
    }

    function changeFilter(value: filterValuesType) {  //"All" | "Active" | "Completed"
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if (filter === "Active") {
        tasksForTodolist = tasks.filter(task => !task.isDone) //task.isDone === false
    }
    if (filter === "Completed") {
        tasksForTodolist = tasks.filter(task => task.isDone) //task.isDone === true
    }

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodolist}

                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
