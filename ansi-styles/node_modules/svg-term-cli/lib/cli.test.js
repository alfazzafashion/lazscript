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
const execa = require("execa");
const path = require("path");
const pkg = require("../package");
const bin = (args = [], options = {}) => __awaiter(this, void 0, void 0, function* () {
    try {
        return yield execa("ts-node", [path.join(__dirname, "./cli.ts"), ...args], options);
    }
    catch (err) {
        return err;
    }
});
test("prints help with non-zero exit code", () => __awaiter(this, void 0, void 0, function* () {
    const result = yield bin([], { input: "" });
    expect(result.code).not.toBe(0);
    expect(result.stdout).toContain("svg-term: either stdin, --cast, --command or --in are required");
}));
test("prints help with zero exit code for --help", () => __awaiter(this, void 0, void 0, function* () {
    const result = yield bin(["--help"], { input: "" });
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("print this help");
}));
test("prints version with zero exit code for --version", () => __awaiter(this, void 0, void 0, function* () {
    const result = yield bin(["--version"], { input: "" });
    expect(result.code).toBe(0);
    expect(result.stdout).toBe(pkg.version);
}));
test("works for minimal stdin input", () => __awaiter(this, void 0, void 0, function* () {
    const result = yield bin([], {
        input: '[{"version": 2, "width": 1, "height": 1}, [1, "o", "foo"]]'
    });
    expect(result.code).toBe(0);
}));
