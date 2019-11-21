import * as m from "mithril";
import "bootstrap/dist/css/bootstrap.min.css";
import { getState, setState } from "./State";
import $Content from "./Content";
import $Footer from "./Footer";

function redraw() {
    m.render(document.body, [
        <div class="flex-grow-1">{$Content({ redraw, getState, setState })}</div>,
        <footer
            class="d-block bg-light p-3"
            oncreate={function(vnode) {
                function _redraw() {
                    if (getState().tick % 5 == 0) {
                        setState(state => ({ counter: state.counter + 1 }));
                        redraw();
                    }
                    m.render(vnode.dom, $Footer({ redraw: _redraw, getState, setState }));
                }
                _redraw();
            }}></footer>
    ]);
}

export default redraw;
