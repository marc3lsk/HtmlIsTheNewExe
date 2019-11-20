
// Source files:
// 


interface BaseType {
	_namespace: string;
}
export interface _any extends BaseType { content: any; }

export interface _boolean extends BaseType { content: boolean; }

export interface _Date extends BaseType { content: Date; }

export interface _number extends BaseType { content: number; }

export interface _string extends BaseType { _text: string; }

export interface document extends BaseType {
}
export var document: document;
