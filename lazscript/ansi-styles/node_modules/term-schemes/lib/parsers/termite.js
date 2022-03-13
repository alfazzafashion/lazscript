"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remmina_1 = require("./remmina");
exports.termite = remmina_1.createParser("termite", {
    group: 'colors',
    wrap: true
});
