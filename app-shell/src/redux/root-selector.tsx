import { createSelector } from 'reselect';

const selectorHostState = (state: {host: {currentUser: {name: string, id: number}}}) => {
    console.log(state, 'wee');
    return state.host;
};

export const selctHostState = createSelector(
    [selectorHostState],
    state => state.currentUser
);