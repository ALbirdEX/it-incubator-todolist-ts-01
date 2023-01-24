import React, {useReducer} from 'react';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBarMenu} from "./AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "All" | "Active" | "Completed"

function AppWithReducer() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "All"},
        {id: todolistID2, title: "What to byu", filter: "All"},
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "graphGL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "banana", isDone: true},
            {id: v1(), title: "book", isDone: false},
        ],
    })

    function removeTask(todolistId: string, taskID: string) {
        dispatchToTasksReducer(removeTaskAC(todolistId, taskID))
    }

    function addTask(todolistId: string, title: string) {
        dispatchToTasksReducer(addTaskAC(todolistId, title))
    }

    function changeStatus(todolistId: string, taskID: string, isDone: boolean) {
        dispatchToTasksReducer(changeTaskStatusAC(todolistId, taskID, isDone))
    }

    function changeTaskTitle(todolistId: string, taskID: string, newTitle: string) {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskID, newTitle))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value))
    }

    function removeTodolist(todolistId: string) {
        let action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle))
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    return (
        <div>
            <AppBarMenu/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {

                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks

                        if (tl.filter === "Active") {
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone) //task.isDone === false
                        }
                        if (tl.filter === "Completed") {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone) //task.isDone === true
                        }

                        return <Grid key={tl.id} item>
                            <Paper elevation={3}
                                   style={{padding: "10px"}}>
                                <TodoList
                                    todolistId={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}

                                    removeTodolist={removeTodolist}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    filter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducer;
