import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

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

    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks)
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        let task = tasks.map(task => task.id === taskId? {...task, isDone} : task)    // тут вопрос! {...task, isDone}
        setTasks(task)
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
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;
