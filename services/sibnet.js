import axios from "axios";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});

export default function ServiceSIBNET(id) {
  const request = axios
    .get(`https://video.sibnet.ru/shell.php?videoid=${id}`, {
      headers: {
        Referer: `https://video.sibnet.ru/shell.php?videoid=${id}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      responseEncoding: "utf8",
    })
    .then(function (response) {
      const { request, status, data } = response;
      const dom = new JSDOM(data, { virtualConsole });

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
    })
    .catch((error) => {
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
    });

  return request;
}
