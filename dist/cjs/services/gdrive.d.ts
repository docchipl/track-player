export default function ServiceGDRIVE(id: string): Promise<{
    status: number;
    message: string;
    message_extra?: string;
}>;
