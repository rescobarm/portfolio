//import { IOPTRspns } from "../../../models/Helpers";
import { IOPTRspns, ISubjects, ITeacherDisponibilitySubject } from "../Models/ALModels";
import ALGlobalCtrllr from "./ALGlobalCtrllr";


class AcademicLoadConfCntrllr  {
    ALGC: ALGlobalCtrllr = new ALGlobalCtrllr();

    public Materias:Promise<ISubjects[]>;
    public IdMateria: number = 0;
    public IdGrupo: number = 0;
    public IdMaestro: number = 0;
    public NoInterval: number = 7;
    

    constructor(idCareer: number, idGrupo: number) {
        this.IdGrupo = idGrupo;
        this.Materias = this.getSubjectsByIdCareer(idCareer);
    }

    public async GETAvailableTeachersByIdSubject(idSubject: number, idGroup: number): Promise<ITeacherDisponibilitySubject[]> {
        try{
            let pars: any = { "idSubject": idSubject, "idGroup": idGroup };
            let op : IOPTRspns = await this.ALGC.algAllQueries(2, pars, 'getTeacherForDisponibilityByIdSubjec');
            let td : ITeacherDisponibilitySubject[] = JSON.parse(op.value);
            //console.log('______________________________________________________________');
            /*for(let i=0; i<=td.length; i++){
               for(let j = 0; j<=td[i].JSONCargaAsignada.length; j++) {
                    console.log(td[i].JSONCargaAsignada[j].Carrera);
               }
            }*/
            //console.log('______________________________________________________________');
            return td;
        }
        catch(ex)
        {
            console.log('ERROR: [GETAvailableTeachersByIdSubject: getTeacherDisponibilityByIdSubjec]');
            throw(ex)
        }
    }

    public async GETAssignedTeacherByIdSubject<ITeacherDisponibilitySubject>(idSubject: number, idGroup: number): Promise<ITeacherDisponibilitySubject[]> {
        try{
            //console.log(idSubject);
            let pars: any = { "idSubject": idSubject, "idGroup": idGroup };
            console.log('**********************')
            console.log(pars);
            console.log('**********************')
            let op : IOPTRspns = await this.ALGC.algAllQueries(2, pars, 'getAssignedTeacherByIdSubjectAndGroup');
            let teachers : ITeacherDisponibilitySubject[] = op.value;
            return teachers;
        }
        catch(ex)
        {
            console.log('ERROR: [GETAvailableTeachersByIdSubject: getTeacherDisponibilityByIdSubjec]');
            throw(ex)
        }
    }

    public async SETAcademicLoad(idMaestro: number, idMateria: number, idGrupo: number, interval: number) : Promise<boolean> {
        try {
            let pars: any = { "idMaestro": idMaestro, "idMateria": idMateria, "idGrupo": idGrupo, "interval": interval };
            console.log(pars);
            let op : IOPTRspns = await this.ALGC.algAllQueries(2, pars, 'setAcademicLoad');
            let ok : boolean = op.value;
            return ok;
        } catch (e) {
            throw(e);
        }
    }

    public async UPDATEAcademicLoad(idMaestro: number, idMateria: number, idGrupo: number, oldTeacher: number, interval: number) : Promise<boolean> {
        try {
            let pars: any = { "idMaestro": idMaestro, "idMateria": idMateria, "idGrupo": idGrupo, "oldTeacher": oldTeacher, "interval": interval };
            console.log(' HERE***************')
            console.log(pars);
            let op : IOPTRspns = await this.ALGC.algAllQueries(2, pars, 'updateAcademicLoad');
            let ok : boolean = op.value;
            return ok;
        } catch (e) {
            throw(e);
        }
    }

    private async getSubjectsByIdCareer<ISubjects>(idCareer: number) : Promise<ISubjects[]> {
        try{
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, idCareer.toString(), 'get_subjects_by_id_career');
            let careers : ISubjects[] = op.value;
            return careers;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: getAllCareers]');
            throw(ex)
        }
    }
}

export default AcademicLoadConfCntrllr
