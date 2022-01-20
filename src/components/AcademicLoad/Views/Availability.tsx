import React, { Component } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import AvailabilityCntrllr from '../Controllers/AvailabilityCntrllr';
import DisponibilityCntrllr from '../Controllers/DisponibilityCntrllr';
import { IAvailableTeacher, ICareers, ISubjects, ITeachers } from '../Models/ALModels';
import Switch from "react-switch";

import './css/Availability.css';
import noUserPic from '../../Assets/NoUser.png';
import subjectPic from '../../Assets/subjects.png';
import { useSearchParams } from 'react-router-dom';
import Modals from '../../Utilities/Modals';
import AvailabilityModules from './AvailabilityModules';

interface Props {
    slctCareers?: ICareers[];
    slctTeachers?: ITeachers[];
    slctHTeachers?: ITeachers[];
    subjects?: ISubjects[];    
}
interface State {
    slctCareers: ICareers[];
    subjects: ISubjects[];
    slctTeachers: ITeachers[];
    slctHTeachers: ITeachers[];
    teachersAvailable: IAvailableTeacher[];
    isSerial: boolean;
    isModalOpen: boolean;
}

export default class Availability extends Component<Props, State> {
    public modalState: boolean = false;
    handleClick = (e:any) => {
        e.stopPropagation();  //  <------ Here is the magic
      }
    //state = {}
    disponibilityCtrllr: DisponibilityCntrllr = new DisponibilityCntrllr();
    avlbltyCtrllr: AvailabilityCntrllr = new AvailabilityCntrllr();

    public slctCareer: ICareers = {
        idCarrera: 0,
        Nombre: "Seleccione una carrera",
        Grado: "string",
        Modalidad: "string",
        revoe: "string",
        vigenciarevoe: "string",
        modalidadsep: "string",
    };


    public CareerName?: string = 'CARRERA NO SELECCIONADA';
    
    public IdSubject: ISubjects;
    public SubjectName?: string = 'SELECCIONE UNA MATERIA';

    public SlctCareers: ICareers[] = [this.slctCareer];
    

    public SlctTeachers: ITeachers[] = [];
    grpCuatri: any = [];
    IdCareer: string;
    constructor(props: Props) {
        super(props);
        console.log('AVAILABILITY');
        this.state = {
          slctCareers: props.slctCareers || this.SlctCareers,
          slctTeachers: [],
          subjects: [],
          slctHTeachers: [],
          teachersAvailable: [],
          isSerial: false,
          isModalOpen: false,
          //teacherDisponibilities: props.teacherDisponibilities || [],
        };
        this.handleChange = this.handleChange.bind(this);
        toast.promise(this.getDatas(), {
          loading: "Cargando datos",
          success: "Datos cargadas corréctamente",
          error: "Error al cargar datos",
        });
    }

    /*********** */
    private async handleChange(checked: boolean) {
        this.setState({ isSerial: !checked });
    }
    private async onSubjectSerial(index:number, _idSubject: ISubjects, _serial: boolean) {
        try {
            console.log('*********');
            console.log(_idSubject);
            console.log('*********');
            this.IdSubject = _idSubject;

            
            /*this.state.subjects.reduce((catMemo: ISubjects, { Cuatrimestre, Nombre }) => {
                if(catMemo.Cuatrimestre != Cuatrimestre)
                    console.log(catMemo.Cuatrimestre);
               
                return catMemo;
              });*/

            
            let tmp = "";
            this.grpCuatri = [];
            this.state.subjects.map((item) => {
                if(item.Cuatrimestre != tmp){
                    tmp = item.Cuatrimestre;
                    this.grpCuatri.push(tmp);                    
                }                
            });
            console.log(this.grpCuatri.length);

            
            //let resp: boolean = await this.avlbltyCtrllr.SetSerialSubject(_idSubject, _serial);
            //this.state.subjects[index].esSeriada = _serial;
            //this.setState({ subjects: [... this.state.subjects] });
            this.SubjectName = _idSubject.Nombre;
            if(_serial)
                this.myToggleModal();
            else
            {
                toast.success('La materia ya se encuentra seriada...');
            }
        } catch (error) {
            
        }
    }

    //*** SELECT TEACHER */

