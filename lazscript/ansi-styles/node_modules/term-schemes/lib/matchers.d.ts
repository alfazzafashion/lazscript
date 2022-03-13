import { TypeName } from '@marionebl/is';
export interface IMessageContext {
    actual: TypeName;
    expected: string;
    pass: boolean;
    received: any;
}
export interface IMatcherResult {
    pass: boolean;
    message(): string;
}
export declare type IIsMatcher = (received: any, expected: string) => IMatcherResult;
export declare type ICheck = (value: any) => boolean;
export interface IIsExtend extends jest.Expect {
    is: IIsMatcher;
}
export declare function is(received: any, expected: string): {
    message: () => string;
    pass: boolean;
};
export declare const isUndefined: IIsMatcher;
export declare const isNull: IIsMatcher;
export declare const isString: IIsMatcher;
export declare const isNumber: IIsMatcher;
export declare const isBoolean: IIsMatcher;
export declare const isSymbol: IIsMatcher;
export declare const isArray: IIsMatcher;
export declare const isFunction: IIsMatcher;
export declare const isBuffer: IIsMatcher;
export declare const isObject: IIsMatcher;
export declare const isRegExp: IIsMatcher;
export declare const isDate: IIsMatcher;
export declare const isError: IIsMatcher;
export declare const isNativePromise: IIsMatcher;
export declare const isMap: IIsMatcher;
export declare const isSet: IIsMatcher;
export declare const isWeakMap: IIsMatcher;
export declare const isWeakSet: IIsMatcher;
export declare const isInt8Array: IIsMatcher;
export declare const isUint8Array: IIsMatcher;
export declare const isUint8ClampedArray: IIsMatcher;
export declare const isInt16Array: IIsMatcher;
export declare const isUint16Array: IIsMatcher;
export declare const isInt32Array: IIsMatcher;
export declare const isUint32Array: IIsMatcher;
export declare const isfloat32Array: IIsMatcher;
export declare const isfloat64Array: IIsMatcher;
export declare const isArrayBuffer: IIsMatcher;
export declare const isSharedArrayBuffer: IIsMatcher;
export declare const isPromise: IIsMatcher;
export declare const isGenerator: IIsMatcher;
export declare const isAsyncFunction: IIsMatcher;
export declare const isTruthy: IIsMatcher;
export declare const isFalsy: IIsMatcher;
export declare const isNaN: IIsMatcher;
export declare const isNullOrUndefined: IIsMatcher;
export declare const isPrimitive: IIsMatcher;
export declare const isInteger: IIsMatcher;
export declare const isSafeInteger: IIsMatcher;
export declare const isPlainObject: IIsMatcher;
export declare const isIterable: IIsMatcher;
export declare const isClass: IIsMatcher;
export declare const isTypedArray: IIsMatcher;
export declare const isArrayLike: IIsMatcher;
export declare const isDomElement: IIsMatcher;
export declare const isInfinite: IIsMatcher;
export declare const isEven: IIsMatcher;
export declare const isOdd: IIsMatcher;
export declare const isEmpty: IIsMatcher;
export declare const isEmptyOrWhitespace: IIsMatcher;
