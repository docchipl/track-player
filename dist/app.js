"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./services/index");
const CompileEpisodeData_1 = __importDefault(require("./utils/CompileEpisodeData"));
async function runScript({ source }) {
    const dP = (0, CompileEpisodeData_1.default)(source);
    if ([501, 400].includes(dP.code)) {
        return {
            status: dP.code,
            message: dP.message,
        };
    }
    switch (dP.hosting) {
        case "cda": {
            return await (0, index_1.ServiceCDA)(dP.player_id);
        }
        case "gdrive": {
            return await (0, index_1.ServiceGDRIVE)(dP.player_id);
        }
        case "sibnet": {
            return await (0, index_1.ServiceSIBNET)(dP.player_id);
        }
        default:
            return {
                status: 501,
                message: "Not supported.",
            };
    }
}
exports.default = runScript;
//# sourceMappingURL=app.js.map