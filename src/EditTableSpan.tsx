import React, {ChangeEvent, memo, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpan = {
    title: string
    onChange: (newValue: string) => void
}

export const EditTableSpan = memo((props: EditableSpan) => {

    console.log("EditTableSpan")

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ?
            <TextField variant="outlined"
                       label="Enter your text"
                       multiline

                       value={title}
                       onChange={onChangeTitleHandler}
                       onBlur={activateViewMode}
                       autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})