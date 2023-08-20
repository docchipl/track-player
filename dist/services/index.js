"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSIBNET = exports.ServiceGDRIVE = exports.ServiceCDA = void 0;
var cda_1 = require("./cda");
Object.defineProperty(exports, "ServiceCDA", { enumerable: true, get: function () { return __importDefault(cda_1).default; } });
var gdrive_1 = require("./gdrive");
Object.defineProperty(exports, "ServiceGDRIVE", { enumerable: true, get: function () { return __importDefault(gdrive_1).default; } });
var sibnet_1 = require("./sibnet");
Object.defineProperty(exports, "ServiceSIBNET", { enumerable: true, get: function () { return __importDefault(sibnet_1).default; } });
//# sourceMappingURL=index.js.map