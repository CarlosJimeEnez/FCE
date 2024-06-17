export interface Carrera {
    id?: number;
    carreraNombre: string;
    mision: string;
    vision: string;
    objetivos: string;
}

export interface CarreraDto {
    id?: number;
    carreraNombre: string;
    mision: string;
    vision: string;
    objetivos: string;
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