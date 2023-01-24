import React, {useCallback} from 'react';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBarMenu} from "./AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "All" | "Active" | "Completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log("AppWithRedux")
    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((todolistId: string, taskID: string) => {
        dispatch(removeTaskAC(todolistId, taskID))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskID, isDone))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskID, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    return (
        <div>
            <AppBarMenu/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper elevation={3}
                                   style={{padding: "10px"}}>
                                <TodoList
                                    todolistId={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}

                                    removeTodolist={removeTodolist}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    filter={tl.filter}/>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
