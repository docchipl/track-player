export default function ServiceSIBNET(id: string): Promise<{
    status: number;
    message: string;
    message_extra?: string;
}>;
