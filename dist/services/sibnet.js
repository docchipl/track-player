"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const virtualConsole = new jsdom_1.VirtualConsole();
virtualConsole.on("error", () => {
    // No-op to skip console errors.
});
async function ServiceSIBNET(id) {
    try {
        const response = await axios_1.default.get(`https://video.sibnet.ru/shell.php?videoid=${id}`, {
            headers: {
                Referer: `https://video.sibnet.ru/shell.php?videoid=${id}`,
                "X-Requested-With": "XMLHttpRequest",
            },
            responseEncoding: "utf8",
        });
        const dom = new jsdom_1.JSDOM(response.data, { virtualConsole });
        if (!dom.window.document.querySelector("#player_container")) {
            return {
                status: 410,
                message: "Source removed by administrators",
            };
        }
        return {
            status: 200,
            message: "Source exists",
        };
    }
    catch (error) {
        const { response } = error;
        if (response.status === 404) {
            return {
                status: 410,
                message: "Source removed by administrators",
            };
        }
        return {
            status: 500,
            message: "Something went wrong!",
            message_extra: "Skip this player or try again in couple seconds.",
        };
    }
}
exports.default = ServiceSIBNET;
//# sourceMappingURL=sibnet.js.map