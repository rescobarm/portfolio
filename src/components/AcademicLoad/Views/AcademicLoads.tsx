import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Modals from "../../Utilities/Modals";

import AcademicLoadCntrllr from "../Controllers/AcademicLoadCntrllr";
import { IAcademicLoad, ICareers, IGroups } from "../Models/ALModels";
import WithParameters from "./AcademicLoadConf";
import AcademicLoadConf from "./AcademicLoadConf";
import AcademicLoadConfig from "./AcademicLoadConfig";

//CARRERAS combo
//GRUPOS combo
interface Props {
  estado?: boolean;
  idCareer?: any;
  idGroup?: any;
  navigation?: any;
  slctCareers?: ICareers[];
  slctGroups?: IGroups[];
  academicLoads?: IAcademicLoad[];
  isModalOpen?: boolean;
}
interface State {
  slctCareers: ICareers[];
  slctGroups: IGroups[];
  academicLoads: IAcademicLoad[];
  isModalOpen: boolean;
}

function WithNavigate(props: Props) {
  let { id, idG } = useParams();
  let navigate = useNavigate();
  return (
    <AcademicLoads
      {...props}
      idCareer={id}
      idGroup={idG}
      navigation={navigate}
    />
  );
}
export default WithNavigate;

class AcademicLoads extends Component<Props, State> {
  alCtrllr: AcademicLoadCntrllr = new AcademicLoadCntrllr();
  public navigation: any;
  public idCareer: string = "0";
  public career: string = "nothing";
  public idGroup: string = "0";
  public group: string = "nothing";
  public modalState: boolean = false;

  //:id&:career&:idG&:group

  public slctCareer: ICareers = {
    idCarrera: 0,
    Nombre: "Seleccione una carrera",
    Grado: "string",
    Modalidad: "string",
    revoe: "string",
    vigenciarevoe: "string",
    modalidadsep: "string",
  };

  public slctGroups: IGroups = {
    idGrupo: 0,
    Nombre: "Seleccione un grupo",
    Carreras_idCarrera: 0,
    anio: "",
    gruposep: "",
    mes: "",
    activadopor: "",
    cicloingreso: "",
    cicloactual: "",
    periodoingreso: "",
    periodoactual: "",
    cuatrimestregrupo: "",
    estatusadmisiones: "",
    visible: "",
    vigenciacredencial: "",
    fechaalta: "",
    fechainicio: "",
  };

  constructor(props: Props) {
    super(props);

    
    let _idg = Number.parseInt(this.props.idGroup);
    let _idc = Number.parseInt(this.props.idCareer);
    console.log('/*  ID CARRERA **************************************** */');
    console.log(_idc);
    if (_idg > 0) 
    {
      this.getAcademicLoadByGropu(_idg);
    }
    console.log('/*  ID CARRERA **************************************** */');

    this.state = {
      slctCareers: [this.slctCareer],
      slctGroups: [this.slctGroups],
      academicLoads: [],
      isModalOpen: false
    };
    toast.promise(this.getAllCareers(), {
      loading: "Cargando datos",
      success: "Datos cargadas corréctamente",
      error: "Error al cargar datos",
    });
  }

  private async getAllCareers(): Promise<any> {
    let crs: ICareers[] = await this.alCtrllr.Careers;
    //let grp: IComboBox[] = await this.disponibilityCtrllr.getAllTeachers();
    this.setState({ slctCareers: [this.slctCareer, ...crs] });
  }

  private async onSelectCareer(id: string, _career: string) {
    toast.promise(this.getGroupsById(id), {
      loading: "Cargando datos",
      success: "Datos cargadas corréctamente",
      error: "Error al cargar datos",
    });
    console.log(this.props.idCareer);
    this.idCareer = id;
    this.career = _career;
  }

  private async getGroupsById(id: string): Promise<void> {
    await this.alCtrllr.GetAllGroupsByIdCareer(Number.parseInt(id));
    let grps: IGroups[] = await this.alCtrllr.Groups; //await this.alCtrllr.Groups;// (Number.parseInt(id));
    this.setState({ slctGroups: [this.slctGroups, ...grps] });
  }

