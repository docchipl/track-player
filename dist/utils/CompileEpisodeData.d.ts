export default function CompilePlayerData(player: string): {
    code: number;
    player_embed: string;
    hosting: string;
    player_id: any;
    message?: undefined;
} | {
    code: number;
    message: string;
    player_embed?: undefined;
    hosting?: undefined;
    player_id?: undefined;
};
