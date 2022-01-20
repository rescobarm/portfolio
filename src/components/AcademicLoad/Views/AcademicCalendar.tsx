import React, { Component } from 'react'
//import { IAcademicCalendar } from '../../../models/AcademicLoad/ATLMdls';
//import { IOPTRspns } from '../../../models/Helpers';
import { RTSAjax } from '../../RTSAjax';
import AcademicCalendarCntrllr from '../Controllers/AcademicCalendarCntrllr';

import { IAcademicCalendar, IOPTRspns } from '../Models/ALModels';


interface Props {
    ac?: IAcademicCalendar;
    acs?: IAcademicCalendar[];
}

interface State {
    AcademicCalendar: IAcademicCalendar;
    AcademicsCalendars:IAcademicCalendar[];
    /*calendarDesc: string;
    calendarUnskilled: boolean;
    calendarDatas: IAcademicCalendar[];*/
}

type eveElementForm = React.FormEvent<HTMLFormElement>;
//const ajx: RTSAjax = new RTSAjax();

export default class AcademicCalendar extends Component<Props, State> {
    ajx: RTSAjax = new RTSAjax();
    ac: AcademicCalendarCntrllr = new AcademicCalendarCntrllr();

    public academicCalendar: IAcademicCalendar = {
        idcalendario_escolar:0,
        idSchoolCycle:0,
        fecha: "dd/mm/aaaa",        
        descripcion: "",
        es_inhabil: false,
        activo: true
    };

    public academicsCalendars: IAcademicCalendar[] = [
        this.academicCalendar
    ];

    constructor(props: Props) {
        super(props);       

        this.state = {
            // populate state fields according to props fields  
            AcademicCalendar: props.ac || this.academicCalendar,
            AcademicsCalendars: props.acs || this.academicsCalendars
        };
        this.getACDatas();
    }

    private async getACDatas() {
        await this.ac.getAcademicCalendar(0);
        this.academicsCalendars = this.ac.AcademicCalendars;
        this.setState({ AcademicsCalendars: this.academicsCalendars });
        //console.log(this.ac.AcademicCalendar);
    }

    private async handleSubmit(eve: eveElementForm)
    {
        eve.preventDefault();
        console.log(this.state.AcademicCalendar.fecha );
                
    }

    private setCalendarDate(d:string)
    {
        this.academicCalendar.fecha = d;
        this.setState({ AcademicCalendar: this.academicCalendar });
    }

    private setCalendarUnskilled(d: boolean)
    {
        this.academicCalendar.es_inhabil = d;
        this.setState({ AcademicCalendar: this.academicCalendar });
    }

    private setCalendarDesc(d: string)
    {
        this.academicCalendar.descripcion = d;
        this.setState({ AcademicCalendar: this.academicCalendar });
    }

    //onIncrement = (d:string) => this.setCalendarDate(d);

    private async saveDatas()
    {
        if (this.academicCalendar.fecha === "dd/mm/aaaa") {
            window.alert('Seleccione una fecha');
        } else if (this.academicCalendar.descripcion === "") {
            window.alert('Ingrese descripción de la fecha');
        } else {            
            let _ac: IAcademicCalendar = await this.ac.setAcademicCalendar(this.academicCalendar);
            await this.display_calendar(_ac);
        }
    }

    private async display_calendar(_ac: IAcademicCalendar)
    {
        console.log(_ac);
        let newDatas: IAcademicCalendar[] = [...this.academicsCalendars, _ac];      
        this.setState({ AcademicsCalendars: newDatas.reverse() });
        console.log(newDatas);
    }

    render() {
        return (
            <div className="container p-4 h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-6 offset-md-13 ">
                        <div className="card">
                            <div className="card-body">
                                <input
                                    type={'date'} title='SOME'
                                    value={this.academicCalendar.fecha}
                                    onChange={(e) => this.setCalendarDate(e.target.value)}
                                    className="form-control"
                                    //ref={calendarInput}
                                    autoFocus />

                                <input type="checkbox" id="unskilled" value="first_checkbox" 
                                    onChange={(e) => this.setCalendarUnskilled( e.target.checked )} />
                                    <label className='text-dark' htmlFor="unskilled">&nbsp;Inh&aacute;bil</label>

                                <input
                                    type="text"
                                    value={this.academicCalendar.descripcion}
                                    onChange={(e) => this.setCalendarDesc(e.target.value)}
                                    placeholder="Decripción de la fecha"
                                    className="form-control mt-2" />

                                <button onClick={()=> {this.saveDatas()} } className="btn btn-success btn-block mt-2">
                                    Guardar
                                </button>
                            </div>
                        </div>
                        <div className='css_tbody'>
                            { 
                                this.state.AcademicsCalendars.map((t: IAcademicCalendar, i: number) => (
                                        <div className="card card-body mt-2 text-dark" key={i}>
                                            <h3 style={{ textDecoration: t.es_inhabil == true ? "line-through" : "" }}>
                                                { t.fecha } 
                                            </h3>
                                            <h5> {t.es_inhabil == true ? "inhábil" : "hábil"} </h5>
                                            <p> {t.descripcion} </p>
                                            <div>
                                                <button style={{display:'none'}} className="btn btn-danger" >
                                                    Borrar
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
