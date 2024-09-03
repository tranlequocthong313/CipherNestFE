import { ICoverFile } from "../interfaces/ICoverFile";

export type TCoverFileAction =
    | { type: "ADD"; payload: { files: ICoverFile[] } }
    | { type: "SELECT"; payload: { id: string } }
    | { type: "ON_ACTION_SELECT"; payload: { id: string } }
    | { type: "UPDATE_INFO"; payload: { id: string, new_info: Object } }
    | { type: "DELETE"; payload: { id: string } }
    | { type: "DELETE_ALL"; };
