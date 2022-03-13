"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const globby = require("globby");
const path = require("path");
const util_1 = require("util");
const pkgDir = require('pkg-dir');
const readFile = util_1.promisify(fs.readFile);
function fixture(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const fixtures = path.join(yield pkgDir(__dirname), 'fixtures');
        const fixturePath = yield resolveFixture(id);
        if (!fs.existsSync(fixturePath)) {
            const rel = path.relative(process.cwd(), fixturePath);
            const available = yield globby([`**/*`], { cwd: fixtures, nodir: true });
            throw new RangeError(`Could not find fixture ${id} at ${rel}. Available fixtures: ${available}`);
        }
        return String(yield readFile(fixturePath));
    });
}
exports.fixture = fixture;
function resolveFixture(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return path.join(path.join(yield pkgDir(__dirname), 'fixtures'), id);
    });
}
exports.resolveFixture = resolveFixture;
exports.seti = {
    0: [50, 50, 50],
    1: [194, 40, 50],
    2: [142, 196, 61],
    3: [224, 198, 79],
    4: [67, 165, 213],
    5: [139, 87, 181],
    6: [142, 196, 61],
    7: [238, 238, 238],
    8: [50, 50, 50],
    9: [194, 40, 50],
    10: [142, 196, 61],
    11: [224, 198, 79],
    12: [67, 165, 213],
    13: [139, 87, 181],
    14: [142, 196, 61],
    15: [255, 255, 255],
    background: [17, 18, 19],
    bold: [202, 206, 205],
    cursor: [227, 191, 33],
    text: [202, 206, 205]
};
exports.atom = {
    0: [0, 0, 0],
    1: [253, 95, 241],
    2: [135, 195, 138],
    3: [255, 215, 177],
    4: [133, 190, 253],
    5: [185, 182, 252],
    6: [133, 190, 253],
    7: [224, 224, 224],
    8: [0, 0, 0],
    9: [253, 95, 241],
    10: [148, 250, 54],
    11: [245, 255, 168],
    12: [150, 203, 254],
    13: [185, 182, 252],
    14: [133, 190, 253],
    15: [224, 224, 224],
    background: [22, 23, 25],
    bold: [197, 200, 198],
    cursor: [208, 208, 208],
    text: [197, 200, 198]
};
