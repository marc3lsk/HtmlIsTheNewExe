import * as m from "mithril";
import { IRenderProps } from "./Interfaces";

export interface IState {
    tictoc?: number;
}

export default (props: IRenderProps<IState>) => {
    props.setState((state) => ({ tictoc: state.tictoc ?? 1 }));

    const state = props.getState();

    return (
        <div class="float-right">
            <button
                type="button"
                class="btn btn-outline-secondary"
                oncreate={(vnode) => {
                    setInterval(() => {
                        props.setState((state) => ({ tictoc: state.tictoc + 1 }));
                        props.redraw();
                    }, 1000);
                }}
                onclick={(event) => {
                    props.setState((state) => ({ tictoc: state.tictoc - 1 }));
                    props.redraw();
                }}>
                {state.tictoc}
            </button>
        </div>
    );
};
