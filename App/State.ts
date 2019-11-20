interface IState {
    counter?: number;
    tick?: number;
}

var state = {} as IState;

export function setState(newState: (state: IState) => IState) {
    state = {...state, ...newState(state)};
}

export function getState() {
    return state;
}