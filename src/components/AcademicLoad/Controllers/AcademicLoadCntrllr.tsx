//import { IOPTRspns } from "../../../models/Helpers";
import { Console } from "console";
import { IAcademicLoad, ICareers, IERRspns, IGroups, IOPTRspns, IVaidateTime } from "../Models/ALModels";
import ALGlobalCtrllr from "./ALGlobalCtrllr";

class AcademicLoadCntrllr {    
    ALGC: ALGlobalCtrllr = new ALGlobalCtrllr();

    public Careers: Promise<ICareers[]>;
    public Groups: IGroups[];

    constructor() {
        this.Careers = this.getAllCareers();        
        //this.Groups = new IGroups[];
    }

    public async ActivateAcademicLoad(item:IAcademicLoad):Promise<IAcademicLoad> {
        try {
            console.log("ACTIVANDO");
            let pars: any = {"idAL": item.idCargasAcademicas };
            let op : IOPTRspns = await this.ALGC.algAllQueries(2,pars ,'activateAcademicLoad');
            let err: IERRspns[] = JSON.parse(op.message);            
            if (typeof(err[0].IsError) !== "undefined") {
                throw (err[0].ERR_MESSAGE);
            } else {
                let al : IAcademicLoad[] = JSON.parse(op.value);
                return al[0];
            }
        } catch (ex) {
            throw(ex);
        }
    }
    
    public async validateSchedulesHi(item:IAcademicLoad): Promise<string>
    { //Valida horarios
        try {
            console.log('GOii: ' + item.horaInicio);
            console.log('GOif: ' + item.horaFin);
            let pars: any = {
                "idAL": item.idCargasAcademicas,
                "idSubject": item.idMateria, 
                "idGroup": item.idGrupo, 
                "idTeacher": item.idMaestro, 
                "hi": item.horaInicio, 
                "hf": item.horaFin
            };
            console.log(pars);
            let op : IOPTRspns = await this.ALGC.algAllQueries(2,pars ,'validateSchedulesHi');
            let vt: IVaidateTime[] = JSON.parse(op.message);
            if(vt[0].RM === 'GO')
                return vt[0].RM;
            else
                throw(vt[0].RM);
            
        } catch (ex) {
            throw(ex);
        }
    }

    public async validateSchedulesHf(item:IAcademicLoad): Promise<string>
    { //Valida horarios
        try {
            console.log('GOfi: ' + item.horaInicio);
            console.log('GOff: ' + item.horaFin);
            let pars: any = {
                "idAL": item.idCargasAcademicas,
                "idSubject": item.idMateria, 
                "idGroup": item.idGrupo, 
                "idTeacher": item.idMaestro, 
                "hi": item.horaInicio, 
                "hf": item.horaFin
            };   
            console.log(pars);         
            let op : IOPTRspns = await this.ALGC.algAllQueries(2,pars ,'validateSchedulesHf');
            let vt: IVaidateTime[] = JSON.parse(op.message);
            if(vt[0].RM === 'GO')
                return vt[0].RM;
            else
                throw(vt[0].RM);
            
        } catch (ex) {
            throw(ex);
        }
    }

    public async updateSchedulesHi(item: IAcademicLoad): Promise<string>
    { //Valida horarios
        try {
            //console.log(idAL);
            let pars: any = {"idAL": item.idCargasAcademicas, "hi": item.horaInicio };
            let op : IOPTRspns = await this.ALGC.algAllQueries(2,pars ,'updateSchedulesHi');
            let careers : ICareers[] = op.value;
            console.log(op);
            return op.message;
        } catch (ex) {
            throw(ex);
        }
    }

    public async updateSchedulesHf(item: IAcademicLoad): Promise<string>
    { //Valida horarios
        try {
            //console.log(idAL);
            let pars: any = {"idAL": item.idCargasAcademicas, "hf": item.horaFin };
            let op : IOPTRspns = await this.ALGC.algAllQueries(2,pars ,'updateSchedulesHf');
            let careers : ICareers[] = op.value;
            console.log(op);
            return op.message;
        } catch (ex) {
            throw(ex);
        }
    }

    private async getAllCareers<ICareers>(): Promise <ICareers[]> {
        try {
            console.log('NO ME JODAS LAS PELOTA...');
            let op : IOPTRspns = await this.ALGC.algAllQueries(0,'','get_all_careers');
            let careers : ICareers[] = op.value;
            //careers = op.value;
            return careers;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: getAllCareers]');
            throw(ex)
        }
    }

    public async GetAllGroupsByIdCareer(idCareer: number): Promise<void> {
        
        this.Groups = await this.getAllGroupsByIdCareer(idCareer);        
    }

    private async getAllGroupsByIdCareer<IGroups>(idCareer: number): Promise <IGroups[]> {
        try{
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, idCareer.toString(), 'get_groups_by_id_career');
            let groups : IGroups[] = op.value;
            return groups;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: getAllCareers]');
            throw(ex)
        }
    }

    public async getAcademicLoadsByIdGroup<IAcademicLoad>(idGroup: number) {
        //option:0, value: "", message:'get_all_careers'
        let op : IOPTRspns = await this.ALGC.getAllQueries(0, idGroup.toString(), 'get_academic_loads_by_id_group');
        let careers : IAcademicLoad[] = op.value;
        //console.log(op);
        return careers;
    }

    public async ActivateAL(al: IAcademicLoad): Promise<IAcademicLoad> {
        try {
            let pars: any = {
                "idAL": al.idCargasAcademicas, 
                "idTeacher": al.idMaestro,
                "idMateria": al.idMateria, 
                "idGrupo": al.idGrupo, 
                "horaI": al.horaInicio,
                "horaF": al.horaFin, 
                "sessions": al.sesiones
            };
            console.log('HERE 2: *************');
            console.log(pars);
            let op : IOPTRspns = await this.ALGC.algAllQueries(2,pars ,'activateAL');
            console.log('HERE 2.1: *************');
            let response : IAcademicLoad = JSON.parse(op.value);
            //console.log(response);
            //console.log(op);
            return response;
        } catch (error) {
            throw(error);
        }
    }

    public async getAcademicLoadById<IAcademicLoad>(idAL: number): Promise<IAcademicLoad[]> {
        try {
            let pars: any = {
                "idAL": idAL
            };
            let op : IOPTRspns = await this.ALGC.algAllQueries(2,pars ,'getAcademicLoadById');
            let response : IAcademicLoad[] = JSON.parse(op.value);
            return response;
        } catch (error) {
            throw(error);
        }
    }
}

export default AcademicLoadCntrllr