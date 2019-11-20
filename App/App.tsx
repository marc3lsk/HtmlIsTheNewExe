import * as m from "mithril";
import "bootstrap/dist/css/bootstrap.min.css";
import content from "./Content";
import footer from "./Footer";

function redraw(init = false) {
    m.render(document.body, [content(init), footer(init)]);
}

export default redraw;
