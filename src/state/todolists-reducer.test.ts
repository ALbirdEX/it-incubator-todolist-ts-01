import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";
import {
    ActionType,
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be remove', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to byu", filter: "All"},
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = "New Todolist"

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to byu", filter: "All"},
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("All")
})

test('correct todolist should change name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = "New Todolist"

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to byu", filter: "All"},
    ]

    const action: ActionType = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)  // const action: ActionType ??

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState.length).toBe(2)
})

test('correct filtered todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const newFilter: FilterValuesType = "Completed"

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to byu", filter: "All"},
    ]

    const action = ChangeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("All")
    expect(endState[1].filter).toBe(newFilter)
    expect(endState[1].title).toBe("What to byu")
})