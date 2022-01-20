import { IOPTRspns, IRptGlobal } from "../Models/ALModels";
import ALGlobalCtrllr from "./ALGlobalCtrllr";


class ReportCtrllr {
    ALGC: ALGlobalCtrllr = new ALGlobalCtrllr();
    constructor() {

    }

    public async GetGlobalDatas(opt: string): Promise<IRptGlobal[]> {
        try{
            //let op : IOPTRspns = await this.ALGC.algAllQueries(0,'','get_all_careers');
            //let careers : ICareers[] = op.value;
            //careers = op.value;
            let pars: any = { "opt": opt };
            let op : IOPTRspns = await this.ALGC.algAllQueries(4, pars,'get_alMR_MainReport');
            let gds : IRptGlobal[] = JSON.parse(op.value);

            /*let gds: IRptGlobal[] = [
                {label:'CAP', value:100},
                {label:'CALP', value:102},
                {label:'CALL', value:103},
                {label:'SEL', value:103}
            ];*/
            return gds;
        } catch (error) {
            throw (error);
        }
    }
}

export default ReportCtrllr

