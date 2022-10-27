import React from "react";
import {filterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>   // tasks: TaskType[]
    removeTask: (taskIid: number) => void
    changeFilter: (value: filterValuesType) => void
}

/*export type TaskType = {     //export т.к. передавали бы в App.tsx
    id: number
    title: string
    isDone: boolean
}*/

export function TodoList(props: TodoListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ol>
                {props.tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={() => {props.removeTask(task.id)}}>
                                    X
                                </button>
                                {/*()=>{alert(task.id)}  опускаем {}*/}
                            </li>
                        )
                    }
                )
                }
                {/* <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ol>
            <div>
                <button onClick={()=>{props.changeFilter("All")}}>All</button>
                <button onClick={()=>{props.changeFilter("Active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("Completed")}}>Completed</button>
            </div>
        </div>
    )
}