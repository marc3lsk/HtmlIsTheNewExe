import * as m from "mithril";
import { IRenderProps } from "./Interfaces";

interface IState {
    tick?: number;
}

export default (props: IRenderProps<IState>) => {
    if (props.init) {
        props.setState(state => ({ tick: 1 }));
    }

    const state = props.getState();

    return (
        <div class="float-right">
            <button
                type="button"
                class="btn btn-outline-secondary"
                oncreate={vnode => {
                    setInterval(() => {
                        props.setState(state => ({ tick: state.tick + 1 }));
                        props.redraw();
                    }, 1000);
                }}
                onclick={event => {
                    props.setState(state => ({ tick: state.tick - 1 }));
                    props.redraw();
                }}>
                {state.tick}
            </button>
        </div>
    );
};
