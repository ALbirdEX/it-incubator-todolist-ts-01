import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string | number
    isDone: boolean
}

export type filterValuesType = "All" | "Active" | "Completed"

function App() {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "graphGL", isDone: false},
    ])

    let [filter, setFilter] = useState<filterValuesType>("All")

    function removeTask(id: number) {
        // let filteredTasks = tasks.filter(task => task.id !== id) - убрал переменную
        setTasks(tasks.filter(task => task.id !== id))
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
                      removeTask={removeTask}
                      changeFilter={changeFilter}

            />
        </div>
    )
}

export default App;
