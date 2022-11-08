import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>

    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: filterValuesType) => void
}

export function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState("")

    const addTask = () => {props.addTask(title); setTitle("")}

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {setTitle(event.currentTarget.value)}

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{if(event.key === "Enter"){addTask()}}

    const onAllClickHandler = () => {props.changeFilter("All")}

    const onActiveClickHandler = () => {props.changeFilter("Active")}

    const onCompletedClickHandler = () => {props.changeFilter("Completed")}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ol>
                {props.tasks.map((task) => {

                    const onClickHandler = () => {props.removeTask(task.id)}

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onClickHandler}>X</button>
                            </li>
                        )
                    }
                )
                }
            </ol>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}