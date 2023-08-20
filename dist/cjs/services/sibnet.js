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
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const virtualConsole = new jsdom_1.VirtualConsole();
virtualConsole.on("error", () => {
    // No-op to skip console errors.
});
function ServiceSIBNET(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://video.sibnet.ru/shell.php?videoid=${id}`, {
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
                    message: "Source removed by administrators.",
                };
            }
            return {
                status: 200,
                message: "Source exists.",
            };
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                if (!error.response || !error.response.data) {
                    return { status: 429, message: "Too Many Requests!" };
                }
                const { response } = error;
                if (response.status === 404) {
                    return {
                        status: 410,
                        message: "Source removed by administrators.",
                    };
                }
                return {
                    status: 500,
                    message: "Something went wrong!",
                    message_extra: "Skip this player or try again in couple seconds.",
                };
            }
            return {
                status: 500,
                message: "Something went wrong!",
                message_extra: "Skip this player or try again in couple seconds.",
            };
        }
    });
}
exports.default = ServiceSIBNET;
