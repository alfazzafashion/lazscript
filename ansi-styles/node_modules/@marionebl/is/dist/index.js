"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
var TypeName;
(function (TypeName) {
    TypeName["null"] = "null";
    TypeName["boolean"] = "boolean";
    TypeName["undefined"] = "undefined";
    TypeName["string"] = "string";
    TypeName["number"] = "number";
    TypeName["symbol"] = "symbol";
    TypeName["Function"] = "Function";
    TypeName["Array"] = "Array";
    TypeName["Buffer"] = "Buffer";
    TypeName["Object"] = "Object";
    TypeName["RegExp"] = "RegExp";
    TypeName["Date"] = "Date";
    TypeName["Error"] = "Error";
    TypeName["Map"] = "Map";
    TypeName["Set"] = "Set";
    TypeName["WeakMap"] = "WeakMap";
    TypeName["WeakSet"] = "WeakSet";
    TypeName["Int8Array"] = "Int8Array";
    TypeName["Uint8Array"] = "Uint8Array";
    TypeName["Uint8ClampedArray"] = "Uint8ClampedArray";
    TypeName["Int16Array"] = "Int16Array";
    TypeName["Uint16Array"] = "Uint16Array";
    TypeName["Int32Array"] = "Int32Array";
    TypeName["Uint32Array"] = "Uint32Array";
    TypeName["Float32Array"] = "Float32Array";
    TypeName["Float64Array"] = "Float64Array";
    TypeName["ArrayBuffer"] = "ArrayBuffer";
    TypeName["SharedArrayBuffer"] = "SharedArrayBuffer";
    TypeName["Promise"] = "Promise";
})(TypeName = exports.TypeName || (exports.TypeName = {}));
const toString = Object.prototype.toString;
const isOfType = (type) => (value) => typeof value === type; // tslint:disable-line:strict-type-predicates
const isObjectOfType = (typeName) => (value) => {
    const type = typeName === 'string' ? TypeName[typeName] : typeName;
    return getObjectType(value) === type;
};
const getObjectType = (value) => {
    const objectName = toString.call(value).slice(8, -1);
    switch (objectName) {
        case 'ArrayBuffer':
            return TypeName.ArrayBuffer;
        case 'WeakSet':
            return TypeName.WeakSet;
        case 'WeakMap':
            return TypeName.WeakMap;
        case 'Set':
            return TypeName.Set;
        case 'Promise':
            return TypeName.Promise;
        case 'RegExp':
            return TypeName.RegExp;
        case 'Date':
            return TypeName.Date;
        case 'Error':
            return TypeName.Error;
        case 'Map':
            return TypeName.Map;
        case 'Int8Array':
            return TypeName.Int8Array;
        case 'Uint8Array':
            return TypeName.Uint8Array;
        case 'Uint8ClampedArray':
            return TypeName.Uint8ClampedArray;
        case 'Int16Array':
            return TypeName.Int16Array;
        case 'Uint16Array':
            return TypeName.Uint16Array;
        case 'Int32Array':
            return TypeName.Int32Array;
        case 'Uint32Array':
            return TypeName.Uint32Array;
        case 'Float32Array':
            return TypeName.Float32Array;
        case 'Float64Array':
            return TypeName.Float64Array;
        case 'Object':
            return TypeName.Object;
        default:
            return null;
    }
};
function is(value) {
    if (value === null) {
        return TypeName.null;
    }
    if (value === true || value === false) {
        return TypeName.boolean;
    }
    const type = typeof value;
    if (type === 'undefined') {
        return TypeName.undefined;
    }
    if (type === 'string') {
        return TypeName.string;
    }
    if (type === 'number') {
        return TypeName.number;
    }
    if (type === 'symbol') {
        return TypeName.symbol;
    }
    if (is.function_(value)) {
        return TypeName.Function;
    }
    if (Array.isArray(value)) {
        return TypeName.Array;
    }
    if (Buffer.isBuffer(value)) {
        return TypeName.Buffer;
    }
    const tagType = getObjectType(value);
    if (tagType) {
        return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError('Please don\'t use object wrappers for primitive types');
    }
    return TypeName.Object;
}
(function (is) {
    const isObject = (value) => typeof value === 'object';
    // tslint:disable:variable-name
    is.undefined = isOfType('undefined');
    is.string = isOfType('string');
    is.number = isOfType('number');
    is.function_ = isOfType('function');
    is.null_ = (value) => value === null;
    is.class_ = (value) => is.function_(value) && value.toString().startsWith('class ');
    is.boolean = (value) => value === true || value === false;
    // tslint:enable:variable-name
    is.symbol = isOfType('symbol');
    is.array = Array.isArray;
    is.buffer = Buffer.isBuffer;
    is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
    is.object = (value) => !is.nullOrUndefined(value) && (is.function_(value) || isObject(value));
    is.iterable = (value) => !is.nullOrUndefined(value) && is.function_(value[Symbol.iterator]);
    is.generator = (value) => is.iterable(value) && is.function_(value.next) && is.function_(value.throw);
    is.nativePromise = isObjectOfType('Promise');
    const hasPromiseAPI = (value) => !is.null_(value) &&
        isObject(value) &&
        is.function_(value.then) &&
        is.function_(value.catch);
    is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
    // TODO: Change to use `isObjectOfType` once Node.js 6 or higher is targeted
    const isFunctionOfType = (type) => (value) => is.function_(value) && is.function_(value.constructor) && value.constructor.name === type;
    is.generatorFunction = isFunctionOfType('GeneratorFunction');
    is.asyncFunction = isFunctionOfType('AsyncFunction');
    is.regExp = isObjectOfType('RegExp');
    is.date = isObjectOfType('Date');
    is.error = isObjectOfType('Error');
    is.map = isObjectOfType('Map');
    is.set = isObjectOfType('Set');
    is.weakMap = isObjectOfType('WeakMap');
    is.weakSet = isObjectOfType('WeakSet');
    is.int8Array = isObjectOfType('Int8Array');
    is.uint8Array = isObjectOfType('Uint8Array');
    is.uint8ClampedArray = isObjectOfType('Uint8ClampedArray');
    is.int16Array = isObjectOfType('Int16Array');
    is.uint16Array = isObjectOfType('Uint16Array');
    is.int32Array = isObjectOfType('Int32Array');
    is.uint32Array = isObjectOfType('Uint32Array');
    is.float32Array = isObjectOfType('Float32Array');
    is.float64Array = isObjectOfType('Float64Array');
    is.arrayBuffer = isObjectOfType('ArrayBuffer');
    is.sharedArrayBuffer = isObjectOfType('SharedArrayBuffer');
    is.truthy = (value) => Boolean(value);
    is.falsy = (value) => !value;
    is.nan = (value) => Number.isNaN(value);
    const primitiveTypes = new Set([
        'undefined',
        'string',
        'number',
        'boolean',
        'symbol'
    ]);
    is.primitive = (value) => is.null_(value) || primitiveTypes.has(typeof value);
    is.integer = (value) => Number.isInteger(value);
    is.safeInteger = (value) => Number.isSafeInteger(value);
    is.plainObject = (value) => {
        // From: https://github.com/sindresorhus/is-plain-obj/blob/master/index.js
        let prototype;
        return getObjectType(value) === TypeName.Object &&
            (prototype = Object.getPrototypeOf(value), prototype === null || // tslint:disable-line:ban-comma-operator
                prototype === Object.getPrototypeOf({}));
    };
    const typedArrayTypes = new Set([
        TypeName.Int8Array,
        TypeName.Uint8Array,
        TypeName.Uint8ClampedArray,
        TypeName.Int16Array,
        TypeName.Uint16Array,
        TypeName.Int32Array,
        TypeName.Uint32Array,
        TypeName.Float32Array,
        TypeName.Float64Array
    ]);
    is.typedArray = (value) => {
        const objectType = getObjectType(value);
        if (objectType === null) {
            return false;
        }
        return typedArrayTypes.has(objectType);
    };
    const isValidLength = (value) => is.safeInteger(value) && value > -1;
    is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
    is.inRange = (value, range) => {
        if (is.number(range)) {
            return value >= Math.min(0, range) && value <= Math.max(range, 0);
        }
        if (is.array(range) && range.length === 2) {
            // TODO: Use spread operator here when targeting Node.js 6 or higher
            return value >= Math.min.apply(null, range) && value <= Math.max.apply(null, range);
        }
        throw new TypeError(`Invalid range: ${util.inspect(range)}`);
    };
    const NODE_TYPE_ELEMENT = 1;
    const DOM_PROPERTIES_TO_CHECK = [
        'innerHTML',
        'ownerDocument',
        'style',
        'attributes',
        'nodeValue'
    ];
    is.domElement = (value) => is.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is.string(value.nodeName) &&
        !is.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every(property => property in value);
    is.infinite = (value) => value === Infinity || value === -Infinity;
    const isAbsoluteMod2 = (value) => (rem) => is.integer(rem) && Math.abs(rem % 2) === value;
    is.even = isAbsoluteMod2(0);
    is.odd = isAbsoluteMod2(1);
    const isWhiteSpaceString = (value) => is.string(value) && /\S/.test(value) === false;
    const isEmptyStringOrArray = (value) => (is.string(value) || is.array(value)) && value.length === 0;
    const isEmptyObject = (value) => !is.map(value) && !is.set(value) && is.object(value) && Object.keys(value).length === 0;
    const isEmptyMapOrSet = (value) => (is.map(value) || is.set(value)) && value.size === 0;
    is.empty = (value) => is.falsy(value) || isEmptyStringOrArray(value) || isEmptyObject(value) || isEmptyMapOrSet(value);
    is.emptyOrWhitespace = (value) => is.empty(value) || isWhiteSpaceString(value);
    const predicateOnArray = (method, predicate, args) => {
        // `args` is the calling function's "arguments object".
        // We have to do it this way to keep node v4 support.
        // So here we convert it to an array and slice off the first item.
        const values = Array.prototype.slice.call(args, 1);
        if (is.function_(predicate) === false) {
            throw new TypeError(`Invalid predicate: ${util.inspect(predicate)}`);
        }
        if (values.length === 0) {
            throw new TypeError('Invalid number of values');
        }
        return method.call(values, predicate);
    };
    function any(predicate) {
        return predicateOnArray(Array.prototype.some, predicate, arguments);
    }
    is.any = any;
    function all(predicate) {
        return predicateOnArray(Array.prototype.every, predicate, arguments);
    }
    is.all = all;
    // tslint:enable:only-arrow-functions no-function-expression
})(is || (is = {}));
// Some few keywords are reserved, but we'll populate them for Node.js users
// See https://github.com/Microsoft/TypeScript/issues/2536
Object.defineProperties(is, {
    class: {
        value: is.class_
    },
    function: {
        value: is.function_
    },
    null: {
        value: is.null_
    }
});
exports.default = is;
// For CommonJS default export support
module.exports = is;
module.exports.default = is;
