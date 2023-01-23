import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to byu", filter: "All"},
    ]
})

test('correct todolist should be remove', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const newTodolistTitle = "New Todolist"

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("All")
})

test('correct todolist should change name', () => {

    const newTodolistTitle = "New Todolist"

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState.length).toBe(2)
})

test('correct filtered todolist should be changed', () => {

    const newFilter: FilterValuesType = "Completed"

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("All")
    expect(endState[1].filter).toBe(newFilter)
    expect(endState[1].title).toBe("What to byu")
})