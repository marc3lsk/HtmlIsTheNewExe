import * as m from "mithril";
import "bootstrap/dist/css/bootstrap.min.css";
import { getState, setState } from "./State";
import content from "./Content";
import footer from "./Footer";

function redraw(init = false) {
    m.render(document.body, [
        <div
            class="flex-grow-1"
            oncreate={vnode => {
                var redraw = function(init = false) {
                    m.render(vnode.dom, content({ redraw, getState, setState, init }));
                };
                redraw(init);
            }}></div>,
        <footer
            class="d-block bg-light p-3"
            oncreate={vnode => {
                var redraw = function(init = false) {
                    m.render(vnode.dom, footer({ redraw, getState, setState, init }));
                };
                redraw(init);
            }}></footer>
    ]);
}

export default redraw;
