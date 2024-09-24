export interface Profesor {
    id: number;
    nombre: string;
    cargo: string;
    edificio: string;
    horario: string;
    telefono: string;
    correo: string;
    rol: string;
}

export interface ProfesorDTO {
    profesorId: number;
    position: number;
    nombre: string;
    edificio: string;
    horario: string;
    telefono: string;
    correo: string;
    rol: string;
}


export interface ProfesorDto
{
    id? : number;
    nombre: string,
    edificio: string,
    horario: string,
    telefono: string,
    correo: string,
}