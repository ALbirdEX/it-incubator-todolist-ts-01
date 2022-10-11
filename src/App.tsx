import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string | number
    isDone: boolean
}

function App() {
   /* const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "Songs"*/

    const todoListTitle = [
        {id:1, title:"What to learn" },
        {id:2, title:"Songs" },
    ]

    const tasks1: Array<TaskType>= [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: "MUTTER", isDone: true},
        {id: 2, title: "Ich Will", isDone: false},
        {id: 3, title: "RAMMSTEIN", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle[0].title} tasks={tasks1}/>
            <TodoList title={todoListTitle[1].title} tasks={tasks2}/>
        </div>
    )
}

export default App;
