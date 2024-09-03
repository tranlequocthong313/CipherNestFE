import { IEmbeddedSecretFile, ISecretFile } from "../interfaces/ISecretFile";

export type TSecretFileAction =
    | { type: "ADD"; payload: { files: ISecretFile[] } }
    | { type: "SELECT"; payload: { id: string } }
    | { type: "SELECT_COVER_FILE"; payload: { coverFileId: string } }
    | { type: "DELETE"; payload: { id: string } }
    | { type: "DELETE_BY_COVER_FILE"; payload: { selectedCoverFileId: string } }
    | { type: "ADD_EMBEDDED_SECRET_FILES"; payload: { files: IEmbeddedSecretFile[] } }
    | { type: "DELETE_ALL"; };
