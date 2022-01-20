
import { ICareers, IOPTRspns, ITeacherDisponibilities, ITeachers } from "../Models/ALModels";
import ALGlobalCtrllr from "./ALGlobalCtrllr";

class DisponibilityCntrllr {
    ALGC: ALGlobalCtrllr = new ALGlobalCtrllr();
    public idMaestro: number = 0;
    public idCarrera: number = 0;
    public Careers: Promise<ICareers[]>;
    public Teachers: Promise<ITeachers[]>;
    constructor() {
        //console.log('controlador disponibilidad');
        //this.Careers = this._getAllCareers();
        //this._getAllCareers();
        //console.log(this.Careers);
        this.Careers = this.getAllCareers();
        this.Teachers = this.getAllTeachers();
    }

    public async setDisponibility<ITeacherDisponibilities>(idMateria:number): Promise<ITeacherDisponibilities>  {
        try{
            let pars: any = { "idMateria": idMateria, "idMaestro": this.idMaestro };
            let op : IOPTRspns = await this.ALGC.getAllQueries(1, pars,'set_teacher_disponibility');
            let td: ITeacherDisponibilities = op.value;
            return td;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: getAllCareers]');
            throw(ex)
        }
    }

    public async updateSubjectDuration(idSubject: number, duration: number): Promise<boolean> {
        try{
            let pars: any = { "idSubject": idSubject, "duration": duration };
            let op : IOPTRspns = await this.ALGC.algAllQueries(1, pars, 'updateSubjectDurationById');        
            let resp : boolean = op.value;
            if(!resp)
                console.log(op.message);
            return resp;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: updatePriorityTeacherDisponibility]');
            throw(ex)
        }
    }

    public async updatePriorityTeacherDisponibility(idDisp: number, priority: number): Promise<boolean> {
        try{
            let pars: any = { "idDisponibility": idDisp, "priority": priority };
            let op : IOPTRspns = await this.ALGC.algAllQueries(1, pars, 'update_priority_teacher_disponibility');        
            let resp : boolean = op.value;
            if(!resp)
                console.log(op.message);
            return resp;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: updatePriorityTeacherDisponibility]');
            throw(ex)
        }
    }

    private async getAllCareers<ICareers>(): Promise <ICareers[]> {
        try{
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

    private async getAllTeachers<ITeachers>(): Promise <ITeachers[]> {
        try{
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, '', 'get_all_teachers');
            let careers : ITeachers[] = op.value;
            return careers;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: getAllCareers]');
            throw(ex)
        }
    }
    
    public async getSubjectsByIdCareer<ISubjects>(idCareer: number) : Promise<ISubjects[]> {
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

    public async getTeacherDisponibilities<ITeacherDisponibilities>(id: number) : Promise<ITeacherDisponibilities[]> {
        try{
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, id.toString(), 'get_teacher_disponibilities');
            let teaDisp : ITeacherDisponibilities[] = op.value;
            return teaDisp;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: getAllCareers]');
            throw(ex)
        }
    }

    /*public async getAllCareers_<ICareers>() {
        //option:0, value: "", message:'get_all_careers'
        let op : IOPTRspns = await this.ALGC.getAllQueries(0,'','get_all_careers');
        let careers : ICareers[] = op.value;
        return careers;
    }*///ISubjects

    public async getAllTeachers_<ITeachers>() {
        let op : IOPTRspns = await this.ALGC.getAllQueries(0, '', 'get_all_teachers');
        let careers : ITeachers[] = op.value;
        return careers;
    }//ITeacherDisponibilities



    public async getAllGroups<IGroups>() {
        //option:0, value: "", message:'get_all_careers'
        let op : IOPTRspns = await this.ALGC.getAllQueries(0,'','get_all_groups');
        let careers : IGroups[] = op.value;
        return careers;
    }

    public async getAllGroupsByIdCareer<IGroups>(idMateer: number) {
        //option:0, value: "", message:'get_all_careers'
        let op : IOPTRspns = await this.ALGC.getAllQueries(0, idMateer.toString(), 'get_groups_by_id_career');
        let careers : IGroups[] = op.value;
        return careers;
    }


}

export default DisponibilityCntrllr
