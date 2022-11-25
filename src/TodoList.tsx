import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>

    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskID: string, todolistID: string, isDone: boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string | number
    isDone: boolean
}



export function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {setTitle(event.currentTarget.value)}

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is reguired")
        }
    }

    const onAllClickHandler = () => {props.changeFilter("All", props.id)}

    const onActiveClickHandler = () => {props.changeFilter("Active", props.id)}

    const onCompletedClickHandler = () => {props.changeFilter("Completed", props.id)}

    const removeTodolistHandler = () => {props.removeTodolist(props.id)}

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolistHandler}><span role="img" aria-label="Delete">❌</span></button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error? "error" : ""}
                />

                <button onClick={addTaskHandler}><span role="img" aria-label="Plus">➕</span></button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ol>
                {props.tasks.map((task) => {

                        const removeTaskHandler = () => {props.removeTask(task.id, props.id)}
                        const taskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = event.currentTarget.checked
                            props.changeTaskStatus(task.id, props.id, newIsDoneValue)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={taskStatusHandler}
                                />
                                <span>{task.title}</span>
                                <button onClick={removeTaskHandler}><span role="img" aria-label="Delete">❌</span></button>
                            </li>
                        )
                    }
                )
                }
            </ol>
            <div>
                <button className={props.filter === "All" ? "active-filter" : "button"}
                        onClick={onAllClickHandler}>All <span role="img" aria-label="Checked">✔</span></button>
                <button className={props.filter === "Active" ? "active-filter" : "button"}
                        onClick={onActiveClickHandler}>Active <span role="img" aria-label="Checked">✔</span></button>
                <button className={props.filter === "Completed" ? "active-filter" : "button"}
                        onClick={onCompletedClickHandler}>Completed <span role="img" aria-label="Checked">✔</span></button>
            </div>
        </div>
    )
}