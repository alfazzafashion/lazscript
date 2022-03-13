"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@marionebl/is");
const util_1 = require("util");
function is(received, expected) {
    const actual = is_1.default(received);
    const pass = actual === expected;
    return {
        message: message({ actual, expected, pass, received }),
        pass
    };
}
exports.is = is;
exports.isUndefined = strictCheck('undefined', is_1.default.undefined);
exports.isNull = strictCheck('null', is_1.default.null_);
exports.isString = strictCheck('string', is_1.default.string);
exports.isNumber = strictCheck('number', is_1.default.number);
exports.isBoolean = strictCheck('boolean', is_1.default.boolean);
exports.isSymbol = strictCheck('symbol', is_1.default.symbol);
exports.isArray = strictCheck('Array', is_1.default.array);
exports.isFunction = strictCheck('Function', is_1.default.function_);
exports.isBuffer = strictCheck('Buffer', is_1.default.buffer);
exports.isObject = strictCheck('Object', is_1.default.object);
exports.isRegExp = strictCheck('RegExp', is_1.default.regExp);
exports.isDate = strictCheck('Date', is_1.default.date);
exports.isError = strictCheck('Error', is_1.default.error);
exports.isNativePromise = strictCheck('Promise', is_1.default.nativePromise);
exports.isMap = strictCheck('Map', is_1.default.map);
exports.isSet = strictCheck('Set', is_1.default.set);
exports.isWeakMap = strictCheck('WeakMap', is_1.default.weakMap);
exports.isWeakSet = strictCheck('WeakSet', is_1.default.weakSet);
exports.isInt8Array = strictCheck('Int8Array', is_1.default.int8Array);
exports.isUint8Array = strictCheck('Uint8Array', is_1.default.uint8Array);
exports.isUint8ClampedArray = strictCheck('Uint8ClampedArray', is_1.default.uint8ClampedArray);
exports.isInt16Array = strictCheck('Int16Array', is_1.default.int16Array);
exports.isUint16Array = strictCheck('Uint16Array', is_1.default.uint16Array);
exports.isInt32Array = strictCheck('Int32Array', is_1.default.int32Array);
exports.isUint32Array = strictCheck('Uint32Array', is_1.default.uint32Array);
exports.isfloat32Array = strictCheck('Float32Array', is_1.default.float32Array);
exports.isfloat64Array = strictCheck('Float64Array', is_1.default.float64Array);
exports.isArrayBuffer = strictCheck('ArrayBuffer', is_1.default.arrayBuffer);
exports.isSharedArrayBuffer = strictCheck('SharedArrayBuffer', is_1.default.sharedArrayBuffer);
exports.isPromise = surfaceCheck('promise-like', is_1.default.promise);
exports.isGenerator = surfaceCheck('a generator', is_1.default.generator);
exports.isAsyncFunction = surfaceCheck('an async function', is_1.default.asyncFunction);
exports.isTruthy = surfaceCheck('truthy', is_1.default.truthy);
exports.isFalsy = surfaceCheck('falsy', is_1.default.falsy);
exports.isNaN = surfaceCheck('NaN', is_1.default.nan);
exports.isNullOrUndefined = surfaceCheck('either null or undefined', is_1.default.nullOrUndefined);
exports.isPrimitive = surfaceCheck('a primitive value', is_1.default.primitive);
exports.isInteger = surfaceCheck('an integer', is_1.default.integer);
exports.isSafeInteger = surfaceCheck('a safe integer', is_1.default.safeInteger);
exports.isPlainObject = surfaceCheck('a plain object', is_1.default.plainObject);
exports.isIterable = surfaceCheck('an iterable', is_1.default.iterable);
exports.isClass = surfaceCheck('a class', is_1.default.class_);
exports.isTypedArray = surfaceCheck('a typed array', is_1.default.typedArray);
exports.isArrayLike = surfaceCheck('array-like', is_1.default.arrayLike);
exports.isDomElement = surfaceCheck('DOM Element', is_1.default.domElement);
exports.isInfinite = surfaceCheck('infinite', is_1.default.infinite);
exports.isEven = surfaceCheck('even', is_1.default.even);
exports.isOdd = surfaceCheck('odd', is_1.default.odd);
exports.isEmpty = surfaceCheck('empty', is_1.default.empty);
exports.isEmptyOrWhitespace = surfaceCheck('empty or whitespace', is_1.default.emptyOrWhitespace);
// export const isInRange = surfaceCheck('in range', )
// export const isAny
// export const isAll
function surfaceCheck(description, check) {
    return (received) => {
        const actual = is_1.default(received);
        const pass = check(received);
        return {
            message() {
                const expectation = `expected value ${util_1.inspect(received)} to be ${description}`;
                return pass ? expectation : `${expectation}, was of type ${actual}`;
            },
            pass
        };
    };
}
function strictCheck(expected, check) {
    return (received) => {
        const actual = is_1.default(received);
        const pass = check(received);
        return {
            message: message({ actual, expected, pass, received }),
            pass
        };
    };
}
;
function message(c) {
    const expectation = `expected value ${util_1.inspect(c.received)} to be of type ${c.expected}`;
    return () => c.pass ? expectation : `${expectation}, was of type ${c.actual}`;
}
