

//MAQUETA GLOBAL DE CARGA ACADÉMICA
export interface IALGlblConf {
    idALGC: number;
    academicLoad: IAcademicLoad[];
}

/*
    #idMateria, Nombre, Cuatrimestre, Carreras_idCarrera, clavemateria, credito, duracion, esSeriada
    #idCargasAcademicas, Estatus, Maestros_idMaestro, Materias_idMateria, Grupos_idGrupo, activadopor, fechaasignacioncarga, estatusPago, horaInicio, horaFin, intervaloDiasSesiones
*/
export interface IALDisplay {
    idCargasAcademicas: number;
    idMateria: number;
    Cuatrimestre: string;
    Estatus: string;
    Maestros_idMaestro: number;
    Materias_idMateria: number;
    Grupos_idGrupo: number;
    Maestro: string;
    Materia: string;
    Nombre: string;
    idMaestroHCA: number;
    MaestroHCA: number;

}

/********************* */
/* G L O B A L S */
export interface IOPTRspns
{
    option: number;
    value: any;
    message: string;
}

export interface IERRspns
{
    IsError: boolean;
    ERR_MESSAGE: string;
}

export interface IGroup
{
    idGrupo: number;
    Nombre: string;
    Carreras_idCarrera: number;    
    Carrera: string;
    anio: string;
    gruposep: string; 
    mes: string;
    activadopor: string;
    cicloingreso: string;
    cicloactual: string;
    periodoingreso: string;
    periodoactual: string;
    cuatrimestregrupo: string;
    estatusadmisiones: string;
    visible: string;
    vigenciacredencial: string;
    fechaalta: string;
    fechainicio: string;    
}
/**************** */

export interface ISchoolCycle
{
    idSCycle: number;
    SchoolCycle: string;
}

export interface IAcademicLoad
{
    idCargasAcademicas: number;
    idMaestro: number;
    idMateria: number;
    idGrupo: number;
    estatus: string;
    duracion: string;
    Maestro: string;
    Materia: string;
    Cuatrimestre: string;
    sesiones: number;
    isAcademicLoadValidated: boolean;
    horaInicio: string;
    horaFin: string;
    btnAction: number;
    intervaloDiasSesiones: number;
    modalidad: string;
}


/*********************************************** */
/* R E P O R T S */
interface TopCategoriesProps {
    data: Array<IRptGlobal>;
  }

export interface IRptGlobal {
    label: string;
    value: number;
}
/** AVAILABLES TEACHERS */
export interface IAvailableTeacher {
    idDisponibilidad: number;
    idMaestro: number;
    idMateria: number;
    Nombre: string;
    Apaterno: string;
    Amaterno: string;
    disPrioridad: number;
    Sexo: string;
    Grado: string;
    email: string;
}

/***************** */

export interface IGroups
{
    idGrupo: number;
    Nombre: string;
    Carreras_idCarrera: number;    
    anio: string;
    gruposep: string; 
    mes: string;
    activadopor: string;
    cicloingreso: string;
    cicloactual: string;
    periodoingreso: string;
    periodoactual: string;
    cuatrimestregrupo: string;
    estatusadmisiones: string;
    visible: string;
    vigenciacredencial: string;
    fechaalta: string;
    fechainicio: string;    
}

export interface IAcademicCalendar {
    idcalendario_escolar: number;
    idSchoolCycle: number;
    fecha: string;
    descripcion: string;
    es_inhabil: boolean;
    activo: boolean;
}

export interface IVaidateTime {
    RM: string; //Response Message
}

/***************** */
export interface ICareers
{
    idCarrera: number;
    Nombre: string;
    Grado: string;
    Modalidad: string;
    revoe: string;
    vigenciarevoe: string;
    modalidadsep: string;
}

export interface ITeachers
{
    idMaestro: number;
    Nombre: string;
    Apaterno: string;
    Amaterno: string;
    Clave: string;
    Sexo: string;
    Grado: string;
    email: string;
    telefono: string;
    cedula: string;
    password: string;
}



export interface ITeacher {
    idMaestro: number;
    Nombre: string;
    Apaterno: string;
    Amaterno: string;
    Clave: string;
    Sexo: string;
    Grado: string;
    email: string;
    telefono: string;
    cedula: string;
    password: string;
}

export interface ISubjects
{
    idMateria: number;
    Nombre: string;
    Cuatrimestre: string;
    Carreras_idCarrera: number;
    clavemateria: string;
    credito: string;
    duracion: number;
    esSeriada: boolean;
    idMateriaPadre: number;
}

export interface ITeacherDisponibilities
{
    idDisponibilidad: number;
    Programa: string;
    Materia: string;
    Cuatrimestre: string;
    duracion: number;
    disPrioridad: number;
    disPromedio: number;
    idMateria: number;
    activo: boolean;
}

/********************** */
export interface ITeacherDisponibilitySubject {
    idMaestro: number;
    Maestro: string;
    Prioridad: number;
    Active: string;
    JSONCargaAsignada: ICargasAsignadas[];
}
export interface ICargasAsignadas {
    Carrera: string;
    Materia: string;
    Grupo: string;
}
