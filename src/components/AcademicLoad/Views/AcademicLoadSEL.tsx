import { async } from '@firebase/util';
import React, { Component } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ALGCntrllr from '../Controllers/ALGCntrllr';
import { IALDisplay, IGroup, ISchoolCycle } from '../Models/ALModels';

import './css/AcademicLoadSEL.css';
import img from '../../Assets/subjects.png';
import Modals from '../../Utilities/Modals';

interface Props {
    toggleModal?:()=> void;
}
interface State {
    SchoolCycle: ISchoolCycle[],
    Groups: IGroup[],
    ALDisplay: IALDisplay[],
    ALDisplayQuater: IALDisplay[],
    ALDisplayGroupByQuater: IALDisplay[],
    ALGroupByQuater: string[],
    isModalOpen: boolean;
}

//export default class Availability extends Component<Props, State> {
export default class AcademicLoadSEL extends Component<Props, State> {
    //state = {};
    private SLGC: ALGCntrllr = new ALGCntrllr();    
    public modalState: boolean = false;

    constructor(props: Props) {
        super(props);
        this.state = {
            SchoolCycle: [],
            Groups: [],
            ALDisplay: [],
            ALDisplayQuater: [],
            ALDisplayGroupByQuater: [],
            ALGroupByQuater: [],
            isModalOpen: true
        };

        console.log('11111111111111111111');
        //console.log(this.SLGC.getSchoolCycle());
        this.onInitialize();
        console.log('222222222222222222222222');
    }

    public async onInitialize()
    {
        toast.promise(  this._GetGroupsPA() ,
            {
              loading: 'Cargando grupos por aperturar',
              success: (e) => { return e; },
              error: (e) => { return e; }
            }
        );
        toast.promise(  this._GetInitialize() ,
            {
              loading: 'Cargando ciclo escolar',
              success: (e) => { return e; },
              error: (e) => { return e; }
            }
        );
    }

    private async _GetGroupsPA(): Promise<string>
    {
        try {
            let gps = await this.SLGC.getGroupsPA('CA');
            this.setState({ Groups:[...gps]});
            return 'Grupos cargados corréctamente...';
        } catch (error) {
            throw(error);
        }
    }

    public async _GetInitialize(): Promise<string>
    {
        try {
            let sc: ISchoolCycle[] = await this.SLGC.getSchoolCycle();
            this.setState({ SchoolCycle: [...sc] });
            console.log(this.state.SchoolCycle);
            return 'OOOOOOOOOOK';            
        } catch (error) {
            throw "ERROOOOOOR";
        }
    }

    private async onSchoolCycle(__sc: ISchoolCycle)
    {
        try {
                /*toast.promise(this._GetGroups(__sc), {
                    loading: 'Cargando grupos',
                    success: (e) => { return e; },
                    error: (e) => { return e; }
                }
            );*/
        } catch (error) {
            alert(error);
        }
    }

    private async _GetGroups(__sc: ISchoolCycle): Promise<string>
    {
        try {
            let gps = await this.SLGC.getGroups(__sc.SchoolCycle);
            this.setState({ Groups:[...gps]});
            return 'Grupos cargados corréctamente...';
        } catch (error) {
            throw(error);
        }
    }

    onGetAL(_idG:number, _idC: number): void {
        try {
            console.log(_idC);
            this.getAL(_idG, _idC);
        } catch (error) {
            //throw new Error('Method not implemented.');
        }
    }

    async getAL(_idG:number, _idC: number){
        try {
            let als:IALDisplay[] = await this.SLGC.getAcademicLoadByIdGrIdCa(_idG, _idC);
            this.setState({ ALDisplay: []});
            this.setState({ ALDisplay: [... als]});
            console.log(' F I L T R A D O ');
            let alsGroupByQuater: string[] = [];
            var tmp: string = "";
            als.filter((e,i) => {
                    if(tmp != e.Cuatrimestre){
                        alsGroupByQuater.push(e.Cuatrimestre);
                        tmp = e.Cuatrimestre;
                    }
                    else
                        tmp = e.Cuatrimestre;
                }
            );
            this.setState({ ALGroupByQuater: alsGroupByQuater });
            this.setState({ ALDisplayGroupByQuater: [... als]});
            console.log(alsGroupByQuater);          
        } catch (error) {
            
        }
    }

    filterByQuatern(_q: string) {
        const cloneSheepsES6 = [... this.state.ALDisplay];
        let dq = cloneSheepsES6.filter(e => e.Cuatrimestre == _q);
        this.setState({ ALDisplayGroupByQuater: [... dq]});
    }

    public myToggleModal() {
        console.log(this.modalState);    
        this.modalState = !this.modalState;
        console.log(this.modalState);
        this.setState({isModalOpen:this.modalState});
        //console.log(this.modalState);
    }

