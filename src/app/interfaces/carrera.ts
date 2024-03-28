export interface Carrera {
    id?: number;
    carreraNombre: string;
    descripcion: string;
    mision: string;
    vision: string;
    objetivos: string;
    mapaTutorial: string;
    materias: string;
    materiasOptativas: string;
    coordinadorID: number;
}

export interface Profesor {
    id?: number;
    nombre: string;
    cargo: string;
    edificio: string;
    horario: string;
    telefono: string;
    correo: string;
}

export interface Documentos {
    documentoID?: number;
    carreraId: number;
    nombreArchivo: string;
    rutaArchivo: string;
    fechaSubidade: number;
}