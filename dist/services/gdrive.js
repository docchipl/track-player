"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function ServiceGDRIVE(id) {
    try {
        const response = await axios_1.default.get(`https://drive.google.com/file/d/${id}/preview`, {
            headers: {
                Referer: `https://drive.google.com/file/d/${id}/preview`,
                "X-Requested-With": "XMLHttpRequest",
            },
        });
        const { status, request: { host }, } = response;
        if (status === 200 && host && host === "accounts.google.com") {
            return {
                status: 403,
                message: "Request access only video.",
            };
        }
        if (status === 200) {
            return {
                status: 200,
                message: "Source exists.",
            };
        }
    }
    catch (error) {
        const { response } = error;
        if (response.status === 403) {
            return {
                status: 410,
                message: "Source removed by administrators (Legal Request).",
            };
        }
        if (response.status === 404) {
            return {
                status: 410,
                message: "Source removed by administrators.",
            };
        }
        return {
            status: 500,
            message: "Something went wrong!",
        };
    }
}
exports.default = ServiceGDRIVE;
//# sourceMappingURL=gdrive.js.map