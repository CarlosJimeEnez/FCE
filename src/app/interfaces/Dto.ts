
export interface CarreranombreDto {
    id?: number;
    nombre: string;
}

export interface CarreraMisionDto {
    id?: number;
    mision: string;
    vision: string;
}

export interface CarreraObjetivosDto {
    id?: number;
    objetivos: string;
}

export interface CarreraCatAsignaturasDto
{
    carreraId: number
    catalogoAsignaturaUrl: string;
}

export interface CarreraMapaTutorialDto
{
    carreraId: number
    mapaTutorialUrl: string; 
}

export interface CarreraListadoMateriasDto
{
    carreraId: number
    listadoMateriasUrl: string; 
}

export interface CarreraListadoOpURLDto
{
    carreraId: number
    listadoMateriasOpURL: string; 
}

export interface AtributoEgresoDto
{
    id?: number;
    carreraId: number;
    descripcion: string;
}

export interface ObjetivosEducacionalesDto
{
    id?: number;
    carreraId: number;
    descripcion: string;
}

export interface CompetenciasEspecificasDto
{
    id?: number;
    carreraId: number;
    descripcion: string;
}

export interface CoordinadorDto
{
    id?: number;
    carreraId: number;
    contactoId?: number ;
}

export interface AdsDto
{
    id?: number;
    nombreArchivo: string;
    url: string;
    link: string;
}

export interface AdsEditDto
{
    id? : number;
    nombreArchivo: string;
    link: string;
}

export interface AdsDtoFile
{
    nombreArchivo: string;
    link: string;
    file: File; 
}
