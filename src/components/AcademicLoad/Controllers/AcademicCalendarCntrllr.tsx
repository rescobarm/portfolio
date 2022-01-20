
import { IAcademicCalendar, IOPTRspns } from '../Models/ALModels';
import ALGlobalCtrllr from './ALGlobalCtrllr';
//import { IAcademicCalendar } from '../../../models/AcademicLoad/ATLMdls';


class AcademicCalendarCntrllr {
    ALGC: ALGlobalCtrllr = new ALGlobalCtrllr();
    public AcademicCalendars: IAcademicCalendar[];
    constructor() {

    }

    public async getAcademicCalendar(idPeriodo: number) {
        try {
            let pars: any = {"idPeriodo": idPeriodo };
            let op : IOPTRspns = await this.ALGC.algAllQueries(3,pars ,'getAcademicCalendar');
            this.AcademicCalendars = JSON.parse(op.value);
            //console.log(this.AcademicCalendar);
            //return ac;
        } catch (error) {
            throw (error);
        }
    }

    public async setAcademicCalendar(ac:IAcademicCalendar) : Promise<IAcademicCalendar> {
        try {
            let pars: any = {
                "idCA": ac.idcalendario_escolar, 
                "idSchoolCycle": ac.idSchoolCycle,
                "fecha": ac.fecha,
                "es_inhabil": ac.es_inhabil,
                "descripcion": ac.descripcion,
                "activo": ac.activo
             };
            let op : IOPTRspns = await this.ALGC.algAllQueries(3, pars,'setAcademicCalendar');
            if(op.value != false)
            {
                ac.idcalendario_escolar = op.value;
                return ac;
            }
            else
                throw "NO SE HA PODIDO INSERTAR LA FECHA";
        } catch (error) {
            throw error;
        }
    }
}

export default AcademicCalendarCntrllr
