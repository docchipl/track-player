import axios from "axios";
import { JSDOM, VirtualConsole } from "jsdom";
const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => {
    // No-op to skip console errors.
});
export default async function ServiceSIBNET(id) {
    try {
        const response = await axios.get(`https://video.sibnet.ru/shell.php?videoid=${id}`, {
            headers: {
                Referer: `https://video.sibnet.ru/shell.php?videoid=${id}`,
                "X-Requested-With": "XMLHttpRequest",
            },
            responseEncoding: "utf8",
        });
        const dom = new JSDOM(response.data, { virtualConsole });
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
        if (axios.isAxiosError(error)) {
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
}