  private async onSelectGroup(id: string, _group: string) {
    //console.log(id);
    this.idGroup = id;
    this.group = _group;
    toast.promise(this.getAcademicLoadByGropu(Number.parseInt(id)), {
      loading: "Cargando datos",
      success: "Datos cargadas corréctamente",
      error: "Error al cargar datos",
    });
  }

  private async getAcademicLoadByGropu(id: number): Promise<any> {
    this.setState({ academicLoads: [] });
    let als: IAcademicLoad[] = await this.alCtrllr.getAcademicLoadsByIdGroup(
      id
    );
    this.setState({ academicLoads: als });
  }

  private async goToNavigation() {
    //console.log(this.idCareer); //undefined
    //console.log(this.);

    if (this.idCareer === "0") {
      window.alert("Seleccione una carrera");
    } else if (this.idGroup === "0") {
      window.alert("Seleccione un grupo");
    } else {
      this.props.navigation(
        "/AcademicLoadConf/" +
          this.idCareer +
          "&" +
          this.career +
          "&" +
          this.idGroup +
          "&" +
          this.group
      );
    }
  }

  public myToggleModal() {
    
    this.modalState = !this.modalState;
    this.setState({isModalOpen:this.modalState});
    //console.log(this.modalState);
  }

  /************ */

  private async onSetInitialTime(i: number, item: IAcademicLoad, hi: string) {
    /*console.log(item.horaInicio);
    console.log(hi);*/
    item.horaInicio = hi;
    toast.promise(this.validateSessionHi(item), {
      loading: "Validando horarios",
      success: (e) => {
        this.onSetITime(i, item);
        return e;
      },
      error: (e) => {
        return e;
      },
    });
  }

  private async onSetFinalTime(i:number, item: IAcademicLoad, hf: string) {
    item.horaFin = hf;
    toast.promise(this.validateSessionHf(item), {
      loading: "Validando horarios",
      success: (e) => {
        this.onSetFTime(i, item);
        return e;
      },
      error: (e) => {
        return e;
      },
    });
  }

  private async validateSessionHi(item: IAcademicLoad): Promise<string> {
    try {
      let resp: string = await this.alCtrllr.validateSchedulesHi(item);
      return resp;
    } catch (error) {
      throw error;
    }
  }
  private async onSetITime(i:number, item: IAcademicLoad): Promise<string> {
    toast.promise(this.setITime(item), {
      loading: "Actualizando horarios",
      success: (e) => {
            this.onUpdateALState(i, item.idCargasAcademicas);
            return e;
        },
      error: "Error actualizar hora de inicio",
    });
    return "OK";
  }

  private async onSetFTime(i:number, item: IAcademicLoad): Promise<string> {
    toast.promise(this.setFTime(i, item), {
      loading: "Actualizando horarios",
      success: (e) => {
            this.onUpdateALState(i, item.idCargasAcademicas);
            return e;
      },
      error: "Error actualizar hora de inicio",
    });
    return "OK";
  }

  private async setITime(item: IAcademicLoad): Promise<string> {
    try {
      let response: string = await this.alCtrllr.updateSchedulesHi(item);
      return response;
    } catch (error) {
      throw error;
    }
  }

  private async validateSessionHf(item: IAcademicLoad): Promise<string> {
    try {
      let resp: string = await this.alCtrllr.validateSchedulesHf(item);
      return resp;
    } catch (error) {
      throw error;
    }
  }



  private async setFTime(i:number, item: IAcademicLoad): Promise<string> {
    try {
      let response: string = await this.alCtrllr.updateSchedulesHf(item);
      return response;
    } catch (error) {
      throw error;
    }
  }

