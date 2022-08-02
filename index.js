import {CDAChecking} from "./modules/index.js";
import LinkToPlayer from "./functions/LinkToPlayer.js";

function checkPlayer(id){
  const clearID = LinkToPlayer(id);

  const data = CDAChecking(clearID);

  return(data);

}
export default checkPlayer;
