import axios from "axios";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});

export default function ServiceCDA(id) {
  const request = axios
    .get(`https://ebd.cda.pl/620x395/${id}`, {
      headers: {
        Referer: `https://ebd.cda.pl/620x395/${id}`,
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then(function (response) {
      const dom = new JSDOM(response.data, { virtualConsole });

      if (!dom.window.document.querySelector("h1.title a"))
        return { status: 429, message: "Too Many Requests!" };

      const items = dom.window.document.querySelector("h1.title a").textContent;
      if (items) {
        return {
          status: 200,
          message: "Source exists",
        };
      } else {
        return {
          status: 206,
          message: "Page loaded, but couldn't verify if source exists",
        };
      }
    })
    .catch((err) => {
      if (
        !err.response ||
        (err.response && !err.response.data) ||
        !err.response.data
      )
        return { status: 429, message: "Too Many Requests!" };

      const dom = new JSDOM(err.response.data, { virtualConsole });
      const items = dom.window.document.querySelector("body p");

      if (items) {
        if (items.textContent.includes("usunięty")) {
          return {
            status: 410,
            message: "Source removed by administrators",
          };
        } else {
          return {
            status: 500,
            message: "Something went wrong!",
          };
        }
      } else {
        return {
          status: 500,
          message: "Something went wrong!",
          message_extra: "Skip this player or try again in couple seconds.",
        };
      }
    });

  return request;
}
