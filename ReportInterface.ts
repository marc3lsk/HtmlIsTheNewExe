export interface IReportRoot {
    SZPReport: IReport;
}

export interface IReportAttr {
    reportVersion: number;
    xmlns: string;
}

export interface IReport {
    _attributes: IReportAttr;
    header?: IHeader;
    statPart?: IStatPart[];
}

export type reportVersionType = ("data" | "storno" | "empty");
export interface IHeader {
    period?: Date;
	preparedAt?: Date;
	preparedBy?: string;
	subject?: string;
	template?: string;
	templateValidFrom?: Date;
	type: reportVersionType;
	version?: number;
}

export interface IStatPart {
    cell: ICell[];
}

export interface ICell {
    _attributes: ICellAttr;
    _text: string;
}

export interface ICellAttr {
    row: number;
    col: string | number;
}