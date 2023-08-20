import { ResponseSource } from "interfaces/ResponseSource";
export default function runScript({ source }: {
    source: any;
}): Promise<ResponseSource>;