    private async onSelectTeacher(idTeacher: number) {
        try {

            let founded: boolean = this.state.teachersAvailable.some(
                (v) => v.idMaestro === idTeacher
            );

            if(founded) {
                throw('El catedrático(a) ya se encuentra asignado(a) a esta materia');
            }
            else {
                if(this.avlbltyCtrllr.idMateria == 0) {
                    throw ('Debe seleccionar una materia');
                }
                var response = await window.confirm('Confirma usted asignar disponibilidad al catedrático 11???');
                if(response)
                {
                    this.avlbltyCtrllr.idMaestro = idTeacher;
                    let tav: IAvailableTeacher = await this.avlbltyCtrllr.SetAvailability();
                    console.log(tav);
                    console.log('4************************************');

                    let nta: IAvailableTeacher[] = [
                        tav, ...this.state.teachersAvailable                        
                      ];

                    this.setState({
                        teachersAvailable:nta
                    });
                    console.log('ACEPTADO');
                }
                else
                {
                    this.avlbltyCtrllr.idMaestro = 0;
                    console.log('CANCELADO');
                }
            }
        } catch (error) {
            window.alert(error);
        }
    }

    //*** SEARCH TEACHER */
    private async onSearchTeacher(tex: string) {
        try {
            const cloneSheepsES6 = [... await this.avlbltyCtrllr.Teachers];
            let res: ITeachers[] = cloneSheepsES6.filter(
                e => e.Nombre.includes(tex)
            );
            this.setState({
                slctTeachers: [... res ],
            });

        } catch (error) {
            console.log(error);
        }
    }

    private async onSearchHTeacher(tex: string) {
        try {
            const cloneSheepsES6 = [... await this.avlbltyCtrllr.Teachers];  
            let res: ITeachers[] = cloneSheepsES6.filter(e => e.Nombre.includes(tex));
            this.setState({
                slctHTeachers: [... res ],
            });
        } catch (error) {
            console.log(error);
        }
    }

    //*** INCREASE DECREASE SECTION */

    private async onIncreaseDuration(index: ISubjects) {        
        toast.promise(
          this.IncreaseDuration(index),
          {
            loading: "Cargando",
            success: (e) => { return e; },
            error: (e) => { return e; }
          }
        );    
      }
    
      private async IncreaseDuration(index: ISubjects): Promise<string> {
        try {
          if(index.duracion === null)
            index.duracion = 0;
          index.duracion++;
          let ok: boolean =
          await this.disponibilityCtrllr.updateSubjectDuration(
            index.idMateria,
            index.duracion
          );
          if(ok) {
            let newTDSTmp = [...this.state.subjects];
            this.setState({ subjects: newTDSTmp });
            return "Duración aumentada corréctamente";
          } else {
            throw('Algo ha ido mal...');
          }
          
        } catch(ex) {
          throw(ex);
        }
      }

    private async onDecreaseDuration(index: ISubjects) {        
        toast.promise(
          this.DecreaseDuration(index),
          {
            loading: "Cargando...",
            success: (m)=> { return m; },
            error: (e)=> { return e; }
          }
        );    
      }
    
      private async DecreaseDuration(index: ISubjects): Promise<string> {
        try {   
          if(index.duracion === null || index.duracion === 0)
            throw('La materia debe durar al menos una sesión.');
          index.duracion--;   
          let ok: boolean =
          await this.disponibilityCtrllr.updateSubjectDuration(
            index.idMateria,
            index.duracion
          );
          if(ok) {
            let newTDSTmp = [...this.state.subjects];
            this.setState({ subjects: newTDSTmp });
            return 'Duración disminuida corréctamente.';
          } else {
            return 'Algo ha ido mal'
          }
        } catch(ex) {
          throw(ex);
        }
      }

    //PRIORITY
    private async onIncreaseProprity(index: number) {
        console.log(this.state.teachersAvailable[index]);
        toast.promise(
          this.increaseProprity(
            this.state.teachersAvailable[index].idDisponibilidad,
            this.state.teachersAvailable[index].disPrioridad++
          ),
          {
            loading: "Cargando",
            success: "Prioridad aumentada corréctamente",
            error: "Error al aumentar prioridad",
          }
        );
      }
    
