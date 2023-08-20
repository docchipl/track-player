import { ResponseSource } from "interfaces/ResponseSource";
import { ServiceCDA, ServiceGDRIVE, ServiceSIBNET } from "./services/index";
import CompilePlayerData from "./utils/CompileEpisodeData";

interface DeterminateInterface {
  code: number;
  player_embed?: string;
  hosting?: string;
  player_id?: string;
  message?: string;
}

export default async function runScript({ source }): Promise<ResponseSource> {
  const dP: DeterminateInterface = CompilePlayerData(source);

  if ([501, 400].includes(dP.code)) {
    return {
      status: dP.code,
      message: dP.message,
    };
  }

  switch (dP.hosting) {
    case "cda": {
      return await ServiceCDA(dP.player_id);
    }
    case "gdrive": {
      return await ServiceGDRIVE(dP.player_id);
    }
    case "sibnet": {
      return await ServiceSIBNET(dP.player_id);
    }
    default:
      return {
        status: 501,
        message: "Not supported.",
      };
  }
}
