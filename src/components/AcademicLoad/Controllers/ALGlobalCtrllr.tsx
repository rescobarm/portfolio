//import { IOPTRspns } from "../../../models/Helpers";
import { RTSAjax } from "../../RTSAjax";
import { IOPTRspns } from "../Models/ALModels";

///Controlador global de carga académica
class ALGlobalCtrllr {
    ajx: RTSAjax = new RTSAjax();
    constructor() {        
        //"http://DESKTOP-097O8VV/rts_app/build/ws_restf/ws_rf.php";

        //https://iexpro.edu.mx/laboratoriosaevirtual_v1/myadmin/paneliexpro/cadocentes/iexpro_app/
        //let url: string = "https://iexpro.edu.mx/laboratoriosaevirtual_v1/myadmin/paneliexpro/cadocentes/iexpro_app/ws_restf/academic_loads/al_main.php";
        //let url: string = "http://saen/rts_app/build/ws_restf/academic_loads/al_main.php";
        //let url: string = "http://saen/rts_app/public/ws_restf/academic_loads/al_main.php";
        
        // H O M E 
        //let url: string = "http://DESKTOP-097O8VV/rts_app/build/ws_restf/academic_loads/al_main.php";
        //let url: string = "http://DESKTOP-097O8VV/rts_app/public/ws_restf/academic_loads/al_main.php";
        //this.ajx.SET_URL(url);
    }

    public async algAllQueries( opt:number, val: string, mes: string ):Promise<IOPTRspns>  {
        try{
            let msg: IOPTRspns = { option:opt, value: JSON.stringify(val), message: mes };
            const response: any = await this.ajx._RTSAjx_POST_(msg);
            msg = JSON.parse(response);
            return msg;
        }
        catch(ex: any)
        {
            console.log(ex);
            console.log('ERROR: [ALGlobalCtrllr: algAllQueries]');
            throw(ex)
        }
    }

    public async getAllQueries( opt:number, val: string, mes: string ):Promise<any>  {
        //let msg: IOPTRspns = { option:0, value: "", message:'get_all_careers' };
        let msg: IOPTRspns = { option:opt, value: JSON.stringify(val), message: mes };
        const response: any = await this.ajx.RTSA_POST(msg);
        //console.log(response);
        return JSON.parse(response);
        //console.log(op.value);
    }
}

export default ALGlobalCtrllr
