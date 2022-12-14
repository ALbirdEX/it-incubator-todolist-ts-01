import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/DeleteTwoTone";
import {ButtonGroup, Checkbox} from "@mui/material";


type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskID: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskID: string, todolistId: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, todolistId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
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

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter("All", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("Active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("Completed", props.id)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const buttons =
        [
            <Button color={props.filter === "All" ? "info" : "inherit"}
                    size="medium"
                    onClick={onAllClickHandler}>All{props.filter === "All" ?
                <span role="img" aria-label="Checked">✔</span> : ''}</Button>,
            <Button color={props.filter === "Active" ? "info" : "inherit"}
                    size="medium"
                    onClick={onActiveClickHandler}>Active{props.filter === "Active" ?
                <span role="img" aria-label="Checked">✔</span> : ''}</Button>,
            <Button color={props.filter === "Completed" ? "info" : "inherit"}
                    size="medium"
                    onClick={onCompletedClickHandler}>Completed{props.filter === "Completed" ?
                <span role="img" aria-label="Checked">✔</span> : ''}</Button>
        ]

    return (
        <div>
            <h3>
                <EditTableSpan title={props.title}
                               onChange={changeTodolistTitle}/>

                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                {props.tasks.map((task) => {

                        const removeTaskHandler = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const taskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = event.currentTarget.checked
                            props.changeTaskStatus(task.id, props.id, newIsDoneValue)
                        }
                        const taskTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, props.id, newValue)
                        }

                        return (
                            <div key={task.id} className={task.isDone ? "is-done" : ""}>

                                <Checkbox color="info"
                                          size="small"

                                          checked={task.isDone}
                                          onChange={taskStatusHandler}/>

                                <EditTableSpan title={task.title}
                                               onChange={taskTitleHandler}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    }
                )
                }
            </div>
            <div>
                <ButtonGroup variant="contained"
                             color="inherit">
                    {buttons}
                </ButtonGroup>
            </div>
        </div>
    )
}