      private async increaseProprity(idDisponibilidad: number, priority: number) {
        console.log(idDisponibilidad + "  -- " + priority);
        priority++;
        let ok: boolean =
          await this.disponibilityCtrllr.updatePriorityTeacherDisponibility(
            idDisponibilidad,
            priority
          );
        if (ok) {
          let newTDSTmp = [...this.state.teachersAvailable];
          this.setState({ teachersAvailable: newTDSTmp });
        }
      }
    
      private async onDecreaseProprity(index: number) {
        toast.promise(this.decreaseProprity(index), {
          loading: "Cargando",
          success: "Prioridad disminuida corréctamente",
          error: "Error al disminuir prioridad",
        });
      }
    
      private async decreaseProprity(i: number) {
        if (this.state.teachersAvailable[i].disPrioridad > 0) {
          this.state.teachersAvailable[i].disPrioridad--;
          let du: boolean =
            await this.disponibilityCtrllr.updatePriorityTeacherDisponibility(
              this.state.teachersAvailable[i].idDisponibilidad,
              this.state.teachersAvailable[i].disPrioridad
            );
          if (du) {
            let newTDSTmp = [...this.state.teachersAvailable];
            this.setState({ teachersAvailable: newTDSTmp });
          }
        } else throw "";
      }
    //************************ */
    private async onDeleteAvailableTeacher(i: number, idDisponibilidad: number) {
        try {
            var r = window.confirm('Confirma usted borrar esta disponibilidad???');
            if(r){
                toast.promise(
                    this.deleteAvailableTeacher(idDisponibilidad),
                    {
                      loading: "Borrando disponibilidad",
                      success:  (e)=> {
                        this.state.teachersAvailable.splice(i,1);
                        let narr: IAvailableTeacher[] = [... this.state.teachersAvailable];
                        this.setState({ teachersAvailable: narr });
                        return e;
                      }, //"Materia cargada corréctamente",
                      error: "Error al aumentar prioridad",
                    }
                  );
            }
        } catch (error) {
            console.log(error);
        }
    }

    private async deleteAvailableTeacher(idDisponibilidad: number) : Promise<string> {
        try {
            let r: boolean = await this.avlbltyCtrllr.DeleteTeacherAvailable(idDisponibilidad);
            if(r) {
                return "Disponibilidad eliminada corréctamente"
            }
            else
                throw('Error al eliminar la disponibilidad');
        } catch (error) {
            throw(error);
        }
    }
    /********** */

    private async onSelectSubject(idSubject: number, subjetName: string) {       

        toast.promise(
            this.getTeachersAvailableByIdSubject(idSubject, subjetName),
            {
              loading: "Cargando materias",
              success:  ()=> {
                this.getHTeachersAvailableByIdSubject(idSubject);
                return 'ok';
              }, //"Materia cargada corréctamente",
              error: "Error al aumentar prioridad",
            }
          );
    }

    private async getHTeachersAvailableByIdSubject(idSubject: number) {
        try {
            let htea: ITeachers[] = await this.avlbltyCtrllr.GetHTeachersByIdSubject(idSubject);//.disponibilityCtrllr.Teachers;
            this.setState({
              slctHTeachers: [...htea],
            });         
        } catch (error) {
            throw(error);
        }
    }

    private async getTeachersAvailableByIdSubject(idSubject: number, subjetName: string) {
        try {
            this.avlbltyCtrllr.idMateria = idSubject;
            this.SubjectName = subjetName;
            let at: IAvailableTeacher[] = await this.avlbltyCtrllr.GetTeachersAvailableBySubject(idSubject);
            this.setState({
                teachersAvailable: at
            });
        } catch (error) {
            throw(error);
        }
    }

    private async getDatas() {
        let crs: ICareers[] = await this.avlbltyCtrllr.GetCareersByCoor('ALL');
        let tea: ITeachers[] = await this.avlbltyCtrllr.Teachers;
        this.setState({
          slctCareers: [this.slctCareer, ...crs],
          slctTeachers: [...tea],
        });
    }

    private async getCareersByCoor(coor:string)
    {
        try {
            let crs: ICareers[] = await this.avlbltyCtrllr.GetCareersByCoor(coor);

            this.setState({
                slctCareers: [this.slctCareer, ...crs]                
            });
        } catch (error) {
            
        }
    }

