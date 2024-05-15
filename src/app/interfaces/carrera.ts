export interface Carrera {
    id?: number;
    carreraNombre: string;
    mision: string;
    vision: string;
    descripcion: string;
    coordinadorID: number;
    objetivos: string;
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

export interface AtributosEducacionales {
    id?: number;
    carreraId: number;
    descripcion: string;
}

export interface ObjetivosEducacionales {
    id?: number;
    carreraId: number;
    descripcion: string;
}

export interface CompetenciasEspecificas {
    id?: number;
    carreraId: number;
    descripcion: string;
}