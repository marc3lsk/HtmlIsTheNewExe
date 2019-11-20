import * as m from "mithril";
import { read, utils } from "xlsx";
import { js2xml } from "xml-js";
import { saveAs } from "file-saver";
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css";
import { IReportRoot } from "./ReportInterface";

function saveTextFile(text: string, name: string) {
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, name);
}

function redraw(state) {
    m.render(document.body, [
        <div class="flex-grow-1">
            <div class="container mt-4 mb-4">
                <div class="custom-file">
                    <input
                        class="custom-file-input"
                        id="customFile"
                        type="file"
                        onchange={event => {
                            if (event.target.files.length === 0) {
                                return;
                            }

                            const reader = new FileReader();
                            reader.onload = function fileReadCompleted() {
                                var workbook = read(reader.result, { type: "array" });
                                var first_sheet_name = workbook.SheetNames[1];
                                var worksheet = workbook.Sheets[first_sheet_name];
                                var range = {
                                    start: utils.decode_cell("A1"),
                                    end: utils.decode_cell("C4")
                                };
                                var dataRange = [];
                                /* Iterate through each element in the structure */
                                for (var R = range.start.r; R <= range.end.r; ++R) {
                                    for (var C = range.start.c; C <= range.end.c; ++C) {
                                        var cell_address = { c: C, r: R };
                                        var data = utils.encode_cell(cell_address);
                                        dataRange.push(worksheet[data]);
                                    }
                                }
                                redraw({ ...state, data: dataRange });
                            };
                            reader.readAsArrayBuffer(event.target.files[0]);
                        }}
                    />
                    <label class="custom-file-label" for="customFile">
                        Vyberte excel
                    </label>
                </div>
                {state?.xml && (
                    <div class="card mt-3">
                        <div class="card-body">
                            <pre>
                                <code>{state.xml}</code>
                            </pre>
                        </div>
                    </div>
                )}
                {state?.data && (
                    <div class="card mt-3">
                        <div class="card-body">
                            <button
                                type="button"
                                class="btn btn-sm btn-primary"
                                onclick={event => {
                                    saveTextFile(
                                        JSON.stringify(state.data, null, 2),
                                        "dataRange.json"
                                    );
                                }}>
                                Prevziať
                            </button>
                            <pre>
                                <code>{JSON.stringify(state.data, null, 2)}</code>
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>,
        <footer class="d-block bg-light p-3">
            <div class="float-right">
                {"Posledné spustenie: " +
                    format(new Date(state.lastRun ?? new Date()), "dd.MM.yyyy hh:mm:ss")}
            </div>
        </footer>
    ]);
}

document.addEventListener("DOMContentLoaded", function(event) {
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
    } as IReportRoot;

    var xml =
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' +
        js2xml(r, {
            compact: true,
            ignoreComment: true,
            spaces: 4
        });

    redraw({ lastRun, xml });
});