  private async onUpdateALState(i:number, idAL: number) {
    toast.promise(this.updateALState(i, idAL), {
        loading: "Actualizando carga",
        success: (e) => {
            return e;
        },
        error: "Error al cargar datos",
      });      
}

private async updateALState(i:number, idAL: number): Promise<string> {
  try {
    let response: IAcademicLoad[] = await this.alCtrllr.getAcademicLoadById(idAL);
    
    this.state.academicLoads[i] = response[0];
    let newTDSTmp = [...this.state.academicLoads];
    this.setState({ academicLoads: newTDSTmp });

    return 'DATOS ACTUALIZADOS';
  } catch (error) {
      throw(error);
  }    
}

  private async onActivateAL(i:number, item: IAcademicLoad) {
    if( Number.parseInt(item.duracion) <= 0)
    {
      window.alert('No se ha especificado duración de la materia...');
    }
    else {
      toast.promise(this.activateAL(item), {
        loading: "Activando carga",
        success: (e) => {
            this.updateALState(i, item.idCargasAcademicas);
          return e;
        },
        error: (e) => {
          return e;
        },
      });
    }
  }

  private async activateAL(al: IAcademicLoad): Promise<string> {
    try {
        console.log(al);
        if(al.btnAction == 0 || al.btnAction == 3) {
            console.log('HERE: *************');
            let aal: IAcademicLoad = await this.alCtrllr.ActivateAL(al);                        
            return 'CARGA ACTIVADA';
        } else if (al.btnAction == 1 || al.btnAction == 4) {  
          let aal: IAcademicLoad = await this.alCtrllr.ActivateAL(al);
          console.log(aal);
          return 'CARGA MODIFICADA';
        }
      else if (al.btnAction == 2 || al.btnAction == 0) {  
        let aal: IAcademicLoad = await this.alCtrllr.ActivateAL(al);
        console.log(aal);
        return 'CARGA MODIFICADA';
      }        
        else {
            throw('DESCATIVAR CARGA PENDIENTE');
      }
    } catch (error) {
        throw(error);
    }
  }

  private async onActivateAcademicLoad(i: number, item: IAcademicLoad) {
    toast.promise(this.activateAcademicLoad(i, item), 
    {
      loading: "Verificando carga",
      success: (m) => { return m } ,
      error: (e) => {
        return e;
      },
    });
  }

  private async activateAcademicLoad(i: number, item: IAcademicLoad): Promise<string> {
    try {
      let resp: IAcademicLoad = await this.alCtrllr.ActivateAcademicLoad(item);
      this.state.academicLoads[i] = resp;
      let newTDSTmp = [...this.state.academicLoads];
      this.setState({ academicLoads: newTDSTmp });
      return "CARGA ACTIVADA CORRÉCTAMENTE";
    } catch (error) {
      throw (error);
    }
  }

  private async returnSessions() : Promise<string> {
    return "GOGOGOGOGO";
  }


  private async onFilter(o: string) {
    var res = (await this.alCtrllr.Careers).filter(
      (f) => f.Modalidad === "Línea"
    );
    switch (o) {
      case "t":
        res = await this.alCtrllr.Careers;
        this.setState({ slctCareers: res });
        break;
      case "l":
        res = (await this.alCtrllr.Careers).filter(
          (f) => f.Modalidad === "Línea"
        );
        this.setState({ slctCareers: res });
        break;
      case "m":
        res = (await this.alCtrllr.Careers).filter(
          (f) => f.Modalidad === "Mixto"
        );
        this.setState({ slctCareers: res });
        break;
      case "p":
        res = (await this.alCtrllr.Careers).filter(
          (f) => f.Modalidad === "Presencial"
        );
        this.setState({ slctCareers: res });
        break;
    }
  }

