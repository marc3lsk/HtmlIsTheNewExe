import * as m from "mithril";
import "bootstrap/dist/css/bootstrap.min.css";
import { getState, setState } from "./State";
import $Content from "./Content";
import $Footer, { IState as IFooterState } from "./Footer";

function redraw() {
    m.render(document.body, [
        <div class="flex-grow-1">{$Content({ redraw, getState, setState })}</div>,
        <footer
            class="d-block bg-light p-3"
            oncreate={function (vnode) {
                /* mapping global state to local props */
                function getFooterState(): IFooterState {
                    return { tictoc: getState().tick };
                }
                function setFooterState(newState: (state: IFooterState) => IFooterState) {
                    setState((state) => ({ tick: newState({ tictoc: state.tick }).tictoc }));
                }

                /* local redraw (to prevent expensive global redraw) */
                function redrawFooter() {
                    if (getState().tick % 5 == 0) {
                        setState(state => ({ counter: state.counter + 1 }));
                        redraw();
                    }
                    m.render(
                        vnode.dom,
                        $Footer({
                            redraw: redrawFooter,
                            getState: getFooterState,
                            setState: setFooterState,
                        })
                    );
                }
                redrawFooter();
            }}></footer>,
    ]);
}

export default redraw;
