import React, { Component } from "react";
import AcademicLoadConfCntrllr from "../Controllers/AcademicLoadConfCntrllr";
import "./css/AcademicLoadConf.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  ICargasAsignadas,
  ISubjects,
  ITeacher,
  ITeacherDisponibilitySubject,
} from "../Models/ALModels";
import toast, { Toaster } from "react-hot-toast";
import ShowAsignedAL from "./ShowAsignedAL";

//import Modals from '../../Utilities/Modals';
//const BrowserHistory = require('react-router/lib/BrowserHistory').default;

interface Props {
    navigation?:any;
    idCareer?: any;
    idCareerM?:any;
    career?: any;
    idGroup?: any;
    idGroupM?: any;
    group?: any;
    subjects?: ISubjects[];
    availableteacher?: ITeacherDisponibilitySubject[];
    teacherasigned?: ITeacherDisponibilitySubject[];
}
interface State {
  idCareer: any;
  subjects: ISubjects[];
  availableteacher: ITeacherDisponibilitySubject[];
  teacherasigned: ITeacherDisponibilitySubject[];
}

function WithParameters(props: Props) {
  let { id, idG, career, group } = useParams();
  let navigate = useNavigate(); 
  //let {idGroup} = useParams();
  return (
    <AcademicLoadConf
      {...props}
      idCareer={id}
      career={career}
      group={group}
      idGroup={idG}
      navigation={navigate}
    />
  );
}

type event = React.FormEvent<HTMLFormElement>;

export default WithParameters;

class AcademicLoadConf extends Component<Props, State> {

  handleClick = (e:any) => {
    e.stopPropagation();  //  <------ Here is the magic
  }

  private ALC: AcademicLoadConfCntrllr;
  Subject: string = "NO SELECCIONADA";
  constructor(props: Props) {
    super(props);
    this.state = {
      idCareer: this.props.idCareer,
      subjects: props.subjects || [],
      availableteacher: props.availableteacher || [],
      teacherasigned: props.teacherasigned || [],
    };
    this.ALC = new AcademicLoadConfCntrllr(
      Number.parseInt(this.props.idCareer),
      Number.parseInt(this.props.idGroup)
    );
    this.getDatas();
  }

  private async getDatas() {
    let sjts: ISubjects[] = await this.ALC.Materias;
    this.setState({
      subjects: sjts,
    });
  }

  private async onSelectSubject(idSubject: number, _subject: string) {
    this.Subject = _subject;
    toast.promise(this.GETDisponibilyTeacher(idSubject), {
      loading: "consultando profesores disponibles",
      success: (ok) => {
        this.ALC.IdMateria = idSubject;
        toast.promise(this.GETAssignedTeacher(idSubject), {
          loading: "consultando profesores...",
          success: "consulta terminada",
          error: "Error al cargar datos",
        });
        return ok;
      },
      error: (ex) => {
        this.ALC.IdMateria = 0;
        this.setState({ availableteacher: [] });
        toast.promise(this.GETAssignedTeacher(idSubject), {
          loading: "consultando profesores...",
          success: "consulta terminada",
          error: "Error al cargar datos",
        });
        return ex;
      },
    });
  }

  private async GETDisponibilyTeacher(idSubject: number): Promise<string> {
    try {
      let dis: ITeacherDisponibilitySubject[] =
        await this.ALC.GETAvailableTeachersByIdSubject(idSubject,
          this.ALC.IdGrupo);
      if (dis.length > 0) {
        this.setState({ availableteacher: dis });
        return "Profesores consultados";
      } else {
        throw "No se encontraro profesores disponibles";
      }
    } catch (ex) {
      throw ex;
    }
  }

  private async GETAssignedTeacher(idSubject: number): Promise<string> {
    try {
      this.setState({ teacherasigned: [] });
      let _teachers: ITeacherDisponibilitySubject[] =
        await this.ALC.GETAssignedTeacherByIdSubject(
          idSubject,
          this.ALC.IdGrupo
        );
      this.setState({ teacherasigned: _teachers });
      return "Profesores consultados";
    } catch (ex) {
      throw ex;
    }
  }

