import {configureStore} from "@reduxjs/toolkit";
import {useMemo} from "react";
import {reducer} from "@/src/entities/entity";

let store:any;
const initStore = (preloadedState:any) => {
    return configureStore({
        preloadedState,
        reducer: {
            ...reducer
        }
    })
}

export const initializeStore = (preloadedState:any) => {
    let _store = store ?? initStore(preloadedState)


    if(preloadedState && store){
        _store = initStore({
            ...store.getState(),
            ...preloadedState
        })
        store = undefined
    }
    if(typeof window == 'undefined') return _store
    if(!store) store = _store

    return store
}

export const useStore = (initialState:any) => {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}



