import { async } from "@firebase/util";
import { promisify } from "util";
import { IAvailableTeacher, ICareers, IOPTRspns, ISubjects, ITeachers } from "../Models/ALModels";
import ALGlobalCtrllr from "./ALGlobalCtrllr";


class AvailabilityCntrllr
{
    ALGC: ALGlobalCtrllr = new ALGlobalCtrllr();
    public Careers: Promise<ICareers[]>;
    public Teachers: Promise<ITeachers[]>;
    public HTeachers: Promise<ITeachers[]>;
    public idMaestro: number = 0;
    public idMateria: number = 0;

    constructor() {
        this.Teachers = this.GetAllTeachers();
    }

    public async SetSerialSubject(_idMateria: number, _isSerial: boolean, _ss: ISubjects[]) : Promise<string> {
        try {
            const js: any = JSON.stringify(_ss); 
            let pars: any = { "idMateria": js, "isSerial": _isSerial == true ? 1 : 0 };
            let op : IOPTRspns = await this.ALGC.getAllQueries(1, pars,'set_subject_isSerial');
            //console.log(op.value);
            return op.value;
        } catch (error) {
            throw(error);
        }
    }

    public async SetAvailability<IAvailableTeacher>(): Promise<IAvailableTeacher>  {
        try {
            if(this.idMateria == 0) {
                throw('Seleccione a una materia');
            }
            if(this.idMaestro == 0) {
                throw('Seleccione a un catedrático');
            }

            let pars: any = { "idMateria": this.idMateria, "idMaestro": this.idMaestro };
            let op : IOPTRspns = await this.ALGC.getAllQueries(1, pars,'set_teacher_availaibility');            
            let td: IAvailableTeacher = JSON.parse(op.value);
            return td ;
        }
        catch(ex) {
            window.alert(ex);
            throw(ex)
        }
    }


    public async DeleteTeacherAvailable(_idDisponibilidad: number): Promise<boolean> {
        try {
            let pars: any = { "idDisponibilidad": _idDisponibilidad };
            let op : IOPTRspns = await this.ALGC.algAllQueries(1, pars, 'deleteTeacherAvailable');
            let resp : boolean = JSON.parse(op.value);
            return resp;
        } catch (error) {
            throw(error);
        }
    }

    private async GetAllTeachers<ITeachers>(): Promise <ITeachers[]> {
        try{
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, '', 'get_all_teachers');
            let careers : ITeachers[] = op.value;
            return careers;
        }
        catch(ex)
        {
            throw(ex);
        }
    }

    public async GetHTeachersByIdSubject<ITeachers>(_idSubject: number): Promise <ITeachers[]> {
        try{
            let pars: any = { "idMateria": _idSubject };
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, pars, 'getHTeachersByIdSubject');
            let teachers : ITeachers[] = JSON.parse(op.value);
            this.HTeachers = JSON.parse(op.value);
            return teachers;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: getAllCareers]');
            throw(ex)
        }
    }



    public async GetTeachersAvailableBySubject<IAvailableTeacher>(idSubject: number) : Promise<IAvailableTeacher[]> {
        try {
            let pars: any = { "idSubject": idSubject };
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, pars, 'GetTeachersAvailableBySubject');
            let resp: IAvailableTeacher[] = JSON.parse(op.value);
            return resp;
        } catch (error) {
            throw(error);
        }
    }

    public async GetCareersByCoor<ICareers>(coor: string): Promise <ICareers[]> {
        try{
            let pars: any = { "coor": coor };
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, pars, 'get_careers_byCoor');
            let careers : ICareers[] = op.value;
            //careers = op.value;
            return careers;
        }
        catch(ex)
        {
            console.log('ERROR: [DisponibilityCntrllr: getAllCareers]');
            throw(ex);
        }
    }
}

export default AvailabilityCntrllr;

