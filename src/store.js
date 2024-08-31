import { createStore } from 'redux';

const initialState = {
    user: {},
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER": return {...state, user: action.payload}
        default: return state;
    }
}

const store = createStore(reducer);

export default store;