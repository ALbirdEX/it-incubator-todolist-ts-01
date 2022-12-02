import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpanPropsType";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>

    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskID: string, todolistID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, todolistID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}



export function TodoList(props: TodoListPropsType) {

   /* const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)*/


   /* const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {setTitle(event.currentTarget.value)}

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }*/

/*
    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id)
            setTitle("")
        } else {
            setError("Title is reguired")
        }
    }
*/

    const addItem = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => {props.changeFilter("All", props.id)}

    const onActiveClickHandler = () => {props.changeFilter("Active", props.id)}

    const onCompletedClickHandler = () => {props.changeFilter("Completed", props.id)}

    const removeTodolistHandler = () => {props.removeTodolist(props.id)}

    const cangeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}



    return (
        <div>
            <h3><EditableSpan title={props.title}
                              onCahge={cangeTodolistTitle}/>
                <button onClick={removeTodolistHandler}><span role="img" aria-label="Delete">❌</span></button></h3>
            <div>
                <AddItemForm addTask={addItem}/>
            </div>
            <ol>
                {props.tasks.map((task) => {

                    const removeTaskHandler = () => {props.removeTask(task.id, props.id)
                    }
                    const taskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(task.id, props.id, newIsDoneValue)
                    }
                    const taskTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(task.id, props.id, newValue)
                    }


                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={taskStatusHandler}
                                />
                                <EditableSpan title={task.title}
                                               onCahge={taskTitleHandler}/>
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


