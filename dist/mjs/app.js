import { ServiceCDA, ServiceGDRIVE, ServiceSIBNET } from "./services/index";
import CompilePlayerData from "./utils/CompileEpisodeData";
export default async function runScript({ source }) {
    const dP = CompilePlayerData(source);
    if ([501, 400].includes(dP.code)) {
        return {
            status: dP.code,
            message: dP.message || "Error: Code description not found.",
        };
    }
    if (!dP.player_id) {
        return {
            status: 409,
            message: "Destructuring failed: Unable to extract 'id' from the URL string.",
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
                message: "Unsupported service.",
            };
    }
}
