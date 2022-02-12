"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
var GuessedTerminal;
(function (GuessedTerminal) {
    GuessedTerminal["hyper"] = "hyper";
    GuessedTerminal["iterm2"] = "iterm2";
    GuessedTerminal["terminal"] = "terminal";
})(GuessedTerminal = exports.GuessedTerminal || (exports.GuessedTerminal = {}));
function guessTerminal() {
    if (os.platform() !== "darwin") {
        return null;
    }
    switch (process.env.TERM_PROGRAM) {
        case "Apple_Terminal":
            return GuessedTerminal.terminal;
        case "Hyper":
            return GuessedTerminal.hyper;
        case "iterm":
            return GuessedTerminal.iterm2;
        default:
            return null;
    }
}
exports.guessTerminal = guessTerminal;
