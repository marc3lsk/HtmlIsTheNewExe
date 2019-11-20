"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = require("xlsx");
var m = require("mithril");
var xml_js_1 = require("xml-js");
var file_saver_1 = require("file-saver");
var date_fns_1 = require("date-fns");
require("bootstrap/dist/css/bootstrap.min.css");
function saveTextFile(text, name) {
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    file_saver_1.saveAs(blob, name);
}
function redraw(state) {
    m.render(document.body, [
        m("div", { class: "flex-grow-1" },
            m("div", { class: "container mt-4 mb-4" },
                m("div", { class: "custom-file" },
                    m("input", { class: "custom-file-input", id: "customFile", type: "file", onchange: function (event) {
                            if (event.target.files.length === 0) {
                                return;
                            }
                            var reader = new FileReader();
                            reader.onload = function fileReadCompleted() {
                                var workbook = xlsx_1.read(reader.result, { type: "array" });
                                var first_sheet_name = workbook.SheetNames[1];
                                var worksheet = workbook.Sheets[first_sheet_name];
                                var range = {
                                    s: xlsx_1.utils.decode_cell("A1"),
                                    e: xlsx_1.utils.decode_cell("C4")
                                };
                                var dataRange = [];
                                /* Iterate through each element in the structure */
                                for (var R = range.s.r; R <= range.e.r; ++R) {
                                    for (var C = range.s.c; C <= range.e.c; ++C) {
                                        var cell_address = { c: C, r: R };
                                        var data = xlsx_1.utils.encode_cell(cell_address);
                                        dataRange.push(worksheet[data]);
                                    }
                                }
                                redraw(__assign({}, state, { data: dataRange }));
                            };
                            reader.readAsArrayBuffer(event.target.files[0]);
                        } }),
                    m("label", { class: "custom-file-label", for: "customFile" }, "Vyberte excel")),
                state ? .xml && (m("div", { class: "card mt-3" },
                    m("div", { class: "card-body" },
                        m("pre", null,
                            m("code", null, state.xml))))) : ,
                state ? .data && (m("div", { class: "card mt-3" },
                    m("div", { class: "card-body" },
                        m("button", { type: "button", class: "btn btn-sm btn-primary", onclick: function (event) {
                                saveTextFile(JSON.stringify(state.data, null, 2), "dataRange.json");
                            } }, "Prevzia\u0165"),
                        m("pre", null,
                            m("code", null, JSON.stringify(state.data, null, 2)))))) : )),
        m("footer", { class: "d-block bg-light p-3" },
            m("div", { class: "float-right" }, "Posledné spustenie: " + date_fns_1.format(new Date(state.lastRun ?  ? new Date() :  : ), "dd.MM.yyyy hh:mm:ss")))
    ]);
}
document.addEventListener("DOMContentLoaded", function (event) {
    var lastRun = localStorage.getItem("lastRun");
    localStorage.setItem("lastRun", new Date().toISOString());
    var r = {
        SZPReport: {
            _attributes: {
                reportVersion: 1,
                xmlns: "sk:nbs:szp:data:in"
            },
            header: {
                type: "data"
            },
            statPart: [
                {
                    cell: [
                        {
                            _attributes: {
                                row: 1,
                                col: "C"
                            },
                            _text: "asdfas"
                        }
                    ]
                }
            ]
        }
    };
    var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
        xml_js_1.js2xml(r, {
            compact: true,
            ignoreComment: true,
            spaces: 4
        });
    redraw({ lastRun: lastRun, xml: xml });
});
