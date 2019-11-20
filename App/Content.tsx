import * as m from "mithril";
import { IRenderProps } from "./Interfaces";

interface IState {
    counter?: number;
}

export default (props: IRenderProps<IState>) => {
    if (props.init) {
        props.setState(state => ({ counter: 1 }));
    }

    const state = props.getState();

    return (
        <div class="container mt-4 mb-4">
            <button
                type="button"
                class="btn btn-primary btn-lg"
                onclick={event => {
                    props.setState(state => ({ counter: state.counter + 1 }));
                    props.redraw();
                }}>
                Hello World!{new Array(state.counter).join("!")}
            </button>
        </div>
    );
};
