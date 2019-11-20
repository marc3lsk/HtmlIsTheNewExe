import * as Primitive from './xml-primitives';

// Source files:
// http://static.analocal/SZP_Report_v1.02.xsd


interface BaseType {
    _namespace: string;
    _attributes: any;
}
interface _AttachmentType extends Primitive._string {
	name: string;
}
interface AttachmentType extends _AttachmentType { constructor: { new(): AttachmentType }; }

interface _CellType extends Primitive._string {
	col: string;
	decimals?: string;
	row: number;
}
interface CellType extends _CellType { constructor: { new(): CellType }; }

type CellTypeDecimalsType = string;
type _CellTypeDecimalsType = Primitive._string;

interface _CommentCellType extends Primitive._string {
	col: string;
	row: number;
}
interface CommentCellType extends _CommentCellType { constructor: { new(): CommentCellType }; }

interface _CommentDCellType extends Primitive._string {
	col: string;
}
interface CommentDCellType extends _CommentDCellType { constructor: { new(): CommentDCellType }; }

interface _DCellType extends Primitive._string {
	col: string;
	decimals?: string;
}
interface DCellType extends _DCellType { constructor: { new(): DCellType }; }

type DCellTypeDecimalsType = string;
type _DCellTypeDecimalsType = Primitive._string;

interface _DynPartType extends BaseType {
	code: string;
	cell?: CellType[];
	commentCell?: CommentCellType[];
	commentPart?: string;
	dynRow?: DynRowType[];
}
interface DynPartType extends _DynPartType { constructor: { new(): DynPartType }; }

interface _DynRowType extends BaseType {
	ord: number;
	commentDCell?: CommentDCellType[];
	dCell?: DCellType[];
}
interface DynRowType extends _DynRowType { constructor: { new(): DynRowType }; }

interface _DynSectionType extends BaseType {
	ord: number;
	cell?: CellType[];
	commentCell?: CommentCellType[];
	commentSection?: string;
}
interface DynSectionType extends _DynSectionType { constructor: { new(): DynSectionType }; }

interface _FilePartType extends BaseType {
	attachment: AttachmentType[];
	commentPart?: string;
}
interface FilePartType extends _FilePartType { constructor: { new(): FilePartType }; }

interface _HeaderType extends BaseType {
	period: Date;
	preparedAt?: Date;
	preparedBy?: string;
	subject: string;
	template: string;
	templateValidFrom: Date;
	type: reportVersionType;
	version?: number;
}
interface HeaderType extends _HeaderType { constructor: { new(): HeaderType }; }

export type ordNumType = number;
type _ordNumType = Primitive._number;

export type reportVersionType = ("data" | "storno" | "empty");
interface _reportVersionType extends Primitive._string { content: reportVersionType; }

interface _StatdynPartType extends BaseType {
	code: string;
	dynSection?: DynSectionType[];
}
interface StatdynPartType extends _StatdynPartType { constructor: { new(): StatdynPartType }; }

interface _StatPartType extends BaseType {
	code: string;
	cell?: CellType[];
	commentCell?: CommentCellType[];
	commentPart?: string;
}
interface StatPartType extends _StatPartType { constructor: { new(): StatPartType }; }

interface _SZPReportType extends BaseType {
	reportVersion: number;
	commentReport?: string;
	dynPart?: DynPartType[];
	filePart?: FilePartType[];
	header: HeaderType;
	statdynPart?: StatdynPartType[];
	statPart?: StatPartType[];
}
interface SZPReportType extends _SZPReportType { constructor: { new(): SZPReportType }; }

export interface document extends BaseType {
	attachment: AttachmentType;
	cell: CellType;
	commentCell: CommentCellType;
	commentDCell: CommentDCellType;
	commentPart: string;
	commentReport: string;
	commentSection: string;
	dCell: DCellType;
	deputySubject: string;
	dynPart: DynPartType;
	dynRow: DynRowType;
	dynSection: DynSectionType;
	filePart: FilePartType;
	header: HeaderType;
	period: Date;
	preparedAt: Date;
	preparedBy: string;
	statdynPart: StatdynPartType;
	statPart: StatPartType;
	subject: string;
	SZPReport: SZPReportType;
	template: string;
	templateValidFrom: Date;
	type: reportVersionType;
	version: number;
}
export var document: document;
