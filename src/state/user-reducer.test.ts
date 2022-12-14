import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: "Alex"}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: "Alex"}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
    expect(endState.name).toBe("Alex")
})

test('user reducer should change name of user', () => {
    const startState = {name: "Alex", age: 20, childrenCount: 2}

    const newName = "Victor"

    const endSate = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endSate.name).toBe(newName)
})