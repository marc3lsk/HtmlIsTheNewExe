import * as m from "mithril";

interface IState {
    tick?: number;
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
        setState(state => ({ tick: 1 }));
    }

    var state = getState();

    return (
        <div class="float-right">
            <button
                type="button"
                class="btn btn-secondary"
                oncreate={vnode => {
                    setInterval(() => {
                        setState(state => ({ tick: state.tick + 1 }));
                        redraw();
                    }, 1000);
                }}
                onclick={event => {
                    setState(state => ({ tick: state.tick - 1 }));
                    redraw();
                }}>
                {state.tick}
            </button>
        </div>
    );
};
