import { DocumentosDto } from "./documento";
import { ObjetivosEducacionalesDto } from "./Dto";

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

export interface CarreraPostDto {
    id?: number;
    carreraNombre: string;
    mision: string;
    vision: string;
    objetivos: string;
    atributosEducacionales: AtributosEducacionales[];
    objetivosEducacionales: ObjetivosEducacionales[]; 
    competenciasEspecificas: CompetenciasEspecificas[];
    catalogoAsignatura: DocumentosDto;
    mapaTutorial: DocumentosDto; 
    listadoMaterias: DocumentosDto;
    listadoMateriasOptativas: DocumentosDto; 
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