    private async onSelectCareer(idCareer: string) {
        console.log('CARRERA: ' + idCareer);
        this.avlbltyCtrllr.idMateria = 0;
        this.avlbltyCtrllr.idMaestro = 0;        
        let careerName = this.state.slctCareers.find(e => e.idCarrera == Number.parseInt(idCareer))?.Nombre;
        this.CareerName = careerName;
        this.IdCareer = idCareer;
        toast.promise(this.selectSubjectsByIdCareer(idCareer), {
          loading: "Cargando",
          success: "Materias cargadas corréctamente",
          error: "Error al cargar datos",
        });
    }

    private async selectSubjectsByIdCareer(id: string): Promise<void> {        
        let sbjctsTmp: ISubjects[] = [];
        this.setState({ subjects: sbjctsTmp });
        let sbjcts: ISubjects[] = await this.disponibilityCtrllr.getSubjectsByIdCareer(Number.parseInt(id));
        this.setState({ subjects: sbjcts });
        this.disponibilityCtrllr.idCarrera = Number.parseInt(id);
    }

    public myToggleModal() {
        console.log(this.modalState);    
        this.modalState = !this.modalState;
        console.log(this.modalState);
        this.setState({isModalOpen:this.modalState});
        if(this.modalState == false){
            this.onSelectCareer(this.IdCareer);
            console.log('Actualizando' + this.IdCareer);
        }
        //console.log(this.modalState);
    }

    onSetSeries(_ss: ISubjects) {
        console.log('GUARDAR');
        this.myToggleModal();
    }
    
