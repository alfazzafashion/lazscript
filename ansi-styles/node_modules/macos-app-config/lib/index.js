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
const os = require("os");
const path = require("path");
const bundleId = require("@marionebl/bundle-id"); // tslint:disable-line
const bplistParser = require("bplist-parser"); // tslint:disable-line
const sander = require("@marionebl/sander"); // tslint:disable-line
exports.default = macosAppConfig;
function macosAppConfig(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = assert(input) ? input : "";
        if (os.platform() !== "darwin") {
            return {};
        }
        const id = yield getBundleId(app);
        if (!id) {
            return {};
        }
        const configPath = resolveConfig(id);
        if (!fs.existsSync(configPath)) {
            return {};
        }
        return bplistParser.parseBuffer(yield sander.readFile(configPath));
    });
}
function sync(input) {
    const app = assert(input) ? input : "";
    const id = getBundleIdSync(app);
    if (!id) {
        return {};
    }
    const configPath = resolveConfig(id);
    if (!fs.existsSync(configPath)) {
        return {};
    }
    return bplistParser.parseBuffer(fs.readFileSync(configPath));
}
exports.sync = sync;
function assert(app) {
    if (typeof app === "undefined") {
        throw new TypeError("macos-app-config: missing required parameter app");
    }
    if (typeof app !== "string") {
        throw new TypeError(`macos-app-config: app must be of type string, received "${app}" of type "${typeof app}"`);
    }
    return true;
}
function getBundleId(app) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isBundleId(app)) {
            return app;
        }
        try {
            return yield bundleId(app);
        }
        catch (_a) {
            return '';
        }
    });
}
function getBundleIdSync(app) {
    if (isBundleId(app)) {
        return app;
    }
    try {
        return bundleId.sync(app);
    }
    catch (_a) {
        return '';
    }
}
function isBundleId(app) {
    return app.split(".").filter(Boolean).length === 3;
}
function resolveConfig(id) {
    return path.join(os.homedir(), "Library", "Preferences", `${id}.plist`);
}
