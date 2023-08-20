import { ServiceCDA, ServiceGDRIVE, ServiceSIBNET } from "./services/index.js";
import CompilePlayerData from "./utils/CompileEpisodeData.js";

export default function runScript({ source }) {
  const determinatePlayer = CompilePlayerData(source);

  if ([501, 400].includes(determinatePlayer.code)) {
    return console.log(code.message);
  }

  switch (determinatePlayer.hosting) {
    case "cda": {
      return ServiceCDA(determinatePlayer.player_id);
    }
    case "gdrive": {
      return ServiceGDRIVE(determinatePlayer.player_id);
    }
    case "sibnet": {
      return ServiceSIBNET(determinatePlayer.player_id);
    }
    default:
      return {
        status: 501,
        message: "Not supported.",
      };
  }
}