  private async onSelectTeacherAvailable(teacher: ITeacherDisponibilitySubject) {
    toast.promise(this.discardDuplicity(teacher.idMaestro), {
      loading: "consultando profesores disponibles",
      success: (m) => {
        this.ALC.IdMaestro = teacher.idMaestro;
        this.onSetAcademicLoad(teacher);
        return m;
      },
      error: (e) => {
        this.ALC.IdMaestro = 0;
        return e;
      }, // "Error al cargar datos",
    });
  }

  private async discardDuplicity(idTeacher: number): Promise<string> {
    let found = this.state.teacherasigned.find(
      (f) => f.idMaestro === idTeacher
    );
    console.log(found);
    if (found) {
      throw "Catedrático ya asignado...";
    }
    return "Usuario no duplicado";
  }

  private async onSetAcademicLoad(teacher: ITeacherDisponibilitySubject) {
    toast.promise(this.SETAcademicLoad(), {
      loading: "Asignando Carga Académica",
      success: (m) => {
        teacher.Active = "Inactivo";
        this.setState({ teacherasigned: [teacher] });
        return m;
      },
      error: (e) => {
        return e;
      },
    });
  }

  private async SETAcademicLoad(): Promise<string> {
    try {
      //console.log(this.ALC.IdMaestro + ' ' + this.ALC.IdMateria + ' ' + this.ALC.IdGrupo)
      let opt: boolean = this.state.teacherasigned.length > 0 ? true : false;
      let conf: boolean;
      if (!opt) {
        conf = await window.confirm(
          "Confirma usted ASIGNAR esta carga académica???"
        );
        if (conf) {
          let res: boolean = await this.ALC.SETAcademicLoad(
            this.ALC.IdMaestro,
            this.ALC.IdMateria,
            this.ALC.IdGrupo,
            this.ALC.NoInterval
          );
          if (res) {
            return "Carga ASIGNADA corréctamente";
          } else throw "Algo ha ido mal";
        } else throw "CARGA CANCELADA...";
      } else {
        conf = await window.confirm(
          "Confirma usted MODIFICAR esta carga académica???"
        );
        if (conf) {
          let oldTeacher: number = this.state.teacherasigned[0].idMaestro;
          if (oldTeacher > 0) {
            let res: boolean = await this.ALC.UPDATEAcademicLoad(
              this.ALC.IdMaestro,
              this.ALC.IdMateria,
              this.ALC.IdGrupo,
              oldTeacher,
              this.ALC.NoInterval
            );
            if (res) {
              return "Carga MODIFICADA corréctamente";
            } else {
              throw "Algo ha ido mal";
            }
          } else {
            return "CARGA CANCELADA...";
          }
        } else throw "CARGA CANCELADA...";
      }
    } catch (e) {
      throw e;
    }
  }

  private async setDaysInterval(b:boolean) {
    if(b) {
      this.ALC.NoInterval = 14;
    } else {
      this.ALC.NoInterval = 7;
    }
  }

  private async goToNavigation() {
    this.props.navigation("/AcademicLoads/" + this.props.idCareer + "&" + this.props.idGroup);
  }

  private async SkillsList (data: ICargasAsignadas[]) : Promise<ICargasAsignadas[]> {
    //console.log(data);
    let tmp:ICargasAsignadas[] = JSON.parse(data.toString());
    return tmp;
    //let response:string = "";
    /*tmp.map((item) => {
      response += "GRUPO: " + item.Grupo + " CARRERA: " + item.Carrera +" MATERIA: "+ item.Materia +'\n'
    });*/
    //return response;
  }