  /************ */
  render() {
    return (
      <main className="container p-4 h-100">
        <Toaster position="bottom-right" />
        <Modals 
          modalTittle="MyModalTittle"
          isModalOpen={this.modalState}
          toggleModal={()=> { this.myToggleModal();}} >
          <AcademicLoadConfig idCareer={ Number.parseInt(this.idCareer) }></AcademicLoadConfig>
          <button onClick={ () => this.myToggleModal() }>CERRAR</button>
        </Modals>
        <div className="row" style={{ height: 780 }}>
        <div className="row">
            <div>
              <input
                type={"radio"}
                id="filter_t"
                name="filter"
                style={{ cursor: "pointer" }}
                onClick={() => this.onFilter("t")}
                value={"TODOS"}
                title="OVER HERE"
              />
              <label htmlFor="filter_t" style={{ cursor: "pointer" }}>
                TODOS
              </label>{" "}
              |{" "}
              <input
                type={"radio"}
                id="filter_l"
                name="filter"
                style={{ cursor: "pointer" }}
                onClick={() => this.onFilter("l")}
                value={"En línea"}
                title="OVER HERE"
              />
              <label htmlFor="filter_l" style={{ cursor: "pointer" }}>
                En línea
              </label>{" "}
              |{" "}
              <input
                type={"radio"}
                id="filter_m"
                name="filter"
                style={{ cursor: "pointer" }}
                onClick={() => this.onFilter("m")}
                value={"Mixto"}
                title="OVER HERE"
              />
              <label htmlFor="filter_m" style={{ cursor: "pointer" }}>
                Mixto
              </label>{" "}
              |{" "}
              <input
                type={"radio"}
                id="filter_p"
                name="filter"
                style={{ cursor: "pointer" }}
                onClick={() => this.onFilter("p")}
                value={"Presencial"}
                title="OVER HERE"
              />
              <label htmlFor="filter_p" style={{ cursor: "pointer" }}>
                Presencial
              </label>
            </div>
          </div>


          <div className="card">
            <div className="row">
              <div className="d-flex p-1">
                <select
                  id="slctCareers"
                  name="slctCareers"
                  title="Seleccionar carrera"
                  className="form-control m-2"
                  onChange={(e) => {
                    this.onSelectCareer(
                      e.target.value,
                      e.target.options[e.target.selectedIndex].text
                    );
                  }}
                >
                  {this.state.slctCareers.length > 0 &&
                    this.state.slctCareers.map((item) => (
                      <option key={item.idCarrera} value={item.idCarrera}>
                        {item.Nombre}
                      </option>
                    ))}
                </select>

                <select
                  id="slctGroups"
                  name="slctGroups"
                  title="Seleccionar grupo"
                  className="form-control m-2"
                  onChange={(e) => {
                    this.onSelectGroup(
                      e.target.value,
                      e.target.options[e.target.selectedIndex].text
                    );
                  }}
                >
                  {this.state.slctGroups.length > 0 &&
                    this.state.slctGroups.map((item) => (
                      <option key={item.idGrupo} value={item.idGrupo}>
                        {item.Nombre}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="card">
              <div className="card-body d-flex p-1">
                <table id="tblAcademicLoads" className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th colSpan={6}>
                        MATERIAS <span id="spnMATEER"></span> ASIGNADAS AL GRUPO{" "}
                        <span id="spnMAAG"></span>
                      </th>
                      <th colSpan={3} style={{ textAlign: "right" }}>
                        <button
                          className="btn btn-primary float-right"
                          onClick={() => {
                            this.goToNavigation();
                            //this.myToggleModal();
                          }}
                        >
                          CONFIGURA CARGA ACADEMICA
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <th style={{ display: "none" }}>idCargasAcademicas</th>
                      <th style={{ display: "none" }}>idGrupo</th>
                      <th style={{ display: "none" }}>idMaestro</th>
                      <th style={{ display: "none" }}>idMateria</th>
                      <th style={{ display: "none" }}>REASIGNAR</th>
                      <th style={{ display: "none" }}>isValidated</th>
                      <th>ESTATUS</th>
                      <th>DURACI&Oacute;N</th>
                      <th>MAESTRO</th>
                      <th>MATERIA</th>
                      <th>CUATRIMESTRE</th>
                      <th>HORARIO</th>
                      <th>Sesiones</th>
                      <th>Acci&oacute;n</th>
                      <th style={{ display: "none" }}>_intervaloDiasSesiones</th>
                      <th style={{ display: "none" }}>MODALIDAD</th>
                    </tr>
                  </thead>
                  <tbody className="css_tbody">
                    {this.state.academicLoads.length > 0 &&
                      this.state.academicLoads.map(
                        (item: IAcademicLoad, i: number) => (
                          <tr
                            className="row_tr"
                            key={
                              item.idCargasAcademicas
                            } /*onClick={() => this.selectedSubject(item.idMateria) }*/
                          >
                            <th style={{ display: "none" }}>
                              {item.idCargasAcademicas}
                            </th>
                            <th style={{ display: "none" }}>{item.idGrupo}</th>
                            <th style={{ display: "none" }}>
                              {item.idMaestro}
                            </th>
                            <th style={{ display: "none" }}>
                              {item.idMateria}
                            </th>

                            <th style={{ display: "none" }}>{item.isAcademicLoadValidated}</th>

                            <th>{
                                  <button
                                    onClick={ () => this.onActivateAcademicLoad(i, item) }
                                    disabled={ 
                                      (item.isAcademicLoadValidated == false) ? false :  false
                                     }
                                    
                                    className={ 
                                      item.estatus == "Inactivo" ? "btn btn-secondary" : "btn btn-success"
                                    }
                                  >
                                    {
                                      item.estatus == "Inactivo" ? "Activar" : item.estatus
                                    }                                    
                                  </button>
                                }
                            </th>
                            <th>{item.duracion}</th>
                            <th>{item.Maestro}</th>
                            <th>{item.Materia}</th>
                            <th>{item.Cuatrimestre}</th>
                            <th>
                              <label htmlFor="hi">H. Ini. </label>
                              <input
                                disabled={ item.modalidad == "Línea" ? true : false}
                                type={"time"}
                                id="hi"
                                defaultValue={item.horaInicio}
                                onBlurCapture={(e) =>
                                  this.onSetInitialTime(i, item, e.target.value)
                                }
                                name="hi"
                                placeholder="0:00"
                              />
                              <label htmlFor="hf">H. Fin. </label>
                              <input
                                disabled={ item.modalidad == "Línea" ? true : false}
                                type={"time"}
                                id="hf"
                                defaultValue={item.horaFin}
                                onBlurCapture={(e) =>
                                  this.onSetFinalTime(i, item, e.target.value)
                                }
                                name="hf"
                                placeholder="0:00"
                              />
                            </th>
                            <th>
                              { 
                                 item.sesiones
                              }
                            </th>

                            <th>
                                <button                                    
                                    onClick={()=> this.onActivateAL(i, item) }
                                    disabled={ 
                                      (item.btnAction == 0 || item.btnAction == 3) ? false 
                                      : (item.btnAction == 1 || item.btnAction == 4) ? true : false }

                                    className={ 
                                      (item.modalidad == "Línea" && item.btnAction == 0 || item.btnAction == 3) ? "btn btn-primary" 
                                        : (item.modalidad == "Línea" && item.btnAction == 1 || item.btnAction == 4 ) ? "btn btn-info" 
                                        : (item.modalidad == "Línea" && item.btnAction == 2 || item.btnAction == 5) ? "btn btn-danger" : "btn btn-success"
                                      }
                                    >
                                    {
                                      (item.btnAction == 0 || item.btnAction == 3 ) ? "Guardar Carga" : 
                                      (item.btnAction == 1 || item.btnAction == 4 ) ? "Carga Asignada" : "Modificar Carga"
                                    }
                                </button>
                            </th>
                            <th style={{ display: "none" }}>
                              {item.intervaloDiasSesiones}
                            </th>
                            <th style={{ display: "none" }}>{ item.modalidad }</th>
                          </tr>
                        )
                      )}
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {
            /*
              <div id="myModal" className="modal">
                      <div className="modal-content">
                          <span className="close">&times;</span>
                          <div className="css_div_flex">

                          </div>
                      </div>
              </div>
            */
          }
      </main>
    );
  }
}
