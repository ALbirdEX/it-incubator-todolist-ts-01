import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onCahge: (newValue: string) => void
}



export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onCahge(title)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title}
                     onChange={onChangeHandler}
                     onBlur={activateViewMode}
                     autoFocus/>

            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}