import * as m from "mithril";
import { getState, setState } from "./State";
import redraw from "./App";

export default (init = false) => {
    if (init) {
        setState(state => ({ tick: 1 }));
    }

    var state = getState();

    return (
        <footer class="d-block bg-light p-3">
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
        </footer>
    );
};
