import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Active" | "Completed"

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: "What to learn", filter: "All"},
        {id: todolistID2, title: "What to byu", filter: "Completed"},
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
            {id: v1(), title: "ReactJS", isDone: false},
        ],
    })

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function removeTask(taskID: string, todolistID: string) {
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistID]
        tasks[todolistID] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, todolistID: string, isDone: boolean) {
        let todolistTasks = tasks[todolistID]
          let task = todolistTasks.find(task => task.id === taskID)
          if (task) {
              task.isDone = isDone
              setTasks({...tasks})
          }
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {  //"All" | "Active" | "Completed"
        let todolist = todolists.map(todolist => todolist.id === todolistID ? {...todolist, filter: value} : todolist)
        setTodolists(todolist)
    }


    return (
        <div className="App">
            {todolists.map(todolist => {

                let allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks

                if (todolist.filter === "Active") {
                    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone) //task.isDone === false
                }
                if (todolist.filter === "Completed") {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone) //task.isDone === true
                }

                return <TodoList key={todolist.id}
                                 id={todolist.id}
                                 title={todolist.title}
                                 tasks={tasksForTodolist}

                                 removeTodolist={removeTodolist}
                                 addTask={addTask}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 changeTaskStatus={changeTaskStatus}
                                 filter={todolist.filter}
                />
            })}
        </div>
    )
}

export default App;
