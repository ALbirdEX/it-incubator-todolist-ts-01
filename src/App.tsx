import React, {useState} from 'react';
import {v1} from "uuid";
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBarMenu} from "./AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export type FilterValuesType = "All" | "Active" | "Completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: "All"},
        {id: todolistID2, title: "What to byu", filter: "All"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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

    function removeTask(taskID: string, todolistId: string) {
        /*        let todolistTasks = tasks[todolistID]
                tasks[todolistID] = todolistTasks.filter(task => task.id !== taskID)*/
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((t => t.id !== taskID))})
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        /*let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...todolistTasks]*/
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
    }

    function changeStatus(taskID: string, todolistId: string, isDone: boolean) {
        // let todolistTasks = tasks[todolistID]
        //   let task = todolistTasks.find(task => task.id === taskID)
        //   if (task) {
        //       task.isDone = isDone
        //       setTasks({...tasks})
        //   }
        /*  let arrTasks = tasks[todolistID];
          let mapTasks = arrTasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
          tasks[todolistID] = mapTasks
          setTasks({...tasks})*/
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, isDone} : t)})
    }

    function changeTaskTitle(taskID: string, todolistId: string, newTitle: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, title: newTitle} : t)})
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {  //"All" | "Active" | "Completed"
        //let todolist = todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist)
        setTodolists([...todolists.map(todolist => todolist.id === todolistId ? {
            ...todolist,
            filter: value
        } : todolist)])
    }

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: "All"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function changeTodolistTitle(todolistId: string, newTitle: string) {
        setTodolists([...todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t)])
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

export default App;
