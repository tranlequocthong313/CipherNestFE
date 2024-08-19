import { ICoverFile } from "../interfaces/ICoverFile";

export type TCoverFileAction =
    | { type: "ADD"; payload: ICoverFile[] }
    | { type: "SELECT"; payload: { id: string } }
    | { type: "DELETE"; payload: { id: string } };
