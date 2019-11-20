import { read, utils } from "xlsx";
import * as m from "mithril";
import { js2xml, json2xml } from "xml-js";
import { IReportRoot } from "./ReportInterface";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";

function saveTextFile(text: string, name: string) {
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, name);
}

function redraw(state) {
    m.render(
        document.body,
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
                            var workbook2 = read(reader.result, { type: "array" });
                            var first_sheet_name = workbook2.SheetNames[1];
                            var address_of_cell = "C1";

                            /* Get worksheet */
                            var worksheet = workbook2.Sheets[first_sheet_name];

                            /* Find desired cell */
                            var desired_cell = worksheet[address_of_cell];

                            /* Get the value */
                            var desired_value = desired_cell;
                            console.log(workbook2);
                            console.log(desired_value);

                            var range = { s: utils.decode_cell("A1"), e: utils.decode_cell("C4") };
                            var dataRange = [];
                            /* Iterate through each element in the structure */
                            for (var R = range.s.r; R <= range.e.r; ++R) {
                                for (var C = range.s.c; C <= range.e.c; ++C) {
                                    var cell_address = { c: C, r: R };
                                    var data = utils.encode_cell(cell_address);
                                    dataRange.push(worksheet[data]);
                                }
                            }
                            console.log(dataRange);
                            //console.log("Asdfasdfa");
                            //var workbook = new Workbook();
                            //workbook.xlsx.load(reader.result as Buffer).then(function() {
                            //    console.log(workbook.worksheets[0].getSheetValues());
                            //});

                            redraw({ ...state, data: dataRange });
                        };
                        var arr = reader.readAsArrayBuffer(event.target.files[0]);
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
                                saveTextFile(JSON.stringify(state.data, null, 2), "dataRange.json");
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
    );
}

document.addEventListener("DOMContentLoaded", function(event) {
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
        json2xml(JSON.stringify(r, null, 2), {
            compact: true,
            ignoreComment: true,
            spaces: 4
        });

    console.log(xml);

    redraw({ xml });
});
