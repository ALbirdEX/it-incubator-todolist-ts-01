import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@mui/material";
import {EditTableSpan} from "./EditTableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/DeleteTwoTone";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    removeTask: (todolistId: string, taskID: string) => void
    changeTaskStatus: (todolistId: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskID: string, newTitle: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = () => props.removeTask(props.todolistId, props.task.id)

    const taskStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue)
    }, [props.changeTaskStatus, props.todolistId, props.task.id])
    const taskTitleHandler = (newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    }
    return (
        <div>
            <Checkbox color="info"
                      size="small"
                      checked={props.task.isDone}
                      onChange={taskStatusHandler}/>
            <EditTableSpan title={props.task.title}
                           onChange={taskTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})