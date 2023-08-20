interface ResponseSource {
    status: number;
    message: string;
    message_extra?: string;
}
export default function runScript({ source }: {
    source: string;
}): Promise<ResponseSource>;
export {};
