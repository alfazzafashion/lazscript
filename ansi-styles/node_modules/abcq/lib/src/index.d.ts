/**
 * @file index.js
 * @module abcQ
 * @overview Number / character combination encoder / decoder
 *
 * @author Gregor Adams <greg@pixelass.com>
 * @licence The MIT License (MIT) - See file 'LICENSE' in this project.
 */
declare namespace Abcq {
    type String = string;
    type Number = number;
    type Characters = string | string[];
    type generate = () => String;
    type encode = (input: Number) => String | null;
    type decode = (input: String) => Number | null;
    interface Options {
        chars?: Characters;
        counter?: Number;
    }
    interface Config {
        chars: Characters;
        counter: Number;
    }
}
declare class Abcq {
    private readonly chars;
    private counter;
    /**
     * [constructor description]
     * @param  {Abcq.Options} [options={}]
     * Set options to configure the output when generating ids or converting numbers
     * @param  {Abcq.Characters} options.chars
     * The list of characters to combine. It can be an `Array`  or a `String`.
     * If the list contains special characters, emojis or similar it should be
     * an `Array`.
     * @param  {Abcq.Number} options.counter
     * The counter can be initialized with this value. If you want to start with
     * some longer names try setting `counter: 100000`.The default value is set
     * to `-1` any lower value will return `null`
     * @return {Abcq}
     * returns an instance of itself
     * @example
     * const unicornLove = new abcQ({
     *   chars: ['🦄','💖'],
     *   counter: 42
     * })
     */
    constructor(options?: Abcq.Options);
    /**
     * Method to generate the next string.
     *
     * This method is not affected by calling other methods.
     * It will always return the next combination of characters
     *
     * @return {Abcq.String}
     * Returns the next character combination
     * @example
     * const shortid = new abcQ({
     *   chars: 'ab'
     * })
     * let counter = 0
     * do {
     *   console.log(shortid.generate())
     * } while (++counter < 10)
     * // -> a b aa ab ba bb aaa aab aba abb
     */
    generate: Abcq.generate;
    /**
     * Method to encode a number into a combination of characters
     *
     * This method does not affect any other method.
     * This method can be called multiple times before calling `generate`
     *
     * @param  {Abcq.Number} i
     * A number greater than `-1`. Given a list of `"ab" the following will  be returned:
     *
     * - 0 -> "a"
     * - 1 -> "b"
     * - 2 -> "aa"
     * - 3 -> "ab"
     * - ...
     * @return {Abcq.String}
     * Returns the character combination of the number
     * @example
     * const shortid = new abcQ({
     *   chars: 'ab'
     * })
     * console.log(shortid.encode(0))
     * // -> "a"
     * console.log(shortid.encode(9))
     * // -> "abb"
     */
    encode: Abcq.encode;
    /**
     * Method to decode a combination of characters into a number
     *
     * This method does not affect any other method.
     * This method can be called multiple times before calling `generate`
     *
     * @param  {Abcq.String} str
     * Character combination to decode. Must contain only valid characters, Given a list of `"ab" the following will
     * be returned
     *  - "a"  -> 0
     *  - "b"  -> 1
     *  - "aa" -> 2
     *  - "ab" -> 3
     *  - ...
     * @return {Abcq.Number}
     * Returns the index of the input string
     * @example
     * const shortid = new abcQ({
     *   chars: 'ab'
     * })
     * console.log(shortid.decode('a'))
     * // -> o
     * console.log(shortid.decode('abb'))
     * // -> 9
     */
    decode: Abcq.decode;
}
export default Abcq;