  render() {
    return (
      <main>
        <Toaster position="bottom-right" />
        <div className="row m-3" style={{ height: 780 }}>
          <div className="card">
            <div className="m-1 p-1 text-dark d-flex">
                {this.props.idCareerM}
                <p>Usted est&aacute; asignando profesores para la carrera: <strong>{this.props.career }{"; "}</strong>
                    para el grupo: <strong> {this.props.group} </strong>.
                </p>
            </div>
            <div className="d-flex p-1">
              <div className="m-1 p-1">
              { /*<!-- MATERIAS DE LA CARRERA --> */}
                <table id="tblReassignMatter" className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th colSpan={3}>
                        {" "}
                        <strong>MATERIAS DE LA CARRERA:</strong>{" "}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={3}>
                        <span id="spnCareerName">{this.props.career}</span>{" "}
                      </th>
                    </tr>
                    <tr>
                      <th>IdMateria</th>
                      <th>Materia</th>
                      <th>Cuatrimestre</th>
                    </tr>
                  </thead>
                  <tbody className="css_tbody">
                    {this.state.subjects.length > 0 &&
                      this.state.subjects.map((item) => (
                        <tr
                          onClick={() =>
                            this.onSelectSubject(item.idMateria, item.Nombre)
                          }
                          className="row_tr"
                          key={item.idMateria}
                        >
                          <th>{item.idMateria}</th>
                          <th>{item.Nombre}</th>
                          <th>{item.Cuatrimestre}</th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="m-1 p-1">
              { /*<!-- CATEDRÁTICOS DISPONIBLES PARA LA MATERIA --> */}
                <table
                  id="tblTeacherDisponobilities"
                  className="table table-striped"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th colSpan={3}>
                        {" "}
                        <strong>
                          CATEDRÁTICOS DISPONIBLES PARA LA MATERIA:
                        </strong>{" "}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={3}>
                        <strong style={{ fontSize: 12.5 }} > {this.Subject} </strong>
                      </th>
                    </tr>
                    <tr>
                      <div className="d-flex" style={{ width:400 }}>
                        <input type="checkbox" onChange={
                                  (e) => {
                                      this.setDaysInterval(e.target.checked);
                                    } 
                                  } 
                                  value="cada" name="i7" id="i15" />
                        <label style={{ cursor:'pointer', fontSize: 12.9 }} htmlFor="i15">
                          <strong>&nbsp;&nbsp;&nbsp;Int&eacute;rvalo de 14 d&iacute;as por sesiones???</strong>
                        </label>
                      </div>                        
                    </tr>
                    <tr>
                      <th>IdProfesor</th>
                      <th>Catedr&aacute;tico</th>
                      <th>Prioridad</th>
                    </tr>
                  </thead>
                  <tbody className="css_tbody">
                    {
                      this.state.availableteacher.length > 0 &&
                        this.state.availableteacher.map((item, index) => 
                          (
                            <>
                              <tr onClick={() => this.onSelectTeacherAvailable(item)}
                                className="row_tr"
                                key={item.idMaestro} >
                                <td>{item.idMaestro}</td>
                                <td>{item.Maestro}</td>
                                <td>{item.Prioridad}</td>
                              </tr>
                              <tr>
                                <td colSpan={3} color="red" >
                                  { 
                                    item.JSONCargaAsignada != null 
                                    ?
                                      <ShowAsignedAL asignedAL={JSON.parse(item.JSONCargaAsignada.toString())}></ShowAsignedAL>
                                    : "SIN CARGA ASIGNADA"
                                  }                                
                                </td>
                              </tr>
                            </>
                          )
                        )
                      }
                  </tbody>
                </table>
              </div>
              <div className="m-1 p-1">
                { /*<!-- CATEDRÁTICO ASIGNADO A LA MATERIA --> */}
                <table
                  id="tblTeacherAssignedData"
                  className="table table-striped"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th colSpan={4}>
                        {" "}
                        CATEDR&Aacute;TICO ASIGNADO AL GRUPO: {this.props.group}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={4}> EN LA MATERIA: {this.Subject} </th>
                    </tr>
                    <tr>
                      <th>idMaestro</th>
                      <th>Maestro</th>
                      <th>Estatus</th>
                    </tr>
                  </thead>
                  <tbody className="css_showOverfloy">
                    {this.state.teacherasigned.length > 0 &&
                      this.state.teacherasigned.map((item) => (
                        <tr
                          onClick={() =>
                            //this.onSelectSubject(item.idMaestro, item.Maestro)
                            console.log('Nothing left to do ???')
                          }
                          className="row_tr"
                          key={item.idMaestro}
                        >
                          <th>{item.idMaestro}</th>
                          <th>{item.Maestro}</th>
                          <th>{item.Active}</th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ alignItems:'right', textAlign:'right' }} className="m-1 p-1 text-dark">
                <button onClick={()=> this.goToNavigation() } style={{ float:'right' }} className="btn btn-primary">
                    REGRESAR
                </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const Child = ({ }) => (
  <strong> HOOOLAS</strong>
);