export interface Documentos {
    id?: number;
    carreraId: number;
    nombreArchivo: string;
    rutaArchivo: string;
    file: any
}

export interface DocumentosDto {
    id?: number;
    carreraId: number;
    nombreArchivo: string;
    file: any;
}
