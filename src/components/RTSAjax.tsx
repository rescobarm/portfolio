import { IOPTRspns } from "./AcademicLoad/Models/ALModels";

//import asd from '../../public/ws_restf/academic_calendar/'
export class RTSAjax
{
    /* SERVER PRODUCTION */
    //public Url: string = "https://sae.universidadiexpro.edu.mx/myadmin/paneliexpro/cadocentes/iexpro_app/ws_restf/academic_loads/al_main.php";                           
    /* SERVER TEST*/
    //public Url: string = "https://iexpro.edu.mx/laboratoriosaevirtual_v1/myadmin/paneliexpro/cadocentes/iexpro_app/ws_restf/academic_loads/al_main.php";
    //public Url: string = "http://iexpro.edu.mx/laboratoriosaevirtual_v1/myadmin/paneliexpro/cadocentes/iexpro_app/ws_restf/academic_loads/al_main.php";
    /* WORK */    
    //public Url: string = "http://saen/rts_app/public/ws_restf/academic_loads/al_main.php";
    /* HOME */    
    public Url: string = "";//"http://DESKTOP-097O8VV/rts_app/public/ws_restf/academic_loads/al_main.php";
    
    constructor() {
        console.log('powered ByREM');
        //var pathArray = window.location.pathname.split('/');
        /*var newURL = window.location.host;
        this.Url = newURL + '/ws_restf/ws_rf.php';*/
        //console.log(this.Url);
    }

    public SET_URL(url:string)
    {
        this.Url = url;
    }

    public async _RTSAjx_POST_(message_send: IOPTRspns) : Promise<any>
    {
        let url = this.Url;        
        return new Promise(function(resolve, reject) {
            var value = message_send;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            //xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function() {
                if (xhr.status === 200) {
                    //let response :IOPTRspns = JSON.parse(xhr.responseText);
                    //resolve(response);
                    //resolve(JSON.parse(xhr.responseText));
                    resolve(xhr.responseText);
                } else {
                    console.log(xhr.statusText);
                    alert('Ha ocurrido un error en el servidor, usted será redireccionado al sitio oficial de la institución... por favor vuelva a intentar.');
                    reject(new Error(xhr.statusText));
                }
            };
            let b:boolean = false;
            xhr.onerror = function() {
                window.alert(xhr.responseText);
                //console.log(xhr.responseText);
                //console.log(JSON.stringify(xhr));
                //console.log(xhr.statusText);
                //alert(xhr.responseText);
                /*if(!b)
                    alert('Ha ocurrido un error en el servidor, usted será redireccionado al sitio oficial de la institución... por favor vuelva a intentar.');
                b=true;*/
                //reject('ERR: POR FAVOR INICIE SESION NUEVAMENTE');
                //window.location.href = "";
            };
     
            xhr.send(JSON.stringify(value)); 
        });
    }

    public async RTSA_POST(message_send: IOPTRspns)
    {
        let url = this.Url;        
        return new Promise(function(resolve, reject) {
            var value = message_send;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            //xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function() {
                if (xhr.status === 200) {
                    //let response :IOPTRspns = JSON.parse(xhr.responseText);
                    //resolve(response);
                    //resolve(JSON.parse(xhr.responseText));
                    resolve(xhr.responseText);
                } else {
                    console.log(xhr.statusText);
                    reject(new Error(xhr.statusText));
                }
            };
     
            xhr.onerror = function() {
                console.log('22222');
                console.log(xhr.statusText);
                //reject(new Error("Network error"));
                reject(xhr.statusText);
            };
     
            xhr.send(JSON.stringify(value)); 
        });
    }

    public async JSONPost(message_send:string) {
        ////console.log(message_send);
        var value = message_send;
        var xhr = new XMLHttpRequest();
     
        xhr.open('POST', this.Url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {                
                //console.log(xhr.status);
                //console.log(xhr.responseText);
                return xhr.responseText;
           }
        };
        xhr.send(value); 
    }
}