import * as m from "mithril";
import "bootstrap/dist/css/bootstrap.min.css";
import { getState, setState } from "./State";
import $Content from "./Content";
import $Footer from "./Footer";

function redraw(init = false) {
    m.render(document.body, [
        <div class="flex-grow-1">{$Content({ redraw, getState, setState, init })}</div>,
        <footer
            class="d-block bg-light p-3"
            oncreate={vnode => {
                var redraw = function(init = false) {
                    m.render(vnode.dom, $Footer({ redraw, getState, setState, init }));
                };
                redraw(init);
            }}></footer>
    ]);
}

export default redraw;
