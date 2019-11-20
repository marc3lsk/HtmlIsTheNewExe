import * as m from "mithril";

interface IState {
    counter?: number;
}

export default ({
    redraw,
    getState,
    setState,
    init = false
}: {
    redraw: () => any;
    getState: () => IState;
    setState: (newState: (state: IState) => IState) => void;
    init?: boolean;
}) => {
    if (init) {
        setState(state => ({ counter: 1 }));
    }

    var state = getState();

    return (
        <div class="container mt-4 mb-4">
            <button
                type="button"
                class="btn btn-primary btn-lg"
                onclick={event => {
                    setState(state => ({ counter: state.counter + 1 }));
                    redraw();
                }}>
                Hello World!{new Array(state.counter).join("!")}
            </button>
        </div>
    );
};