    render() {
        return (
            <main className='css_avlblty_main'>
                <Toaster position="bottom-right" />
                <Modals
                    modalTittle={ this.CareerName }
                    isModalOpen={this.modalState}
                    toggleModal={()=> { this.myToggleModal() }} >
                        <div className='css_avlblty_modal'>
                            <h1>{this.SubjectName}</h1>
                            <AvailabilityModules
                                _Subject={this.IdSubject}
                                subjects={this.state.subjects}
                                myToggleModal={() => { this.myToggleModal() }}
                            />
                        </div>                    
                </Modals>
                <header className='css-avlblty-main-header'>
                    <div>
                        <input id='rbAllCareer' onClick={ () => {
                                this.getCareersByCoor('ALL');
                            } 
                        } className='css_cursor_pointer' defaultChecked={true} type={'radio'} title='Todos' name='career' />
                        <label htmlFor="rbAllCareer" className='css_cursor_pointer'>TODOS</label>
                        {/* CAP */}
                        <input id='rbCAP' onClick={ () => {
                                this.getCareersByCoor('CAP');
                            }
                        } className='css_cursor_pointer' type={'radio'} title='Todos' name='career' />
                        <label htmlFor="rbCAP" className='css_cursor_pointer'>CAP</label>
                        {/* CALP */}
                        <input id='rbCALP' onClick={ () => {
                                this.getCareersByCoor('CALP');
                            } 
                        } className='css_cursor_pointer' type={'radio'} title='Todos' name='career' />
                        <label htmlFor="rbCALP" className='css_cursor_pointer'>CALP</label>
                        {/* CALL */}                                
                        <input id='rbCALL' onClick={ () => {
                                this.getCareersByCoor('CALL');
                            } 
                        } className='css_cursor_pointer' type={'radio'} title='Todos' name='career' />
                        <label htmlFor="rbCALL" className='css_cursor_pointer'>CALL</label>
                        {/* SEL */}
                        <input id='rbSEL' onClick={ () => {
                                this.getCareersByCoor('SEL');
                            } 
                        } className='css_cursor_pointer' type={'radio'} title='Todos' name='career' />
                        <label htmlFor="rbSEL" className='css_cursor_pointer'>SEL</label>

                    </div>

                    <div>
                        <select
                            style={{ width: 460 }}
                            id="slctCareers"
                            className="m-2 w-100"
                            title="Carreras"
                            onChange={(e) => {
                                this.onSelectCareer(e.target.value);
                            }}
                            >
                            {
                                this.state.slctCareers.length > 0 &&
                                this.state.slctCareers.map((item, i) => (
                                    <option key={i} value={item.idCarrera}>
                                        {item.Nombre}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                </header>
                <article className='css-avlblty-main-article'>
                    <div>
                        <div className="card-header w-100 h-10 css-wrap-text">
                            {this.CareerName?.toUpperCase()}
                        </div>
                        <div className="col-sm p-2 css-showOverflow bg-light css-avlblty-subjects">
                            {// MATERIAS DE LA CARRERA
                                this.state.subjects.length > 0 &&
                                this.state.subjects.map((item: ISubjects, index: number) => (

                                <div
                                    key={item.idMateria}
                                    className="card p-0 mb-3 text-dark border border-primary rounded w-100" >
                                    <div 
                                        className="d-flex css-avlblty-subjects-header"
                                        style={{ marginLeft:0 }}>
                                        <div className='css-avlblty-subjects-header-left-icon'>
                                            <img src={subjectPic} style={{ height:25, width:25, marginRight:3 }}  className="card-img" alt="..." />
                                        </div>                                                
                                        <div title='SELECCIONAR MATERIA' style={{ height:25, width:100}}
                                            onClick={() => { this.onSelectSubject(item.idMateria, item.Nombre); }} 
                                            className='justify-content-center css-avlblty-subjects-header-subject css-hover'>
                                                { item.Nombre }
                                        </div>
                                    </div>
                                    <div className="row g-0 p-1 d-flex justify-content-center border-top border-secondary w-100">
                                        <div className="m-1 p-1 justify-content-center border border-dark css-avlblty-subjects-header-duration">

                                            <div className="badge bg-secondary text-wrap w-100">
                                                Duraci&oacute;n.
                                            </div>

                                            <div className="_form justify-content-center w-100">
                                                    <div className="value-button" id="decrease" defaultValue="Decrease Value"
                                                        onClick={(e) => {
                                                                this.onDecreaseDuration(item);
                                                                this.handleClick(e);
                                                            }                                            
                                                        }
                                                    >
                                                    -
                                                    </div>
                                                    <input title={"some"} className="_input_number" type={"number"} value={item.duracion} disabled />
                                                    <div id="increase" className="value-button" defaultValue="Increase Value"
                                                        onClick={(e) => { 
                                                                this.onIncreaseDuration(item);
                                                                this.handleClick(e);
                                                            }
                                                        }>
                                                        +
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="m-1 p-1 d-flex justify-content-center border border-dark" style={{ width:'47%'}}>
                                            <div className="m-1 badge bg-secondary text-wrap" style={{width: '100%'}}>
                                                Es Seriada.
                                            </div>
                                            <div className="m-1 form-check form-switch">                
                                                <input
                                                    onChange={ (e) => {
                                                        this.onSubjectSerial(index, item, e.target.checked);                                                                        
                                                        }
                                                    }
                                                    checked={item.esSeriada == false ? false : true}
                                                    className="form-check-input" 
                                                    type="checkbox" role="switch" 
                                                    id="flexSwitchCheckChecked" />
                                                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                                    { item.esSeriada == false ? 'No' : 'Si' }
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div>
                        <header className="card-header w-100 h-10 css-wrap-text">
                            { this.SubjectName?.toUpperCase() }
                        </header>

                        <div className="col-sm p-2 css-showOverflow bg-light css-avlblty-subjects">
                            {/* CATEDRÁTICOS DISPONIBLES POR MATERIA */
                                this.state.teachersAvailable.length > 0 &&
                                this.state.teachersAvailable.map((item, i) => (

                                <div
                                    key={item.idMaestro}
                                    className="card p-0 mb-3 text-dark border border-primary rounded w-100" >
                                    <div 
                                        className="css-avlblty-subjects-asigned-teachers-header">
                                        <div className='justify-content-center css-avlblty-subjects-header-subject'>
                                                { item.Nombre }
                                        </div>
                                        <div title='ELIMINAR DISPONIBILIDAD'
                                            onClick={() => { this.onDeleteAvailableTeacher(i, item.idDisponibilidad); }}  
                                            className='css-hover css-avlblty-subjects-asigned-teachers-header-delete'>
                                            <svg xmlns="http://www.w3.org/2000/svg" style={{width:15, height:15}} fill="currentColor" className="bi bi-person-dash-fill" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="row g-0 p-1 d-flex justify-content-center border-top border-secondary w-100">
                                        <div className="m-1 p-1 justify-content-center border border-dark css-avlblty-subjects-header-duration">
                                            <div className="css-card-body-img-container">
                                                <img 
                                                    src={noUserPic}
                                                    className="css-card-body-img" alt="..." />
                                            </div>
                                        </div>

                                        <div className="m-1 p-1 justify-content-center border border-dark css-avlblty-subjects-header-duration">

                                            <div className="badge bg-secondary text-wrap w-100">
                                                Prioridad.
                                                </div>
                                                <div className="_form justify-content-center w-100">
                                                    <div
                                                        id="decrease" className="value-button" defaultValue="Decrease Value"
                                                        onClick={() => this.onDecreaseProprity(i) } >
                                                        -
                                                    </div>
                                                        <input title={"Configurar Prioridad"} className="_input_number" type={"number"} value={item.disPrioridad} disabled />
                                                    <div id="increase" className="value-button" defaultValue="Increase Value"
                                                        onClick={() => this.onIncreaseProprity(i) } >
                                                        +
                                                    </div>
                                                </div>                                                          
                                        </div>
                                        <div className="m-1 p-1 justify-content-center border border-dark css-avlblty-subjects-header-duration">
                                            <div className="progress" style={{width: '100%', cursor:'pointer'}} title='PROMEDIO' >
                                                <div className="progress-bar" style={{width: "75%;" }} >25%</div>
                                            </div>
                                        </div>        
                                    </div>
                                </div>
                                ))                                                
                            }
                        </div>
                  {/*
                        <div className='css-avlblty-subjects-historical-teachers'>
                            <div 
                                className="d-flex w-100"
                                style={{ marginLeft:0 }}>
                                <div className='p-2 justify-content-center w-100'>
                                    <input type="search" onChange={ (e) => { this.onSearchHTeacher(e.target.value) }} 
                                                className="form-control rounded" 
                                                placeholder="Historial catedráticos por carga" aria-label="Search"
                                                aria-describedby="search-addon" />
                                </div>
                                <div
                                    className='card-header css-hover' style={{  marginLeft:0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{width:26, height:26}} fill="currentColor" className="bi bi-person-dash-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className='col-sm p-2 css-showOverflow bg-light css-avlblty-subjects-asigned-teachers text-dark'>
                                {
                                    this.state.slctHTeachers.length > 0 &&
                                    this.state.slctHTeachers.map((item) => (
                                            <div onClick={(e) => { this.onSelectTeacher(item.idMaestro); } } className="card mb-3" key={item.idMaestro}>
                                                <div className="row">
                                                    <div className="col-md-0" style={{ height:50, width: '20%' }}>
                                                        <img src={noUserPic} style={{ height:50, width:50 }}  className="card-img" alt="..." />
                                                    </div>
                                                    <div className="col-md-0" style={{ width: '80%' }}>
                                                        <div className="card-body text-dark" style={{width: '100%', height:'100%'}}>
                                                            <span>{item.Nombre}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )                                                
                                }
                            </div>
                        </div>
                         */}
                    </div>
                    <div>
                        <div 
                            className="d-flex w-100"
                            style={{ marginLeft:0 }}>
                            <div className='justify-content-center w-100'>
                                <input type="search" onChange={ (e) => { this.onSearchTeacher(e.target.value) }} 
                                className='w-100'
                                    placeholder="Búsqueda de catedráticos para asignar a la materia" aria-label="Search"
                                    title='Búsqueda de catedráticos para asignar a la materia'
                                    aria-describedby="search-addon" />
                            </div>
                        </div>

                        <div className="col-sm m-2 p-1 css-showOverflow bg-light css-avlblty-subjects w-100 ">
                            {/* CATEDRÁTICOS */
                                this.state.slctTeachers.length > 0 &&
                                this.state.slctTeachers.map((item) => (                                        
                                        <div onClick={(e) => { this.onSelectTeacher(item.idMaestro); }} className="col-md-0 m-2 p-1 d-flex css-hover" style={{ width: '95%' }}>
                                            <div className="col-md-0  m-2 p-1 " style={{ height:50, width: '20%' }}>
                                                <img src={noUserPic} style={{ height:50, width:50 }}  className="card-img" alt="..." />
                                            </div>
                                            <div className="card-body text-dark m-2 p-1 ">
                                                <span>{item.Nombre}</span>
                                            </div>
                                        </div>
                                    )
                                )                                                
                            }
                        </div>
                    </div>
                </article>                      
            </main>
        )
    }

}