    render() {
        return (
            <main className='css-main-al'>
                <Toaster position="bottom-right" />
                <Modals
                    isModalOpen={ this.modalState }
                    toggleModal={()=> { this.myToggleModal() }}>

                </Modals>
                <header className='css-header-al'>
                    <select name="slcCareers" id="slcCareers" title='CARRERAS'>
                        <option value="1">AAAAAAAAAAAAA</option>
                        <option value="2">BBBBBBBBBBBBB</option>
                        <option value="3">CCCCCCCCCCCCC</option>
                    </select>
                </header>
                <section className='css-section-al'>
                    <article className='css-article-al'>
                        <header className='css-header-al'>
                            <nav><h1>NOMBRE DE LA CARRERA</h1></nav>
                        </header>

                        <section className='css-section-al_quarter css-showOverflow'>
                        {
                            this.state.ALDisplayGroupByQuater.length >= 0 &&
                                this.state.ALDisplayGroupByQuater.map((item: IALDisplay, index: number) => (
                                    <div className='css-al-card'>
                                        <div>                                  
                                            { item.Cuatrimestre }
                                            { item.Estatus}
                                        </div>
                                        <div>
                                            { item.Nombre }
                                        </div>
                                        <div className={ item.Maestros_idMaestro === null ? '': '' } >
                                            <div onClick={ () => this.myToggleModal() } className='css-assigning-teacher-asigned css-hover'>
                                                {
                                                    item.Maestros_idMaestro == null ?
                                                        'SIN ASIGNAR'
                                                        :
                                                            item.Maestro != null ?
                                                                item.Maestro.toUpperCase() 
                                                            :
                                                                'NELL'
                                                }
                                            </div>
                                            <div className='css-assigning-teacher-priority css-hover'>
                                                { item.Maestro }
                                            </div>
                                            <div className='css-assigning-teacher-hostiry css-hover'>
                                                { item.MaestroHCA }
                                            </div>
                                        </div>                                        
                                        <div></div>
                                        <div></div>
                                        <div></div>                                        
                                    </div>
                                )
                            )

                        }
                        </section>
                        <footer className='css-footer-al'>
                            <section className='css-quarter-al'>
                                {
                                    this.state.ALGroupByQuater.map((e:string) => (
                                            <div onClick={ () => this.filterByQuatern(e)}>{ e }</div>
                                        )
                                    )
                                }
                            </section>
                            <b>cuatrimestres:</b>
                        </footer>
                    </article>
                    <aside className='css-aside-al'>
                        <div>
                            <b>GRUPOS POR APERTURAR</b>
                        </div>
                        <div className='css-al-gpaContainer css-showOverflow' style={{ border: '1px solid red', height: '45%' }}>
                            {
                                this.state.Groups.length > 0 &&
                                    this.state.Groups.map((item: IGroup, index: number) => (
                                        <div className="justify-content-center align-items-center container px-2 m-2 p-1 text-dark" style={{ width:'100%' }}>
                                            <div className="card">
                                                <div className="top d-flex flex-row align-items-center"> 
                                                    <img src={ img } width="40"
                                                        className="rounded-circle mr-2" title='AS' />
                                                    <h6 className="mb-0 mr-2">
                                                        { item.cuatrimestregrupo + ' F. INICIO: ' + item.fechainicio }
                                                    </h6> 
                                                    <i className="fa fa-opencart"></i>
                                                </div>
                                                <div className="middle">
                                                    <span>{ item.Carrera }</span>
                                                </div>
                                                <div className="bottom justify-content-center p-6">
                                                    <button 
                                                        onClick={() => this.onGetAL(item.idGrupo, item.Carreras_idCarrera) } 
                                                        className="btn btn-success btn-sm add w-100 m-6">
                                                            { item.Nombre }
                                                        </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <div className='d-flex' style={{ border: '1px solid red', width: '100%', height:'45%'}}>
                            <div style={{ border: '1px solid red', width: '100%', height:'100%'}}>
                                <div style={{ border: '1px solid red', width: '100%' }}>
                                    <b>HISTORIAL CA</b>
                                </div>
                                <div className='css-al-gpaContainer' style={{ border: '1px solid red', width: '100%', height: '90%' }}>

                                </div>
                            </div>
                            <div style={{ border: '1px solid red', width: '100%', height:'100%' }}>
                                <div style={{ border: '1px solid red', width: '100%' }}>
                                    <b>PERIODO ESCOLAR</b>
                                </div>
                                <div className='css-al-gpaContainer' style={{ border: '1px solid red', width: '100%', height: '90%' }}>
                                    {
                                        this.state.SchoolCycle.length > 0 &&
                                        this.state.SchoolCycle.map((item: ISchoolCycle, index: number) => (
                                                <div key={index} onClick={ () => this.onSchoolCycle(item) }  className="css-al-gpa">{ item.SchoolCycle }</div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>
                <footer className='css-footer-al'>   
                    <div style={{width: '40%'}}>
                        <h1>HERE</h1>
                    </div>                 
                </footer>
            </main>
        )
    }
}

//export default AcademicLoadSEL
