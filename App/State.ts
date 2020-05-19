import { IState } from "./Interfaces";

var staticState = {} as IState;

export function setState(newState: (state: IState) => IState) {
    staticState = {...staticState, ...newState(staticState)};
}

export function getState() {
    return staticState;
}