import React, {memo, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/DeleteTwoTone";
import {ButtonGroup} from "@mui/material";
import {Task} from "./Task";


type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    removeTodolist: (todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    removeTask: (todolistId: string, taskID: string) => void
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskID: string, newTitle: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = memo((props: TodoListPropsType) => {
    console.log("Todo")
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)

    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }, [props.todolistId, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "All")
    }, [props.changeFilter, props.todolistId])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "Active")
    }, [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "Completed")
    }, [props.changeFilter, props.todolistId])

    const buttons = [
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
                {tasksForTodolist.map(task => <Task
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.todolistId}
                    task={task}
                    key={task.id}/>
                )}
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

