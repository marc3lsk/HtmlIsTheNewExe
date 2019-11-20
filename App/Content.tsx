import * as m from "mithril";
import { getState, setState } from "./State";
import redraw from "./App";

export default (init = false) => {
    if (init) {
        setState(state => ({ counter: 1}));
    }

    var state = getState();

    return (
        <div class="flex-grow-1">
            <div class="container mt-4 mb-4">
                <button
                    type="button"
                    class="btn btn-primary btn-lg"
                    onclick={event => {
                        setState(state => ({ counter: state.counter + 1}));
                        redraw();
                    }}>
                    Hello World!{new Array(state.counter).join("!")}
                </button>
            </div>
        </div>
    );
};
