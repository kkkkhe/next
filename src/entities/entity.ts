import {createSlice, createSelector, PayloadAction} from "@reduxjs/toolkit";
const initialState = {
    score: 0,
    todos: []
}
type State = typeof initialState
const slice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        increase(state){
            state.score++
        },
        setTodos(state, action: PayloadAction<any[]>){
            state.todos = [...action.payload]
        }
    }
})
type RootStore = Record<string, unknown>
const createBaseSelector = <State>(name:string) => {
    return (state: RootStore) => {
        if(name in state){
            return state[name] as State
        }
    }
}
const baseSelector = createBaseSelector<State>(slice.name)

const selectSelf = (state:State) => state[slice.name]
const score = createSelector(selectSelf, (state) => state.score)
const todos = createSelector(selectSelf, (state) => state.todos)
export const selectors = {
    score,
    todos
}
export const actions = {
    setTodos: slice.actions.setTodos
}
export const reducer = {[slice.name]: slice.reducer}