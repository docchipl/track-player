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
function ServiceCDA(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://ebd.cda.pl/620x395/${id}`, {
                headers: {
                    Referer: `https://ebd.cda.pl/620x395/${id}`,
                    "X-Requested-With": "XMLHttpRequest",
                },
            });
            const dom = new jsdom_1.JSDOM(response.data, { virtualConsole });
            const h1TitleA = dom.window.document.querySelector("h1.title a");
            if (!h1TitleA) {
                return { status: 429, message: "Too Many Requests!" };
            }
            const items = h1TitleA.textContent;
            if (items) {
                return {
                    status: 200,
                    message: "Source exists.",
                };
            }
            return {
                status: 206,
                message: "Page loaded, but couldn't verify if source exists.",
            };
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                if (!error.response || !error.response.data) {
                    return { status: 429, message: "Too Many Requests!" };
                }
                const dom = new jsdom_1.JSDOM(error.response.data, { virtualConsole });
                const items = dom.window.document.querySelector("body p");
                if (!items) {
                    return {
                        status: 500,
                        message: "Something went wrong!",
                        message_extra: "Skip this player or try again in couple seconds.",
                    };
                }
                if (items.textContent && items.textContent.includes("usunięty")) {
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
exports.default = ServiceCDA;
