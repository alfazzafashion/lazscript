"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const server_1 = require("react-dom/server");
const { load } = require('load-asciicast');
const Background = require('./Background');
const Document = require('./Document');
const Frame = require('./Frame');
const Reel = require('./Reel');
const Registry = require('./Registry');
const Window = require('./Window');
const Word = require('./Word');
const styled = require('./styled');
const toViewModel = require('./to-view-model');
const DEFAULT_THEME = require('./default-theme');
const StyledContainer = styled.g `
  font-family: ${(props) => props.fontFamily};
`;
function render(input, options = {}) {
    const cast = loadCast(input, options);
    const paddingX = typeof options.paddingX === 'number' ? options.paddingX : 0;
    const paddingY = typeof options.paddingY === 'number' ? options.paddingY : 0;
    const theme = options.theme || DEFAULT_THEME;
    theme.fontFamily = 'fontFamily' in theme ? theme.fontFamily : DEFAULT_THEME.fontFamily;
    theme.fontSize = 'fontSize' in theme ? theme.fontSize : DEFAULT_THEME.fontSize;
    theme.lineHeight = 'lineHeight' in theme ? theme.lineHeight : DEFAULT_THEME.lineHeight;
    const bound = { from: options.from, to: options.to, at: options.at, cast };
    const data = toViewModel({
        cast,
        cursor: options.cursor,
        height: options.height,
        theme,
        from: from(bound),
        to: to(bound)
    });
    return server_1.renderToStaticMarkup(React.createElement(Window, { decorations: options.window, width: data.width, height: data.displayHeight, theme: theme, paddingX: paddingX, paddingY: paddingY },
        React.createElement(Document, { width: data.width, height: data.displayHeight, theme: theme, x: options.window ? 15 + paddingX : options.paddingX, y: options.window ? 50 + paddingY : options.paddingY },
            React.createElement(StyledContainer, { fontFamily: theme.fontFamily, fontSize: theme.fontSize },
                React.createElement(Registry, { frameHeight: cast.height, frameWidth: cast.width, hasCursors: data.frames.some((frame) => frame.cursor.visible), hasFrames: data.frames.length > 0, items: data.registry, theme: theme }),
                React.createElement(Background, { width: data.width, height: data.displayHeight, theme: theme }),
                React.createElement(Reel, { duration: data.duration, frameWidth: cast.width, stamps: data.stamps, width: data.frames.length * cast.width }, data.frames
                    .map((frame, index) => {
                    return (React.createElement(Frame, { key: frame.stamp, stamp: frame.stamp, offset: index, width: data.width, height: data.displayHeight },
                        frame.cursor.visible &&
                            React.createElement("use", { xlinkHref: "#b", x: frame.cursor.x - theme.fontSize * 1.2, y: frame.cursor.y === 0 ? 0 : frame.cursor.y + theme.lineHeight * 0.75 }),
                        frame.lines.map((line, index) => {
                            if (typeof line.id === 'number') {
                                return (React.createElement("use", { key: `${line.id}-${index}`, xlinkHref: `#${line.id}`, y: line.y }));
                            }
                            return line.words.map((word) => {
                                return (React.createElement(Word, { bg: word.attr.bg, bold: word.attr.bold, fg: word.attr.fg, inverse: word.attr.inverse, theme: theme, underline: word.attr.underline, x: word.x, y: line.y + theme.fontSize }, word.children));
                            });
                        })));
                }))))));
}
exports.render = render;
// `input` can be string/object of v1 or v2:
// https://github.com/asciinema/asciinema/blob/develop/doc
// or an already loaded cast:
// https://github.com/marionebl/load-asciicast
//
// `options` won't take effect if `input` is an already loaded cast.
function loadCast(input, options = {}) {
    if (!input) {
        throw new TypeError(`svg-term.reder: missing input`);
    }
    // An already loaded cast
    if (input.frames) {
        return input;
    }
    const raw = typeof input === 'string' ? input : JSON.stringify(input);
    const { width, height, idle, fps } = options;
    return load(raw, {
        width,
        height: height ? height + 1 : undefined,
        idle: idle ? idle / 1000 : undefined,
        fps
    });
}
const NOOP = () => true;
const MAX = (max) => ([f]) => f <= max;
const MIN = (min) => ([f]) => f >= min;
function nearest(stamp, { cast, max, min }) {
    return cast.frames
        .filter(typeof max === 'number' && !isNaN(max) ? MAX(max) : NOOP)
        .filter(typeof min === 'number' && !isNaN(min) ? MIN(min) : NOOP)
        .sort(([a], [b]) => Math.abs((stamp - a)) - Math.abs((stamp - b)))[0][0];
}
function from(options) {
    const { at, from, to, cast } = options;
    if (typeof at === 'number') {
        return nearest(at / 1000, { cast });
    }
    return typeof from === 'number' && !isNaN(from)
        ? nearest(from / 1000, { cast, min: from / 1000 })
        : 0;
}
function to(options) {
    const { at, from, to, cast } = options;
    if (typeof at === 'number') {
        return nearest(at / 1000, { cast });
    }
    return typeof to === 'number' && !isNaN(from)
        ? nearest(to / 1000, { cast, max: to / 1000 })
        : cast.duration;
}
//# sourceMappingURL=index.js.map