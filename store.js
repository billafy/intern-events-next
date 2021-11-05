import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers/";

import { defaultInputs, internshipInputs } from "./utils/inputFields";

let store;

export const initialState = {
    auth: {
        accountInput: defaultInputs,
        inputError: "",
        loading: true,
        isLoggedIn: false,
        account: {},
        width: 0,
    },
    social: {
        posts: [],
        chats: [],
        selectedChat: {},
        text: "",
    },
    internships: {
        internships: [],
        internshipInput: internshipInputs,
        internship: {},
        inputError: "",
        stipendFilter: { max: 0, min: 0 },
        durationFilter: { max: 0, min: 0 },
        filters: {
            category: "All",
            stipend: 0,
            duration: 0,
            keyword: "",
        },
    },
};

function initStore(preloadedState = initialState) {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
    );
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState);
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        store = undefined;
    }
    if (typeof window === "undefined") return _store;
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}