export default function ServiceCDA(id: string): Promise<{
    status: number;
    message: string;
    message_extra?: string;
}>;
