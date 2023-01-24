import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm is called")
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is reguired")
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       label="Enter your text"
                       multiline
                       error={!!error}
                       helperText={error}

                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ""}
            />

            <Button variant="contained"
                    color="inherit"
                    size="large"
                    onClick={addTaskHandler}>
                <span role="img" aria-label="Plus">➕</span>
            </Button>
        </div>
    )
})