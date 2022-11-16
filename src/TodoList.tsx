import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>

    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: filterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: filterValuesType
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
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError("Title is reguired")
        }
    }

    const onAllClickHandler = () => {props.changeFilter("All")}

    const onActiveClickHandler = () => {props.changeFilter("Active")}

    const onCompletedClickHandler = () => {props.changeFilter("Completed")}

    return (
        <div>
            <h3>{props.title}</h3>
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

                    const removeTaskHandler = () => {props.removeTask(task.id)}
                    const TaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        console.log(newIsDoneValue)
                        props.changeTaskStatus(task.id, newIsDoneValue)
                    }

                        return (
                            <li key={task.id} className={task.isDone? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={TaskStatusHandler}
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
                <button className={props.filter === "All" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All<span role="img" aria-label="Checked">✔</span></button>
                <button className={props.filter === "Active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active<span role="img" aria-label="Checked">✔</span></button>
                <button className={props.filter === "Completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed<span role="img" aria-label="Checked">✔</span></button>
            </div>
        </div>
    )
}