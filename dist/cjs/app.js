"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./services/index");
const CompileEpisodeData_1 = __importDefault(require("./utils/CompileEpisodeData"));
function runScript({ source }) {
    return __awaiter(this, void 0, void 0, function* () {
        const dP = (0, CompileEpisodeData_1.default)(source);
        if ([501, 400].includes(dP.code)) {
            return {
                status: dP.code,
                message: dP.message || "Error: Code description not found.",
            };
        }
        if (!dP.player_id) {
            return {
                status: 409,
                message: "Destructuring failed: Unable to extract 'id' from the URL string.",
            };
        }
        switch (dP.hosting) {
            case "cda": {
                return yield (0, index_1.ServiceCDA)(dP.player_id);
            }
            case "gdrive": {
                return yield (0, index_1.ServiceGDRIVE)(dP.player_id);
            }
            case "sibnet": {
                return yield (0, index_1.ServiceSIBNET)(dP.player_id);
            }
            default:
                return {
                    status: 501,
                    message: "Unsupported service.",
                };
        }
    });
}
exports.default = runScript;
