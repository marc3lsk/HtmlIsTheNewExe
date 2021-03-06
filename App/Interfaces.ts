export interface IState {
    counter?: number;
    tick?: number;
}

export interface IRenderProps<IState> {
    redraw: () => any;
    getState: () => IState;
    setState: (newState: (state: IState) => IState) => void;
}