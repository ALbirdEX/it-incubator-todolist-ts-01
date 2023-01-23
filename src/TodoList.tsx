import React, {ChangeEvent, memo, useCallback} from "react";
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
    tasks: TaskType[]
    filter: FilterValuesType

    removeTodolist: (todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskID: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = memo((props: TodoListPropsType) => {
    console.log("Todo")

    const addTask = useCallback((title: string) => {
        console.log("addTask")
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onAllClickHandler = () => {
        props.changeFilter(props.id, "All")
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id, "Active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, "Completed")
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id,])
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

    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === "Active") {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone) //task.isDone === false
    }
    if (props.filter === "Completed") {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone) //task.isDone === true
    }

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
                {tasksForTodolist.map((task) => {

                        const removeTaskHandler = () => {
                            props.removeTask(props.id, task.id)
                        }
                        const taskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = event.currentTarget.checked
                            props.changeTaskStatus(props.id, task.id, newIsDoneValue)
                        }
                        const taskTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(props.id, task.id, newValue)
                        }

                        return (
                            <div key={task.id}>
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
})


