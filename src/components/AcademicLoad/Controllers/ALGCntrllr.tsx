import { IALDisplay, IGroup, IGroups, IOPTRspns, ISchoolCycle } from "../Models/ALModels"
import ALGlobalCtrllr from "./ALGlobalCtrllr";

class ALGCntrllr {
    ALGC: ALGlobalCtrllr = new ALGlobalCtrllr();
    
    public SchoolCycle: Promise<ISchoolCycle[]>;
    public Groups: IGroups[];

    constructor() {
        //this.setSchoolCycle();
    }

    private async setSchoolCycle()
    {
        const err: ISchoolCycle[] = await this.getSchoolCycle();
    }

    public async getGroupsPA(ac:string): Promise<IGroup[]>
    {
        try {             
            let pars: any = { "ac": ac };
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, pars, 'get_groups_byPA');
            let gp: IGroup[] = JSON.parse(op.value);
            return gp;
        } catch (error) {
            throw(error);
        }
    }

    /*********************************************** */
    public async getAcademicLoadByIdGrIdCa<IALDisplay>(IdG: number, IdC: number): Promise<IALDisplay[]>
    {
        try {
            let pars: any = { "IdG": IdG, "IdC": IdC };
            //console.log(pars);
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, pars, 'get_al_byIdGrIdCa');
            let gp: IALDisplay[] = JSON.parse(op.value);
            return gp;            
        } catch (error) {
            throw(error);
        }
    }

    public async getGroups(_ac: string): Promise<IGroup[]>
    {
        try {             
            let pars: any = { "ac": _ac };
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, pars, 'get_groups_byAC');
            let gp: IGroup[] = JSON.parse(op.value);
            return gp;
        } catch (error) {
            throw(error);
        }
    }

    public async getSchoolCycle<ISchoolCycle>(): Promise<ISchoolCycle[]> {
        try{
            let pars: any = { "idSC": 'NELL' };
            let op : IOPTRspns = await this.ALGC.algAllQueries(0, pars, 'get_all_schoolcycle');
            let sc : ISchoolCycle[] = JSON.parse(op.value);
            return sc;
        }
        catch(ex)
        {
            throw(ex);
        }
    }
}

export default ALGCntrllr
